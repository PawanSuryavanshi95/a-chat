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
var count=0;

io.on('connection', (socket)=>{
    console.log("We got ourselves a connection.");
    io.sockets.emit("hello");
    socket.on('JOIN',(data)=>{
        users.push({id:++count, handle:data.handle});
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
});

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});