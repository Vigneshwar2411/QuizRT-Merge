var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  imageLink :{ type: String, index: true },
  totalGames :{ type: Number, index: true},
  userId :{ type; String, require: true, unique: true, index: true}
});

exports = module.exports = mongoose.model('Profile', ProfileSchema);
