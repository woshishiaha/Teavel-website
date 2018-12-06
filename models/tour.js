var mongoose = require("mongoose");

var tourSchema = new mongoose.Schema({
	name:String,
	beginDate: String,
	endDate: String,
	beginCity: String,
	endCity: String,
	price: String,
	image : String,
	description: String,
	bookings:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Booking"
		}
	]
	// author:{
	// 	id:{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	},
	// 	username: String
	// },
	
});


module.exports = mongoose.model("Tour", tourSchema);
