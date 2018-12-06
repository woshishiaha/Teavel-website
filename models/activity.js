var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
	type:String,
	location: String,
	duration: Number,
	cost: String,
	image : String,
	contactInformation: String,
	description: String
	// author:{
	// 	id:{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	},
	// 	username: String
	// },
	// comments:[
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Comment"
	// 	}
	// ]
});


module.exports = mongoose.model("Activity", activitySchema);
