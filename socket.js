const socketio = require("socket.io");
var HashMap = require('hashmap');

const cors_white_list = ["https://epic-newton-301ecc.netlify.app/","https://epic-newton-301ecc.netlify.app", "http://localhost:3000/", "http://localhost:3000"];

const io = socketio({
    cors: {
        origin: cors_white_list,
      },
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: false,
});

var userQueue =  []; // List of disconnected users
var roomQueue = [];  // List of empty rooms
var roomsMap = new HashMap();  // Map of rooms [ roomID -> { occupied, users }  ]    ( created for quick access)
var userMap = new HashMap(); // Map of users [ userId -> { handle, inRoom, rID } ]   ( created for quick access)

var rID = 1;           // Room ID for the next room to be created

var createRoom = (user) => {
    for(var i=0; i< userQueue.length; i++){
        if(userQueue[i]===user) continue;
        if(!userMap.has(userQueue[i])){ userQueue.splice(i,1); i--; continue; }
        if(!userMap.get(userQueue[i]).inRoom){
            var otherUser = userQueue[i];

            var roomToBeID = -1;
            for(var j=0;j<roomQueue.length;j++){
                if(roomsMap.get(roomQueue[j]).occupied){ roomQueue.splice(j,1); j--; continue; }
                roomToBeID = roomQueue[j];
                roomQueue.splice(j,1);
                break;
            }

            if(roomToBeID===-1){
                roomToBeID = rID;
                rID++;
            }
            console.log(roomToBeID);

            roomsMap.set(roomToBeID, { occupied:true, users:[ otherUser, user ] });
            userMap.set(otherUser, { handle:userMap.get(otherUser).handle, inRoom:true, rID:roomToBeID});
            userMap.set(user, { handle:userMap.get(user).handle, inRoom:true, rID:roomToBeID});
            userQueue.splice(i,1);
            io.to(otherUser).emit('CREATE_ROOM_RESPONSE', { room:roomToBeID, success:true });
            io.to(user).emit('CREATE_ROOM_RESPONSE', { room:roomToBeID, success:true });
            console.log(userMap);
            return true;
        }
        else{
            userQueue.splice(i,1); i--;
        }
    }
    io.to(user).emit('CREATE_ROOM_RESPONSE', { success:false });
    return false;
}


io.on('connection', (socket)=>{
    console.log("We got ourselves a connection : ", socket.id);
    io.sockets.emit("hello");
    
    socket.on('JOIN', ({handle})=>{
        userMap.set(socket.id,{ handle, inRoom:false});
        if(!createRoom(socket.id)) userQueue.push(socket.id);
    });

    socket.on('SEND', ({text,handle,msgID})=>{
        console.log(text,handle);
        try{
            var userid = socket.id;
            var buddies = roomsMap.get(userMap.get(userid).rID).users;
            io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('RECIEVE', { user:handle, text })
            io.to(userid).emit('SENT_RECIEPT', {msgID});
        }
        catch(err) {
            console.log(err.message);
        }
    });

    socket.on('READ', ({len})=>{
        try{
            var userid = socket.id;
            var buddies = roomsMap.get(userMap.get(userid).rID).users;
            io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('READ_RECIEPT', { len }); 
        }
        catch(err) {
            console.log(err.message);
        }
    });

    socket.on('CREATE_ROOM', (data)=>{
        console.log('room requested : ',socket.id);
        if(userQueue.length>=2){
            createRoom(socket.id);
        }
        else{
            io.to(socket.id).emit('CREATE_ROOM_RESPONSE', { success:false });
        }
    });

    socket.on('disconnect', () => {

        try{
            if(userMap.get(socket.id).inRoom){
                var roomID = userMap.get(socket.id).rID;
                var buddies = roomsMap.get(roomID).userQueue;
                userMap.get(buddies[0]).inRoom = false;
                userMap.get(buddies[1]).inRoom = false;
                roomsMap.set(roomID, {occupied:false, users:[]});
                roomQueue.push(roomID);
                io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('ROOM_EMPTY', { });
                userQueue.push(buddies[0]===socket.id?buddies[1]:buddies[0]);
            }
    
            userMap.delete(socket.id);    
        }
        catch(err) {
            console.log(err.message);
        }
        
        console.log('user disconnected : ', socket.id);
    });
    
});

module.exports = io;
