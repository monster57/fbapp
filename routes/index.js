var express = require('express');
var router = express.Router();
var cover = null;
var homeController = require('../controller/home_controller');

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

route.get('/projects', ensureAuthenticated, homeController.getAllProjects);
router.post('/project/save' , ensureAuthenticated, homeController.saveProject);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.role === 'admin'){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
