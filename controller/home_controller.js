var User = require('../models/user');
var Project = require('../models/project');
var home = {};

// get list of all users
home.getAllUsers = function(req,res){

 	User.find({role:'user'}).exec()
 	.then(function(users){
 			res.render('members', { title: 'member', data: users });
 	});
};

// change user role
home.changeAccess = function(req, res){
	console.log('Coming here:-- ', req.body.data);
	// var input = JSON.parse(req.body.data);
	var input = req.body.data;
	// console.log('INput:--- ',input);
	input.forEach( function(user){
		User.update({facebook_id: user.facebook_id}, {$set: { role: user.role} }).exec();
	});
	res.redirect('/members');

};

home.getAllProjects = function(req, res){
	Project.find({user_id:req.user._id})
	.exec()
	.then(function(projects){
		res.render('index', {projects:projects});
	})
};

home.saveProject = function(req, res){
	var projectData = {};
	projectData.title = req.body.title;
	projectData.user_id = req.user._id;
	projectData.background_image = {};
	req.files.forEach(function(image){
		console.log( image );
		if(image.fieldname == 'cover_image')
			projectData[image.fieldname] = image.filename;	
		else
			projectData.background_image[image.fieldname] = image.filename;
	});
	var newProject = new Project(projectData);
	newProject.save(function(err){
		if (err) console.log(err);
        return res.redirect('/')
	});
};

home.showProject = function(req, res){
	var projectId = req.params.id;
	Project.findOne({_id:projectId}).exec()
	.then(function(project){
		res.render('project/project',{project:project});
	})
};

module.exports = home;
