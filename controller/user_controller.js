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
	if(req.user.role == 'admin'){
		res.redirect('/project');
	}
	else{
		res.redirect('/project/'+req.cookies.projectId);
	}
}

module.exports = user;