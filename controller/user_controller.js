var User = require('../models/user');

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
			password:User.createHash(password),
			profileimage: profileImage
		};
		User.findOne({where:{email:newUser.email}})
		.then(function(user){
			// if(user){
			// 	req.flash('failure','user is already present');
			// 	return res.redirect('/users/register')
			// }
			User.create(newUser)
		}).bind({})
		.then(function(user){
			if(!user) throw Error('user has not created');		
		});
		req.flash('success', 'you are now registered')
		res.location('/');
		return res.redirect('/')
	}
};

user.login = function(req, res) {
	req.session.user = req.user;
  	req.flash('success' , 'you are now logged in');
    res.redirect('/');
};

user.logout = function(req, res){
	req.logout();
	req.flash('success' , 'you are now logged out');
	res.redirect('/users/login');
};

user.goToHomePage = function(req, res) {
	req.flash('success' , 'you are now logged in');
    res.redirect('/');
};

user.checkPrivilages = function(req, res){
	if(req.user.role == 'admin'){
		res.redirect('/');
	}
	else{
		res.redirect('/users');
	}
}

module.exports = user;