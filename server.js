const express = require('express');
const http = require("http");
var cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

const io = require('./socket');
const router = require('./routes');
const app = express();

const server = http.createServer(app);
const cors_white_list = ["https://a-chat.netlify.app/","https://a-chat.netlify.app", "http://localhost:3000/", "http://localhost:3000"];

io.listen(server);

app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
  origin:cors_white_list,
  credentials:false,
}))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

mongoose.connect('mongodb+srv://pawan:5z53bhmGB3gYTzb@cluster0-okmid.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true }, ()=>{
    console.log('Mongodb Connected');
});

app.use('/', router);

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});
