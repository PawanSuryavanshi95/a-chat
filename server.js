const express = require('express');
const socketio = require("socket.io");
const http = require("http");

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

io.on('connection', (socket)=>{
    console.log("We got ourselves a connection.");
    io.sockets.emit("hello");
    
    socket.on('JOIN', (data)=>{
        users.push({id:socket.id, handle:data.handle});
        console.log(users);
    });

    socket.on('SEND', ({text,handle,room})=>{
        console.log(text,handle,room);
        for(var i=0;i < users.length;i++){
            /*if(users[i].id!==socket.id){

            }*/
            io.to(users[i].id).emit('RECIEVE', { user:handle, text });
        }
    });

    socket.on('disconnect', () => {
        users.filter(user=>{
            return user.id!==socket.id;
        })
        console.log('user disconnected');
    });
    
});

app.get('/users',(req,res)=>{
    res.send(users);
})

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});