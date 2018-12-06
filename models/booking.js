var mongoose = require("mongoose");

var bookingSchema = new mongoose.Schema({
	startTime: String,
	endTime: String,
	beginDate: String,
	endDate: String,
	activityType:String,
	// comments:[
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Comment"
	// 	}
	// ]
});


module.exports = mongoose.model("Booking", bookingSchema);
