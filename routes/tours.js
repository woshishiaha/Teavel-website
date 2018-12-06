var express = require("express");
var router = express.Router();
var Tour = require("../models/tour");
var User = require("../models/user");
var Activity = require("../models/activity")
var middleware = require("../middleware/users.js");

// Tour.create({
// 	name: "YYY",
// 	beginDate: "2018",
// 	endDate: "2019",
// 	beginCity: "Miami",
// 	endCity: "LA",
// 	price: "50",
// 	image: "https://images.unsplash.com/photo-1534077293576-17f7f6624a1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=177032c412cb37c0e01b3edf7f4eaa3e&auto=format&fit=crop&w=634&q=80",
// 	description: "sadasdasd"
// }, function(err, tour){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Created~!");
// 		console.log(tour);
// 	}
// });

//index
router.get("/tours", function(req, res){
	Tour.find({}, function(err, allTours){
		if(err){
			console.log(err);
		} else{
			res.render("tours/index", {tour:allTours, currentUser: req.user});
		}
	});
});

//create a tour
router.get("/tours/create", middleware.isLoggedIn, function(req, res){
	res.render("tours/create");
});

router.post("/tours", function(req, res){
	Tour.create(req.body.tour, function(err, newlyTour){
		if(err){
			console.log(err);
		} else {
			res.redirect("/tours");
		}
	});
});

//create an activity

//view the information of one tour
router.get("/tours/:id", function(req, res){
	Tour.findById(req.params.id, function(err, foundTour){
		if(err){
			console.log(err);
		} else {
			Activity.find({}, function(err, allAcitvities){
				if(err){
					console.log(err);
				} else {
					res.render("tours/show", {tour: foundTour, activity:allAcitvities});
				}
			});
		}
	});			
});

router.get("/tours/:id/edit", function(req, res){
	Tour.findById(req.params.id, function(err, foundTour){
		res.render("tours/edit", {tour: foundTour});
	});
});

router.put("/tours/:id", function(req, res){
	Tour.findByIdAndUpdate(req.params.id, req.body.tour, function(err, updatedTour){
		if(err){
			res.redirect("/tours");
		} else {
			res.redirect("/tours/" + req.params.id);
		}
	});
});

router.post("/tours/:tourid/:userid/show", function(req, res){
	User.findById(req.params.userid, function(err, foundUser){
		if(err){
			req.flash("error", "No currently user now!");
			return res.redirect("back");
		}
		Tour.findById(req.params.tourid, function(err, foundTour){
			if(err){
				req.flash("error", "There is no tour yet!");
				return res.redirect("back");
			} else {
				foundUser.tours.push(foundTour);
				foundUser.save();
				req.flash("success", "You have added a tour!");
				res.redirect("/tours");
			}
		});
	});
});

router.delete("/tours/:id", function(req, res){
	Tour.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/tours");
		}else {
			res.redirect("/tours");
		}
	});
});

module.exports = router;