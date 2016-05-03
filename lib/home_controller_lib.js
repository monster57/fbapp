var User = require('../models/user');
var Project = require('../models/project');

var homeLib = {};

// get list of all users
homeLib.getAllUsers = function( args ){

	return User.find({role: args.userRole}).exec()
 	.then(function(users){
 		return users;
 			// res.render('members', { title: 'member', data: users });
 	});
};




module.exports = homeLib;