var express = require("express");
var router = express.Router();
var Tour = require("../models/tour");
var Activity = require("../models/activity")
var middleware = require("../middleware/users.js")

//show the activities
router.get("/activities", middleware.isLoggedIn, function(req, res){
	Activity.find({}, function(err, allActivities){
		if(err){
			console.log(err);
		} else{
			res.render("activities/list", {activity:allActivities});
		}
	});
});

//create a activity
router.get("/activities/new", function(req, res){
	res.render("activities/new");
});

router.post("/activities", function(req, res){
	Activity.create(req.body.activity, function(err, newlyActivity){
		if(err){
			console.log(err);
		} else {
			res.redirect("/activities");
		}
	});
});

//view the activity
router.get("/activities/:id", function(req, res){
	Activity.findById(req.params.id, function(err, foundActivity){
		if(err){
			console.log(err);
		} else {
			res.render("activities/show", {activity: foundActivity});
		}
	});			
});

//add the selected activity to the cur tour
router.post("/tours/:id/activities", function(req, res){
	Tour.findById(req.params.id, function(err, tour){
		if(err){
			console.log(err);
		} else {
			
		}
	});
});


router.delete("/activities/:id", function(req, res){
	Activity.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/activities");
		}else {
			res.redirect("/activities");
		}
	});
});

module.exports = router;