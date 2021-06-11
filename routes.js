const express = require('express');

const router = express.Router();
const Groups = require("./models/Groups") 
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
// Get all group chat rooms
router.get("/getrooms", async (req, res) => {
	const groups = await Groups.find();
	res.send(groups);
})

router.post("/newgroup", async (req, res) => {
	const group = new Groups({
		name: req.body.name,
	})
	await group.save()
	res.send(group)
})

module.exports = router;