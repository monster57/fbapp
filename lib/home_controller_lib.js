var User = require('../models/user');
var Project = require('../models/project');
var Promise = require('bluebird');
var homeLib = {};

// get list of all users
homeLib.getAllUsers = function( args ){

	return User.find({role: args.userRole}).exec()
 	.then(function(users){
 		return users;
 			// res.render('members', { title: 'member', data: users });
 	});
};

// change user role
homeLib.changeAccess = function(args){
	var input = args.data;

	return Promise.map( input, function(user){
		return User.update({facebook_id: user.facebook_id}, {$set: { role: user.role} }).exec()
	});
};

// Get Project Detail
homeLib.getAllProjects = function( id ){

	return Project.find({user_id: id})
			.exec()
			.then(function(projects){
				return projects;
			})
};

// Save the project
homeLib.saveProject = function(args){

	var projectData = {};

	projectData.title = args.title;
	projectData.user_id = args._id;
	projectData.background_image = {};
	var ImageData = args.image_data;
	ImageData.forEach(function(image){
		if(image.fieldname == 'cover_image')
			projectData[image.fieldname] = image.filename;	
		else
			projectData.background_image[image.fieldname] = image.filename;
	});
	var newProject = new Project(projectData);
	return newProject.save(function(err){
		if (err) console.log(err);
		return true;
	});
};

// Show All Projects
homeLib.showProject = function(ProjectId){
	return Project.findOne({_id:ProjectId}).exec()
	.then(function(project){
		return project;
	})
};

// Deleting the project
homeLib.deleteProject = function(ProjectId){
	return Project.find({_id:ProjectId})
	.remove().exec()
	.then(function(){
		return true;
	},function(err){
		return err;
	})
}



module.exports = homeLib;