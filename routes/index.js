var express = require('express');
var router = express.Router();
var cover = null;
var multer = require('multer');
var upload = multer({dest: './uploads'});

var homeController = require('../controller/home_controller');

function ensureAdminAuthentication(req, res, next){
  if(req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'superAdmin')){
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

function ensureSuperAdminAuthentication(req, res, next){
  if(req.isAuthenticated() && req.user.role === 'superAdmin'){
    return next();
  }
  res.redirect('/users/login');
}

/* GET home page. */
router.get('/', ensureAdminAuthentication, homeController.getAllProjects);

router.get('/project', ensureAdminAuthentication, homeController.getAllProjects);

router.get('/about' , ensureAdminAuthentication , function(req,res){
  res.render('about');
});

router.get('/project/:id/preview' , function(req,res){
  res.render('user/preview');
})
router.get('/project/:id/facebook-share' , function(req, res){
  res.render('user/facebook-share')
});

router.post('/project/save', ensureAdminAuthentication, upload.any(), homeController.saveProject);
router.get('/project/:id/' ,AunthenticationCheck, homeController.showProject);
router.post('/project/:id/' ,AunthenticationCheck, homeController.getProject);
router.get('/project/:id/delete', ensureAdminAuthentication, homeController.deleteProject);


// TODO: Change this to a more dynamic route name later
router.get('/add-project', homeController.getAddProjectPage);
router.get('/members', ensureAdminAuthentication, homeController.getAllUsers);
router.post('/members/privilages', ensureAdminAuthentication, homeController.changeAccess);





module.exports = router;
