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
          console.log("msg.text===="+msg.text+"=====");
        return  posts.create(msg,function(err,newpost){
             if(err){
                      return respond(err);
                 }
              else return respond(null,{response:'success',postId:newpost._id});
     });

  });

  this.add('role:timelineservice,cmd:dangerouslyDelete',function(err,respond){
   return posts.remove({},function(err){
       if(err){return respond(err);}
       return respond(null,{response:"success"});
      });
    })

  this.add('role:timelineservice,cmd:retrievePostsById',function(msg,respond){
      return posts.find({parentId:msg.parentId},null,{sort:{postDate:-1},skip:0,limit:10},function(err,retrievedPosts){
        if(err){return respond(err);}
        //console.log(retrievedPosts);
        return respond(null,{response:'success',posts:retrievedPosts})
      });
   });
   this.add('role:timelineservice,cmd:deletePostByID',function(msg,respond){
       return posts.findByIdAndRemove({_id:msg.postId},function(err,deletedPost){
         if(err){return responsd(err)}
        // console.log(deletedPost);
         return respond(null,{response:'success',deletedPost:deletedPost})
       })
    });

};
