var express = require('express');
var router = express.Router();
var homeController = require('../controller/home_controller');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

router.get('/members', ensureAuthenticated, homeController.getAllUsers);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.role === 'admin'){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
