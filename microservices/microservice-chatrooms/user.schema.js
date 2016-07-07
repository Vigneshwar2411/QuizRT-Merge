var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
  // subject: { type: [String] , required: true, index: true},
  // relation: { type: String , required: true},
  // object: { type: String , required: true}
  username: { type: String, required: true, unique: true, index: true },
  useravatar :{ type: String},
  age :{ type: Number},
  country :{ type: String},
  totalGames :{ type: Number},
  liketopics: { type: [String]},
  following: {type : Number},
  followers: {type: Number}
});

exports = module.exports = mongoose.model('UserProfile', UserProfileSchema);


vigneshwar1@gmail.com
sandeep1@hotmail.com
preethi1@yahoo.co.in
ram1@gmail.com
deepak1@gmail.com
sandeepns1a@gmail.com
tapash1@gmail.com
parag2@gmail.com
chanda1@gmail.com
navjot1@yahoo.com
srikant1@gmail.com
