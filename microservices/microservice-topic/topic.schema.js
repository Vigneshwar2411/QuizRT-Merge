var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  _id: { type: String, required: true, unique: true, index: true },
  topicName :{ type: String},
  imageLink :{ type: String},
  age :{ type: Number},
  country :{ type: String},
  totalGames :{ type: Number}
});

exports = module.exports = mongoose.model('Profile', ProfileSchema);
