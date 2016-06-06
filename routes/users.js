var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config/auth');
var UserController = require('../controller/user_controller');


var User = require('../models/user');

/* GET users listing. */

router.get('/', AunthenticationCheck, function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login' , UserController.getLoginPage);

function AunthenticationCheck(req, res, next){
  if(req.isAuthenticated() && req.user.role === 'user'){
    return next();
  }
  res.redirect('/users/login');
}


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

function splitUrl(url){
  console.log(url.split("=")[1] , "this is the url")
  return url.split("=")[1];
}

var passport_setup_strategy = function(){
  return function(req,res, next){
    req.session.redirectTo = splitUrl(req.url);
    passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
        profileFields : config.facebookAuth.profileFields
      },
        function(accessToken, refreshToken, profile, done) {
            //check user table for anyone with a facebook ID of profile.id
            userUrl = splitUrl(req.url);
            User.findOne({
                'facebook_id': profile.id 
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                   var newUser = new User({
                    facebook_id: profile.id,
                    displayName: profile.displayName,
                    gender: profile.gender,
                    profileimage: profile.photos[0].value
                  });
                    newUser.save(function(err) {
                        if (err) console.log(err);
                        return done(err, newUser, userUrl);
                    });
                } else {
                    //found user. Return
                    return done(err, user, userUrl);
                }
            });
        }
    ));
    next();
  }
}

router.get('/auth/facebook',passport_setup_strategy(), passport.authenticate('facebook', { scope : ['email' , 'user_friends', 'user_photos'] }));
router.get('/auth/facebook/callback',
  [passport.authenticate('facebook', { failureRedirect: '/users/auth/facebook' }), UserController.checkPrivilages]);

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', "<div class='container'>You are now logged out</div>");
  res.redirect('/users/login');
});

module.exports = router;
