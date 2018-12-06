var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	curCity: String,
	isAdmin: {type: Boolean, default: false},
	schedules:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Schedule"
		}
	],
	tours:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tour"
		}
	]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
