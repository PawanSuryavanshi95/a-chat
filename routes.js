const express = require('express');

const User = require("./models/User");
const Room = require("./models/Room");

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/data', async (req,res)=>{
    const rooms = await Room.find({});
    const users = await User.find({});
    res.send({rooms, users});
})

router.get('/reset', async (req,res)=>{
    await User.remove({});
    await Room.remove({});
    res.send("Reset !");
})
// Get all group chat rooms
router.get("/getrooms", async (req, res) => {
	const groups = await Room.find();
	res.send(groups);
})

router.post("/newgroup", async (req, res) => {
	const group = new Room({
		name: req.body.name,
        group:true,
	})
	await group.save()
	res.send(group)
})

module.exports = router;