const express = require('express');
const http = require("http");
var cors = require('cors');
var bodyParser = require('body-parser')
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
app.use('/', router);

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/achat'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})