const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/data', (req,res)=>{
    res.send({rooms, emptyRooms,userMap,users});
})

router.get('/reset', (req,res)=>{
    users = [];
    emptyRooms = [];
    userMap = new HashMap(); 
    rooms = new HashMap();
    res.send("Reset !");
})

module.exports = router;