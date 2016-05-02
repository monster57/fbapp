var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
// User Schema
var ProjectSchema = mongoose.Schema({
  user_id: {
    type: Schema.ObjectId,
    ref:'User'
  },
  title: {
    type: String
  },
  cover_image:String,
  background_image:{
    background_image_one: String,
    background_image_two: String,
    background_image_three: String

  }
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);


