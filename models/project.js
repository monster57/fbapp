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
  cover_image:{
    type: String,
    default: 'cover_image.png'
  },
  background_image:{
    background_image_one:{
      type: String,
      default: 'background_one.png'
    },
    background_image_two: {
      type: String,
      default: 'background_two.png'
    },
    background_image_three: {
      type: String,
      default: 'background_three.png'
    }

  }
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);


