var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

// User Schema
var ProjectSchema = mongoose.Schema({
  user_id: {
    type: Schema.ObjectId,
    ref:'User'
  },
  title: {
    type: String,
  },
  background_images:{
    image_one: String,
    image_two: String,
    image_three: String
  },
  cover_image:String,
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);


