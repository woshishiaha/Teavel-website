var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var Tour = require("../models/tour")

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	if(req.body.adminCode === "SKX") {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/tours");
		});
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/tours",
		failureRedirect: "/login"
	}) ,function(req, res){
});	

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/tours");
});

router.get("/:id/show", function(req, res){
	User.findById(req.params.id, function(err, user){
		if (err) {
			console.log(err);
		} else {
			Tour.find({}, function(err, allTours){
				if(err){
					req.flash("error", "There is no tours found!");
					res.redirect("/tours");
				} else {
					res.render("users/show", {user: user, tours: allTours});
				}
			});
		}
	});
});

router.delete("/tours/:tourid/:userid/show", function(req, res){
	User.findById(req.params.userid, function(err, user){
		if(err){
			console.log(err);
		} else {
			user.tours.remove(req.params.tourid);
			user.save();
			res.redirect('/'+ user._id + '/show');
		}
	});
});


module.exports = router;