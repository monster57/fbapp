var express = require('express');
var router = express.Router();
var cover = null;
var multer = require('multer');
var upload = multer({dest: './uploads'});
var PostcardResult = require('../models/postcard-result');

var homeController = require('../controller/home_controller');

function ensureAdminAuthentication(req, res, next){
  if(req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'superAdmin')){
    return next();
  }
  res.redirect('/users/login');
}

function AunthenticationCheck(req, res, next){
  var minute = 60*1000*60;
  if(req.params.id) res.cookie('projectId' , req.params.id, {maxAge:minute} );
  if(req.isAuthenticated()){
    return next();
  }
  // res.redirect('/users/auth/facebook?url='+req.url);
  res.render("facebook-login.jade")
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



router.post('/project/:id/save', AunthenticationCheck, upload.single('imgData'), function(req, res){
  var data = {};
  data.user_id = req.user._id;
  data.result_image = req.file.filename;
  data.project_id = req.params.id;
  var postcardResult = new PostcardResult(data);
  postcardResult.save(function(err,data){
    if (err) console.log(err);
    console.log(data , "-----------")
    return res.send(data);
    // return res.redirect("/project/"+req.user._id+"/"+req.file.filename+"/preview")
  });
  // PostcardResult.find({user_id:})
})
//working on this part
router.get('/project/:id/:image_name/preview' , function(req,res){
  var result =  { image:req.params.image_name, 
                  projectId:req.params.id
                }
  // res.send("hello")
  // PostcardResult.find({user_id:})
  res.render('user/preview',{result:result} );
});

router.get('/project/:id/:image_name/facebook-share' , function(req, res){
  var result =  { image:req.params.image_name, 
                  projectId:req.params.id
                }
  res.render('user/facebook-share' , {result:result})
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
