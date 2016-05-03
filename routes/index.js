var express = require('express');
var router = express.Router();
var cover = null;
var multer = require('multer');
var upload = multer({dest: './uploads'});

var homeController = require('../controller/home_controller');

/* GET home page. */
router.get('/', ensureAuthenticated, homeController.getAllProjects);

router.get('/projects', ensureAuthenticated, homeController.getAllProjects);
router.post('/project/save', ensureAuthenticated, upload.any(), homeController.saveProject);
router.get('/project/:id' ,AunthenticationCheck, homeController.showProject);

// TODO: Change this to a more dynamic route name later
router.get('/dashboard', function( req, res ) {
  res.render('admin/index', {coverPictureUrl: cover || '/images/covers.jpg'});
});

router.get('/members', ensureAuthenticated, homeController.getAllUsers);
router.post('/members/privilages', ensureAuthenticated, homeController.changeAccess);


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.role === 'admin'){
		return next();
	}
	res.redirect('/users/login');
}

function AunthenticationCheck(req, res, next){
	var minute = 60*1000;
  if(req.params.id) res.cookie('projectId' , req.params.id, {maxAge:minute} );
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/auth/facebook');
}
module.exports = router;
