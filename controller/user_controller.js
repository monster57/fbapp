var User = require('../models/user');

var user = {};

user.getLoginPage = function(req, res, next) {
  res.render('login', {title:'Login'});
};

user.getRegisterPage = function(req, res, next) {
  res.render('register' , {title:'Register'});
};

user.login = function(req, res) {
	req.session.user = req.user;
  	req.flash('success' , 'you are now logged in');
    res.redirect('/project');
};

user.logout = function(req, res){
	req.logout();
	req.flash('success' , 'you are now logged out');
	res.redirect('/users/login');
};

user.goToHomePage = function(req, res) {
	req.flash('success' , 'you are now logged in');
    res.redirect('/project');
};

user.checkPrivilages = function(req, res){
	var facebookUrl = "https://www.facebook.com/totalstyletp/app/1700845086856798/"
	console.log(req.session , "this is cookies ")
	if(req.user.role == 'admin'){
		if(req.session.redirectTo ){
			return res.redirect(facebookUrl);	
		}
		return res.redirect('/project');
	}
	return	res.redirect(facebookUrl);
}

module.exports = user;