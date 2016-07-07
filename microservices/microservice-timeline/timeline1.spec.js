var should = require('should');
var seneca = require('seneca');

const baseMicroservice = seneca();
const timelineMicroservice = seneca();
const consumerMicroservice = seneca();

const newpost = {
  tournamentId:"12221232",
  text:"hello",
  imgUrl:"kdk",
  user:"sandeep",
  postDate:new Date()
};
var id;
describe('Setup', function() {
  it('Setup Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Setup Timeline Microservice', function(done) {
    this.timeout(10000);
    // timelineMicroservice.use('.', {
    //   mongoUrl: 'mongodb://localhost:27017/timeline-test'
    // });
    timelineMicroservice.use('./timeline.tournament-plugin', {
      mongoUrl: 'mongodb://localhost:27017/timeline-test'
    });

    timelineMicroservice.use('mesh', {auto:true, pin:'role:timelineservice,cmd:*'});
    timelineMicroservice.ready(done);

  });

  it('Setup Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});

 //
 // describe('before timeline operation',function(){
 //
 //     it('dangerouslyDelete user all post',function(done){
 //       consumerMicroservice.act('role:timelineservice,cmd:dangerouslyDelete',function(err,response){
 //       if(err){done(err)}
 //       response.should.have.property('response');
 //       response.response.should.be.exactly('success');
 //       done();
 //       });
 //
 //      });
 //
 //  });

describe('timeline operation', function() {

  it('post', function(done) {
    consumerMicroservice.act('role:timelineservice,cmd:tournamentpost',newpost, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
         id  =response.postId;
      console.log("======"+id+"========");
      done();
    });
});
    it('find post by tournamentId id',function(done){
     consumerMicroservice.act('role:timelineservice,cmd:retrievedPostsByTouramentId',{tournamentId:"12221232"},function(err,response){
     if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
      done();

      }) ;
    });

    it('delete touranment post by id',function(done){
     consumerMicroservice.act('role:timelineservice,cmd:deletePostByID',{postId:id,tournamentId:"12221232",user:"sandeep"},function(err,response){
     if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
       console.log(response.deletedPost);
      done();
      }) ;
    });


  });
