const express = require('express');
const http = require("http");
var cors = require('cors');

const io = require('./socket');
const router = require('./routes');

const app = express();
const server = http.createServer(app);

io.listen(server);

app.use('/', router);

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});