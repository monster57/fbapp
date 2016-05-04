var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.promise = Promise;
var bcrypt = require('bcryptjs');
var config = require('../config');

console.log('config url:----------------------- ', config().url);
if(config().url == 'mongodb://localhost/nodeauthtest'){
  mongoose.createConnection(config().url);
}else{
  mongoose.connect(config().url);
}

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
  facebook_id: {
    type: String,
    unique:true,
    index: true
  },
  displayName: {
    type: String
  },
  gender: {
    type: String,
    
  },
  role: {
    type: String,
    default: 'user'
  },
  profileimage:{
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(username, callback){
  var query = {email: username};
  User.findOne(query, callback);
}

// module.exports.getUsers = function(role, callback){
//   var query = {role: role};
//   User.find(query, callback);
// }

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      callback(null, isMatch);
  });
}

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
  });
}