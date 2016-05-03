var express = require('express');
var router = express.Router();
var cover = null;
var multer = require('multer');
var upload = multer({dest: './uploads'});

var homeController = require('../controller/home_controller');

/* GET home page. */
router.get('/', ensureAuthenticated, homeController.getAllProjects);

router.get('/project', ensureAuthenticated, homeController.getAllProjects);
router.post('/project/save', ensureAuthenticated, upload.any(), homeController.saveProject);
router.get('/project/:id' ,AunthenticationCheck, homeController.showProject);
router.get('/project/:id/delete', ensureAuthenticated, homeController.deleteProject);

// TODO: Change this to a more dynamic route name later
router.get('/add-project', function( req, res ) {
  res.render('admin/index', {coverPictureUrl: cover});
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
