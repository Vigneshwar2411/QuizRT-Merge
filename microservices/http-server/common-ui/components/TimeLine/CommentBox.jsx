import React from 'react';
import Post from './Post';
import CommentForm from  './CommentForm';
var socket = io('/my-namespace');
var user ="sandeep";
var id ="t1";
var socket = io('/tournament');
var commentList =  new Map();
export default class CommentBox extends React.Component{
  constructor (){
     super();
     this.state = {postList:[],comments:[]};

  }

loadDataFromSever(){
 var request =  $.ajax({
    url: "api/v1/timeline/posts/all/"+id,
    contentType: 'application/json',
    cache: false});

  request.done(function(data) {

              console.log("=======retrievedPosts=======",JSON.stringify(posts));
              var posts =  data.posts;

                posts.map(function(postData){
                commentList.set(postData._id,[]);   //initializing commentList ..postid as key
                console.log("key:"+postData._id);
              });
             this.setState({postList: posts});

    }.bind(this));

      request.fail(function(xhr, status, err) {
      console.error("api/v1/timeline/tournament/posts", status, err.toString());
    }.bind(this));


//  $.ajax({
//    url: "http://localhost:8080/comments",
//    dataType: 'json',
//    cache: false,
//   success: function(data) {
//     // console.log("cscds"+JSON.stringify(data));
//        data.map(function(cData){    //
//        var key = cData.postId;
//        var comment = commentList.get(key);
//         comment  = comment.concat([cData]);
//         commentList.set(key,comment) ;
//    });
//       this.setState({comments: data});
//
//
//
//   }.bind(this),
//   error: function(xhr, status, err) {
//     console.error("http://localhost:8080/posts", status, err.toString());
//   }.bind(this)
// });

}


  componentDidMount(){
          this.loadDataFromSever();
          console.log(" new new  componentDidMount called");
          var  that = this;
          socket.on('tweetData', function getTweet (tweet) {
           console.log("============tweet ",tweet);
          if(tweet.user.id!="undefined"){
             console.log(tweet);
             var post = {id:tweet.user.id,text:tweet.text,imgUrl:tweet.user.profile_image_url,user:tweet.user.name};
             commentList.set(tweet.user.id,[]);
             that.setState({postList:[post].concat(that.state.postList)});
         }
});

}

   handlePost(newPost){


      var post ={parentId:"t1",text:newPost,imgUrl:"http://lorempixel.com/100/100/nature/",user:"sandeep",postDate:new Date()}
    //  this.setState({postList:[post].concat(this.state.postList)});
     //console.log("postList"+this.state.postList);
       this.WritePostToServer(post)

  }

  WritePostToServer(post){

       var request  =  $.ajax({
          url: "api/v1/timeline/createpost",
          type: 'POST',
          data: JSON.stringify(post),
          contentType: 'application/json'});

          request.done(function(data) {
            console.log("=========data: "+JSON.stringify(data)+"========");
          //  console.log("=========data: "+data.postId+"========");
            var Data = JSON.stringify(data);
            var newpost =  {_id:Data.postId,user:post.user,imgUrl:post.imgUrl,text:post.text}
                commentList.set(Data.postId,[]);
                this.setState({postList:[newpost].concat(this.state.postList)});
          }.bind(this));

          request.fail( function(err) {
            console.error("api/v1/timeline/createpost", status, err.toString());
          }.bind(this));



  }

  handleComment(comment,key) {
     console.log("comment :"+comment);
     var comments =  commentList.get(key);
     console.log("commentsLength"+comments.length);
     var newComment ={id:Date.now,postId:key,cdata:comment};
     comments.push(newComment);
     console.log("commentsLength",JSON.stringify(comments));
     commentList.set(key,comments);
     comments = commentList.get(key);
     console.log("commentsLength"+comments.length);
     this.writeCommentToServer(newComment);
  }

  writeCommentToServer(newComment){
    // $.ajax({
    //       url: "http://localhost:8080/comments",
    //       dataType: 'json',
    //       type: 'POST',
    //       data: newComment,
    //       error: function(xhr, status, err) {
    //         console.error(this.props.url, status, err.toString());
    //       }.bind(this)
    //     });

  }

   handleDeletePost(postData) {
       var i = this.state.postList.indexOf(postData);
       console.log("indexOf",i);
       var newList = this.state.postList.splice(i,1);
      //  newList.map(function(item){
      //    console.log(JSON.stringify(item));
      //  });
       this.setState({postList:this.state.postList});
       console.log("lenght after delete:"+ this.state.postList.length);
       var url =  "api/v1/timeline/posts/"+postData._id;
     $.ajax({
           url: url,
           dataType:'json',
           type: 'DELETE',

           error: function(xhr, status, err) {
             console.error(url, status, err.toString());
           }.bind(this)
         });


   }

  render() {
    var  outerThis = this;
    //console.log("First");
    var submitComment = this.handleComment.bind(this);
    var deletePost    = this.handleDeletePost.bind(this);
    var createPost = this.state.postList.map(function(postData, index) {

         console.log('postId: ' +postData._id) ;
         var comments  =commentList.get(postData._id)
        // console.log("inside "+commentList.get(1));
       return (<Post postData={postData} comments ={comments} id={index++} submitComment={submitComment} deletePost={deletePost}/>);
    });
    return (
      <div>
        <CommentForm newPost={this.handlePost.bind(this)}/>
        <div style = {{marginLeft:0}}>
            {
              createPost
            }
        </div>
      </div>
    )
  }
}
