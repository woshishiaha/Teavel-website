var express = require("express");
var router = express.Router();
var Tour = require("../models/tour");
var Activity = require("../models/activity");
var Schedule = require("../models/schedule");
var User = require("../models/user");
var middleware = require("../middleware/users.js");

router.get("/schedules/:id", middleware.isLoggedIn, function(req, res){
	User.findById(req.params.id).populate("schedules").exec(function(err, foundUser){
		if(err){
			console.log(err);
		} else {
			Activity.find({}, function(err, activity){
				if(err){
					console.log(err);
				} else {
					res.render("schedules/show", {user: foundUser, activity: activity});
				}
			});
			
		}
	});
	
});

router.get("/schedules/:id/city", function(req, res){
	res.render("schedules/city");
});

router.post("/schedules/:id/city", function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err){
			console.log(err);
		} else {
			user.curCity = req.body.curCity;
			user.save();
			res.redirect('/schedules/' + user._id+ '/new');
		}
	});
});

router.get("/schedules/:id/new", function(req, res){
	Activity.find({}, function(err, activity){
		if(err){
			console.log(err);
		} else {
			res.render("schedules/new", {activity:activity});
		}
	});
	
});

router.post("/schedules/:id/new", function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err){
			console.log(err);
		} else {
			Schedule.create(req.body.schedule, function(err, newSchedule){
				if(err){
					console.log(err);
				} else{
					newSchedule.name = req.body.activity;
					newSchedule.save();
					user.schedules.push(newSchedule);
					user.save();
					res.redirect('/schedules/' + user._id);
				}
			});
		}
	});
});

router.delete("/schedules/:id", function(req, res){
	Schedule.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/tours");
		}else {
			res.redirect("/tours");
		}
	});
});

module.exports = router;