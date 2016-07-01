module.exports = function(){

  }

  var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var ProfileSchema = new Schema({
  // title: { type: String, required: true },
  // avatarURL: { type: String, required: true },
  // imageURL: { type: String, required: true },
  // overlayTitle: { type: String, required: true },
  // overlaySubtitle: { type: String, required: true },
  // description: { type: String, required: true },
  // rules: { type: String, required: true },
  // prizes: { type: String, required: true },
  // regEndDate: { type: String, required: true },
  // tourStartDate: { type: String, required: true },
  // tourEndDate: { type: String, required: true },
  // topics: { type: String, required: true },
  // playersPerGame: { type: String, required: true },
  // elimination: { type: String, required: true },
  // level: { type: String, required: true }
});

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const Profile = connection.model('Profile', ProfileSchema);

  this.add('role:profile,cmd:retrieveById', function(msg, respond) {
    profile_collection.findById(msg.id, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedProfile});
    });
  });
  this.add('role:myprofile,cmd:retrieveByName', function(msg, respond) {
    profile_collection.findOne(msg.name, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedProfile});
    });
  });

};
