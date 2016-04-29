var User = require('../models/user');
var Project = require('../models/project');
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

console.log('id:-- ',req.body.length, req.body[0].facebook_id);
// var id_arr = [];
// for(var i=0; i< req.body.length; i++){
// 	console.log('l:- ', req.body[i].facebook_id);
// 	id_arr.push(req.body[i].facebook_id)
// }
// console.log("JS:--- ",JSON.stringify(id_arr.join()));
	User.update({facebook_id: { $in: ["509530525860555", "10209697590941998"]}},{$set:{role:req.body[0].role}}, false, true).exec()
	.then(function(user){
		console.log(user,'---------------------')
	});
};

home.getAllProjects = function(req, res){

}


home.saveProject = function(req, res){

}
module.exports = home;