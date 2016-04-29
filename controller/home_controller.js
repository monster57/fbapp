var User = require('../models/user');

var home = {};

// get list of all users
home.getAllUsers = function(req,res){

 	User.find({role:'user'}).exec()
 	.then(function(users){
 		if(users){
 			console.log('Users Found with role as user.',users);
 			res.render('members', { title: 'member', data: users });
 		}
 		else{
 			console.log('No user found with role user!!!')
 		}
 	});
};

// change user role
home.changeAccess = function(req, res){

	User.update({_id:req.id},{
		role: req.role
	})
};

module.exports = home;