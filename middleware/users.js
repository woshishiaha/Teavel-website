var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to login to do that!");
	res.redirect("/login");
}

module.exports = middlewareObj;