const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    socketID:{type:String, required:true},
})

const schema = mongoose.Schema({
	name: { type : String , default:"" },
    occupied: { type : Boolean , default:false },
    group:{ type:Boolean, default:false },
    users:[userSchema],
});

module.exports = mongoose.model("Room", schema)