var express = require('express');
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var upload = multer({dest: './uploads'});
var models = require('../models');
var User = models.User;

var userController = require('../controller/user_controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', userController.getRegisterPage);
router.get('/login', userController.getLoginPage);
router.post('/register', upload.single('profileimage'), userController.register);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id) {
  return User.getUserById(id).then(function(user){
  	return user
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({where:{ email: username }}, function (err, user) {
    	console.log(user,"-----------------")
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticateUser(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login' , failureFlash:'invalid email or password'}),
  userController.login
);

module.exports = router;
