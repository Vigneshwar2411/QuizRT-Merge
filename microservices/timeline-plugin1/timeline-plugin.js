var mongoose = require('mongoose');

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

   const posts = connection.model('posts', require('./post.schema'));

   this.add('role:timelineservice,cmd:post', function(msg, respond) {

              return  posts.create(msg,function(err,newpost){
             if(err){
                   return respond(err);
             }
              else return respond(null,{response:'success'});
     });

  });

  this.add('role:timelineservice,cmd:retrieveUserPosts',function(msg,respond){

      return posts.find({userId:msg.userId},function(err,retrievedPosts){
        if(err){done(err)}
      })
   });

};
