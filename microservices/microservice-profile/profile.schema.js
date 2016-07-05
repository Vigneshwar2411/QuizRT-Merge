var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  name :{ type: String},
  imageLink :{ type: String},
  age :{ type: Number},
  country :{ type: String},
  totalGames :{ type: Number}
});

exports = module.exports = mongoose.model('Profile', ProfileSchema);
