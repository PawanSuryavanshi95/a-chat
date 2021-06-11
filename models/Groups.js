const mongoose = require("mongoose")

const schema = mongoose.Schema({
	name: {type : String , unique :true },
})

module.exports = mongoose.model("Groups", schema)