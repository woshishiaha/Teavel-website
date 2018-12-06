var express = require("express");
var router = express.Router();
var Tour = require("../models/tour");
var Activity = require("../models/activity")
var Booking = require("../models/booking")


router.get("/tours/:id/new", function(req, res){
	Tour.findById(req.params.id, function(err, foundTour){
		if(err){
			console.log(err);
		} else {
			Activity.find({}, function(err, allActivities){
				if(err){
					console.log(err);
				} else {
					res.render("bookings/new", {activity: allActivities, tour: foundTour});
				}
			});
		}
	});
});


router.post("/tours/:id/bookings", function(req, res){
	Tour.findById(req.params.id, function(err, foundTour){
		if(err){
			console.log(err);
		} else {
			Booking.create(req.body.booking, function(err, booking){
				if(err){
					console.log(err);
				} else {
					booking.activityType = req.body.activity;
					booking.save();
					foundTour.bookings.push(booking);
					foundTour.save();
					res.redirect('/tours/' + foundTour._id);
				}
			});
		}
	});
});

router.get("/tours/:id/show", function(req, res){
	Tour.findById(req.params.id).populate("bookings").exec(function(err, foundTour){
		if(err){
			console.log(err);
		} else {
			Activity.find({}, function(err, allActivities){
				if(err){
					console.log(err);
				} else {
					res.render("bookings/show", {activity: allActivities, tour: foundTour});
					//console.log(foundTour.bookings);
				}
			});
		}
	});
});


module.exports = router;