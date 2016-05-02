var express = require('express');
var router = express.Router();
var homeController = require('../controller/home_controller');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var cover = null;
var Project = require('../models/project');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

// TODO: Change this to a more dynamic route name later
router.get('/dashboard', function( req, res ) {
  res.render('admin/index', {coverPictureUrl: cover || '/images/covers.jpg'});
});

router.get('/members', ensureAuthenticated, homeController.getAllUsers);
router.post('/members/privilages', homeController.changeAccess);

router.get('/projects', ensureAuthenticated, homeController.getAllProjects);

// var imageUpload = upload.fields([ { name: 'coverimage',maxCount: 4  },
								  // { name: 'backgroundimage1',maxCount: 1  },
								  // { name: 'backgroundimage2',maxCount: 1  },
								  // { name: 'backgroundimage3',maxCount: 1  }]);
router.post('/project/save' ,upload.any(), homeController.saveProject);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.role === 'admin'){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
