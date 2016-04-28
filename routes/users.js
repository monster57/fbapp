var express = require('express');
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var upload = multer({dest: './uploads'});
var configAuth = require('../config/auth.js');
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

passport.deserializeUser(function(user, done){
    User.find({where: {id: user.id}}).then(function(user){
            done(null, user);
    }).error(function(err){
            done(err, null)
    });
});
passport.use(new LocalStrategy(
        function(username, password, done){
                User.find({where: {email: username}}).then(function(user){
                        passwd = user ? user.password : ''
                        isMatch = User.validPassword(password, passwd, done, user)
                        if(isMatch){
                        	return user
                        }else{
                        	throw new Error('password is wrong');
                        }

                }).catch(function(err){
                	console.log(err);
                });
        }
));

// passport.use(new FacebookTokenStrategy({
//     clientID: "967818673337031",
//     clientSecret: "3b68a364f311dc153bfacf0fa4b84dbb",
//     profileFields: ['id', 'displayName', 'photos','first_name','last_name','link','gender','locale','friends','email'],
//     enableProof: false,
//   }, function(accessToken, refreshToken, profile, done) {
    
//     if (!profile.emails) return done("Something wrong happened");

//     var email = profile.emails[0].value;
//     console.log(profile, "----------------------")
//    }
//  ));
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields	: configAuth.facebookAuth.profileFields

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
        	User.findOne({where:{facebook_id:profile.id}})
        	.then(function(user){

        		if(user){
        			done(null,user);
        		}else{
        			var newUser = {
        				facebook_id:profile.id,
        				displayName: profile.displayName,
        				gender: profile.gender,
        				profileimage: profile.photos[0].value
        			}

        			User.create(newUser).then(function(user){
        				done(null,user);
        			});
        		}
        	},function(err){
        		return done(err);
        	});

    });

}));

router.get('/auth/facebook', passport.authenticate('facebook'));


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/user/login' 
  }),userController.goToHomePage
);

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login' , failureFlash:'invalid email or password'}),
  userController.login
);

module.exports = router;
