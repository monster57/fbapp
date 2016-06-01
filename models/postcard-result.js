var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
// User Schema
var ProjectSchema = mongoose.Schema({
  user_id: {
    type: Schema.ObjectId,
    ref:'User'
  },
  projectId: {
    type: String
  },
  result_image:{
    type: String,
  }
});

var postcardResult = module.exports = mongoose.model('PostcardResult', ProjectSchema);
