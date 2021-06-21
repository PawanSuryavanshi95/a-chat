const socketio = require("socket.io");
var HashMap = require('hashmap');

const USER = require('./models/User');
const ROOM = require('./models/Room');

const cors_white_list = ["https://epic-newton-301ecc.netlify.app/","https://epic-newton-301ecc.netlify.app", "http://localhost:3000/", "http://localhost:3000"];

const io = socketio({
    cors: {
        origin: cors_white_list,
      },
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: false,
});

io.on('connection', async (socket)=>{
    console.log("We got ourselves a connection : ", socket.id);
    io.sockets.emit("hello");
    
    socket.on('JOIN', async ({handle,type})=>{
        var user = {
            handle,
            socketID:socket.id,
            inRoom:false,
            O2O:type==='1to1',
        }
        await new USER(user).save();
    });

    socket.on('CONNECT_ROOM', async ({room,type})=>{
        var userList = [];
        if(type==='1tomany'){
            const roomData = await ROOM.findOneAndUpdate({_id:room}, { $push: { users: {socketID:socket.id} } },{ new:true });
            userList = roomData.users;
        }
        else{
            var users = await USER.find({inRoom:false, O2O:true});
            var rID;
            for(var i=0; i< users.length; i++){
                if(users[i].socketID===socket.id) continue;
                const room = {
                    occupied:true,
                    group:false,
                    users:[{ socketID:socket.id },{ socketID:users[i].socketID },]
                };
                const doc = await new ROOM(room).save();
                rID = doc._id;
                userList = [{ socketID:socket.id },{ socketID:users[i].socketID }];
                await USER.updateOne({socketID:socket.id}, {$set:{inRoom:true, rID:rID}});
                await USER.updateOne({socketID:users[i].socketID}, {$set:{inRoom:true, rID:rID}});
                break;
            }
        }
        
        if(userList.length===0){
            io.to(socket.id).emit('CONNECTED', {success: false});
        }
        else{
            console.log('yo', userList);
            for(var i=0;i<userList.length;i++){
                io.to(userList[i].socketID).emit('CONNECTED', { users:userList, success: true});
            }
        }
    });

    socket.on('SEND', async ({text,handle,msgID})=>{
        console.log(text,handle);
        try{
            var userid = socket.id;
            const user = await USER.findOne({ socketID:userid });
            const room = await ROOM.findById(user.rID);
            const buddies = room.users;
            for(var i=0;i<buddies.length;i++){
                if(buddies[i].socketID==userid) continue;
                io.to(buddies[i].socketID).emit('RECIEVE', { user:handle, text });
            }
            io.to(userid).emit('SENT_RECIEPT', {msgID});

        }
        catch(err) {
            console.log(err.message);
        }
    });

    /*socket.on('READ', ({len})=>{
        try{
            var userid = socket.id;
            var buddies = roomsMap.get(userMap.get(userid).rID).users;
            io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('READ_RECIEPT', { len });
        }
        catch(err) {
            console.log(err.message);
        }
    });*/

    socket.on('disconnect', async () => {

        try{
            const user = await USER.findOne({socketID:socket.id});
            if(user.inRoom){
                var roomID = user.rID;
                var room = await ROOM.find({_id:roomID});
                room = room[0];
                var buddies = room.users;
                if(!room.group){
                    var buddyID = buddies[0].socketID===socket.id?buddies[1].socketID:buddies[0].socketID;
                    await USER.updateOne(
                        { socketID: buddyID },
                        { $set: { rID : null, inRoom:false } });
                    await ROOM.deleteOne({_id:roomID});
                    io.to(buddyID).emit('ROOM_EMPTY', { });
                    room.users = [];
                    room.occupied = false;
                }
                else{
                    for(var i=0;i<buddies.length;i++){
                        if(buddies[i].socketID===userid) continue;
                        io.to(buddies[i].socketID).emit('BUDDY_LEFT', { socketID:userid });
                    }
                }
            }
            await USER.deleteOne({socketID:socket.id});  
            
            console.log('user disconnected : ', socket.id);
        }
        catch(err) {
            console.log(err.message);
        }
    });
    
});

module.exports = io;
