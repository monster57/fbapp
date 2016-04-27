var models = require('../models');
var User = models.User;

var user = {};

user.getLoginPage = function(req, res, next) {
  res.render('login', {title:'Login'});
};

user.getRegisterPage = function(req, res, next) {
  res.render('register' , {title:'Register'});
};

user.register = function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var profileImage = req.file? req.file.filename:'noimage.jpg';

	//form validation
	req.checkBody('name' , 'Name field is required').notEmpty();
	req.checkBody('email' , 'Email field is required').notEmpty();
	req.checkBody('email' , 'email field is required').isEmail();
	req.checkBody('password' , 'password field is required').notEmpty();
	req.checkBody('password2' , 'password do not match').equals(req.body.password);

	//check error
	var errors = req.validationErrors();

	if(errors){
		res.render('register' , {errors:errors})
	}else{
		var newUser = {
			name: name,
			email:email,
			password:password,
			profileimage: profileImage
		};
		User.createUser(newUser).then(function(user){
			req.flash('success', 'you are now registered and can log in')
			res.location('/');
			res.redirect('/')	
		});
	}
};
user.logout = function(req, res){
	req.logout();
	req.flash('success' , 'you are now logged out');
	res.redirect('/users/login');
};

user.goToHomePage = function(req, res) {
    res.redirect('/');
};


module.exports = user;