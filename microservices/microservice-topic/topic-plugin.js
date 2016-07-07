var mongoose = require('mongoose')

var bcrypt = require('bcrypt');

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

  function hashPassword(password, callback) {
    return bcrypt.hash(password, 10, callback);
  }

  function verifyPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, callback);
  }

  const Topic = connection.model('topics_collection',require('./topic.schema'),'topics_collection');



  this.add('role:topic,cmd:retrieveById', function(msg, respond) {
    return Topic.findById(msg.id, function (err, retrievedTopic) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTopic});
    });
  });


  this.add('role:profile,cmd:dangerouslyDeleteAllProfile', function(msg, respond) {
    return Profile.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });
};
