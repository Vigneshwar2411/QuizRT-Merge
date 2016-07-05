var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
  subject: { type: [String] , required: true, index: true},
  relation: { type: String , required: true},
  object: { type: String , required: true}
});

exports = module.exports = mongoose.model('UserProfile', UserProfileSchema);
