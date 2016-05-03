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
router.get('/project/:id' , homeController.showProject);

// TODO: Change this to a more dynamic route name later
router.get('/add-project', function( req, res ) {
  res.render('admin/index', {coverPictureUrl: cover});
});

router.get('/members', ensureAuthenticated, homeController.getAllUsers);
router.post('/members/privilages', AunthenticationCheck, homeController.changeAccess);


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.role === 'admin'){
		return next();
	}
	res.redirect('/users/login');
}

function AunthenticationCheck(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}
module.exports = router;
