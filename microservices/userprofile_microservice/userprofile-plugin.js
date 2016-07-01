var mongoose = require('mongoose')

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


  const Profile = connection.model('Profile', require('./profile.schema'));

  this.add('role:profile,cmd:create', function(msg, respond) {
    return Profile.find({username: msg.username}, function(err, retrievedProfiles) {
      if(err) { return respond(err); }
      if(retrievedProfiles.length > 0) { return respond(null, {response: 'fail'}); }
        return Profile.create(msg, function(err, createdProfile) {
          if(err) { return respond(err); }
          return respond(null, {response: 'success'});
        });
    });
  });

  this.add('role:profile,cmd:dangerouslyDeleteAllProfiles', function(msg, respond) {
    return Profile.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:profile,cmd:delete', function(msg, respond) {
    return Profile.remove({username:msg.username}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:profile,cmd:changeImage', function(msg, respond) {
    return Profile.find({username: msg.username}, function(err, retrievedProfiles) {
      if(err) { return respond(err); }
      if(retrievedProfiles.length === 0) { return respond(null, {response: 'fail'}); }
      retrievedProfiles[0].imageLink = msg.imageLink;
      retrievedProfiles[0].save(function(err, updatedProfile){
        if(err) { return respond(err); }
        return respond(null, {response: 'success'});
      })
    });
  });

  this.add('role:profile,cmd:updateTotalGames', function(msg, respond) {
    return Profile.find({username: msg.username}, function(err, retrievedProfiles) {
      if(err) { return respond(err); }
      if(retrievedProfiles.length === 0) { return respond(null, {response: 'fail'}); }
      retrievedProfiles[0].totalGames = msg.totalGames;
      retrievedProfiles[0].save(function(err, updatedProfile){
        if(err) { return respond(err); }
        return respond(null, {response: 'success'});
      })
    });
  });

};
