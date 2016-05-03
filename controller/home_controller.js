var User = require('../models/user');
var Project = require('../models/project');
var home = {};

// get list of all users
home.getAllUsers = function(req,res){

	var userRole = 'user';
 	User.find({role: userRole}).exec()
 	.then(function(users){
 			res.render('members', { title: 'member', data: users });
 	});
};

// change user role
home.changeAccess = function(req, res){
	var input = req.body.data;
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
	// req.checkBody('title','title field is required').notEmpty();
	// req.checkBody('cover_image','please provide the cover image').notEmpty();
	// req.checkBody('background_image_one','please provide the first BackgroundImage').notEmpty();
	// req.checkBody('background_image_two','please provide the second BackgroundImage').notEmpty();
	// req.checkBody('background_image_three','please provide the third BackgroundImage').notEmpty();
	// if(!req.files){
	// 	req.flash('failure' , 'please provide all the images');
	// 	res.redirect('/dashboard')
	// }
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
		req.flash('success' , "<div class='container'>Project successfully created!</div>");
        return res.redirect('/project')
	});
};

home.showProject = function(req, res){
	var projectId = req.params.id;
	Project.findOne({_id:projectId}).exec()
	.then(function(project){
		res.render('project/project',{project:project});
	})
};

home.deleteProject = function(req, res){
	var projectId = req.params.id;
	Project.find({_id:projectId})
	.remove().exec()
	.then(function(){
		res.redirect('/project');
	},function(err){
		req.flash('failure' , 'something went wrong');
		res.redirect('/project');
	})
}

module.exports = home;
