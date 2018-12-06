var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var Tour = require("./models/tour");
var User = require("./models/user")
const ejsLint = require("ejs-lint");

var toursRoutes = require("./routes/tours");
var activitiesRoutes = require("./routes/activities");
var bookingsRoutes = require("./routes/bookings");
var usersRoutes = require("./routes/users");
var schedulesRoutes = require("./routes/schedules");




mongoose.connect("mongodb://localhost/travel");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
	secret: "KXS!!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use(toursRoutes);
app.use(activitiesRoutes);
app.use(bookingsRoutes);
app.use(usersRoutes);
app.use(schedulesRoutes);

app.get("/", function(req, res){
	res.render("main");
});



app.listen(3000, function(){
	console.log("Linked!");
});
