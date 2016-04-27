var express = require('express');
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var upload = multer({dest: './uploads'});

var userController = require('../controller/user_controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', userController.getRegisterPage);
router.get('/login', userController.getLoginPage);
router.post('/register', upload.single('profileimage'), userController.register);


module.exports = router;
