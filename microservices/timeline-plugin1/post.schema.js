var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  text: { type: String, required: true },
  userId:{type:String,required:true}
});

exports = module.exports = mongoose.model('posts', PostSchema);
