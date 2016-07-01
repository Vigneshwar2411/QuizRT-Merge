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



  const Profile = connection.model('Profile', require('./profile.schema'));

  this.add('role:profile,cmd:addFriend', function(msg, respond) {
    profile_collection.findById(msg.id, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedProfile});
    });
  });

  this.add('role:profile,cmd:create', function(msg, respond) {
    return Profile.find({username: msg.username}, function(err, retrievedProfile) {
      if(err) { return respond(err); }
      if(retrievedProfile.length > 0) { return respond(null, {response: 'fail'}); }
        return Profile.create(msg, function(err, createdProfile) {
          if(err) { return respond(err); }
          return respond(null, {response: 'success'});
        });
    });
  });

  this.add('role:profile,cmd:editProfile', function(msg, respond) {
    console.log('hi');
    console.log(msg);
    return Profile.find({username: msg.username}, function(err, retrievedProfile) {
      if(err) { return respond(err); }
      if(retrievedProfile.length === 0) { return respond(null,{response:'fail'}); }
      // return respond(null, {response: 'success', entity: retrievedProfile});
      else{
        retrievedProfile[0].name = msg.name;
        retrievedProfile[0].imageLink = msg.imageLink;
        retrievedProfile[0].age = msg.age;
        retrievedProfile[0].country = msg.country;

        retrievedProfile[0].save(function(err, updatedProfile){
        if(err) { return respond(err); }
        return respond(null, {response: 'success',entity: updatedProfile});
      });
  }
});

});

  this.add('role:profile,cmd:getProfile', function(msg, respond) {
      return Profile.find({username: msg.username}, function(err, retrievedProfile) {
        if(err) { return respond(err); }
        if(retrievedProfile.length === 0) { return respond(null,{response:'fail'}); }
        return respond(null, {response: 'success', entity: retrievedProfile});
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

      this.add('role:profile,cmd:delete', function(msg, respond) {
        return Profile.remove({username:msg.username}, function(err) {
          if(err) { return respond(err); }
          return respond(null, {response: 'success'});
        });
      });


      this.add('role:profile,cmd:dangerouslyDeleteAllProfiles', function(msg, respond) {
      return Profile.remove({}, function(err) {
        if(err) { return respond(err); }
        return respond(null, {response: 'success'});
      });
    });

  };
