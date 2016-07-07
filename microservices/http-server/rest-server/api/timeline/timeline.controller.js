var context = require('../../context');
var mesh = context.mesh;


var controller = {}

controller.writePost = function(req,res){
 console.log("========write post==========");

  mesh.act('role:timelineservice,cmd:post',req.body, function(err, response) {

          if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send();

           }

          if(response.response !== 'success') {  return res.status(409).send();
            }
             console.log("========postId: "+response.postId);
             return res.status(201).json({postId:response.postId});
      });
};

controller.deletePostByIDPost = function(req,res){
   console.log("========deletePostByID=======");
  var postId = req.param("postId") ;
  mesh.act('role:timelineservice,cmd:deletePostByID',{postId:postId}, function(err, response) {

          if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send();

           }

          if(response.response !== 'success') {  return res.status(409).send();
            }
             console.log("========deletedPost: "+response.deletedPost);
             return res.status(201);
      });
};
      controller.retrievePostsById = function(req,res){
        console.log("========retrievedPostsById=======");
        var parentId= req.param("parentId");
        console.log("====parentId=====",parentId);

        mesh.act('role:timelineservice,cmd:retrievePostsById',{parentId:parentId}, function(err, response) {

                if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send();
                 }
                 if(response.response !== 'success') {  return res.status(409).send();
                  }
                   console.log("=====retrievedPosts: ",response.posts);
                   return res.status(201).json({posts:response.posts});
            });
};
exports = module.exports = controller;
