const express = require('express');
const socketio = require("socket.io");
const http = require("http");
var HashMap = require('hashmap');

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: 'http://localhost:3000',
      }
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var users = [];
var emptyRooms = [];
var rooms = new HashMap();
var rID = 1;
var userMap = new HashMap();

var createRoom = (user) => {
    for(var i=0; i< users.length; i++){
        if(users[i]===user) continue;
        if(!userMap.has(users[i])){ users.splice(i,1); i--; continue; }
        if(!userMap.get(users[i]).inRoom){
            var otherUser = users[i];

            var roomToBeID = -1;
            for(var j=0;j<emptyRooms.length;j++){
                if(rooms.get(emptyRooms[j]).occupied){ emptyRooms.splice(j,1); j--; continue; }
                roomToBeID = emptyRooms[j];
                emptyRooms.splice(j,1);
                break;
            }

            if(roomToBeID===-1){
                roomToBeID = rID;
                rID++;
            }
            console.log(roomToBeID);

            rooms.set(roomToBeID, { occupied:true, users:[ otherUser, user ] });
            userMap.set(otherUser, { handle:userMap.get(otherUser).handle, inRoom:true, rID:roomToBeID});
            userMap.set(user, { handle:userMap.get(user).handle, inRoom:true, rID:roomToBeID});
            users.splice(i,1);
            io.to(otherUser).emit('CREATE_ROOM_RESPONSE', { room:roomToBeID, success:true });
            io.to(user).emit('CREATE_ROOM_RESPONSE', { room:roomToBeID, success:true });
            console.log(userMap);
            return true;
        }
        else{
            users.splice(i,1); i--;
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
        if(!createRoom(socket.id)) users.push(socket.id);
    });

    socket.on('SEND', ({text,handle,msgID})=>{
        console.log(text,handle);
        var userid = socket.id;
        var buddies = rooms.get(userMap.get(userid).rID).users;
        io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('RECIEVE', { user:handle, text })
        io.to(userid).emit('SENT_RECIEPT', {msgID});
    });

    socket.on('READ', ({len})=>{
        var userid = socket.id;
        var buddies = rooms.get(userMap.get(userid).rID).users;
        io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('READ_RECIEPT', { len });
    });

    socket.on('CREATE_ROOM', (data)=>{
        console.log('room requested : ',socket.id);
        if(users.length>=2){
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
                var buddies = rooms.get(roomID).users;
                userMap.get(buddies[0]).inRoom = false;
                userMap.get(buddies[1]).inRoom = false;
                rooms.set(roomID, {occupied:false, users:[]});
                emptyRooms.push(roomID);
                io.to(buddies[0]===socket.id?buddies[1]:buddies[0]).emit('ROOM_EMPTY', { });
                users.push(buddies[0]===socket.id?buddies[1]:buddies[0]);
            }
    
            userMap.delete(socket.id);    
        }
        catch(err) {
            console.log(err.message);
        }
        
        console.log('user disconnected : ', socket.id);
    });
    
});

app.get('/data', (req,res)=>{
    res.send({rooms, emptyRooms,userMap,users});
})

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});