const mongoose = require("mongoose")

const schema = mongoose.Schema({
	handle: { type : String , default:"" },
    socketID: { type:String, required:true },
    rID: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default:null},
    inRoom: { type : Boolean , default:false },
    O2O: { type : Boolean , default:false },
});

module.exports = mongoose.model("User", schema)