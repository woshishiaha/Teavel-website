var mongoose = require("mongoose");

var scheduleSchema = new mongoose.Schema({
	date: String,
	//curCity: String,
	// seven: String,
	// eight: String,
	// nine: String,
	// ten: String,
	// eleven: String,
	// twelve: String,
	// thirteen: String,
	// forteen: String,
	// fifteen: String,
	// sixteen: String,
	// seventeen: String,
	// eighteen: String,
	// nineteen: String,
	// twenty: String,
	beginTime: String,
	endTime: String,
	name: String


	// user:{
	// 	id:{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	},
	// 	username: String
	// }
	// comments:[
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Comment"
	// 	}
	// ]
});


module.exports = mongoose.model("Schedule", scheduleSchema);