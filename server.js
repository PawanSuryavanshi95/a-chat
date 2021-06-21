const express = require('express');
const http = require("http");
var cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

const io = require('./socket');
const router = require('./routes');
const app = express();

const server = http.createServer(app);
const cors_white_list = ["https://epic-newton-301ecc.netlify.app/","https://epic-newton-301ecc.netlify.app", "http://localhost:3000/", "http://localhost:3000"];

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

mongoose.connect('mongodb://localhost:27017/achat', {useNewUrlParser : true, useUnifiedTopology: true }, ()=>{
    console.log('Mongodb Connected');
});

app.use('/', router);

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});
