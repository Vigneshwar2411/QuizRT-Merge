var should = require('should');
var seneca = require('seneca');

const baseMicroservice = seneca();
const timelineMicroservice = seneca();
const consumerMicroservice = seneca();

const newpost = {
//  id: '1565745rwede388,
  text: 'hello',
  userId:"12334"
};

describe('Setup', function() {
  it('Setup Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Setup Timeline Microservice', function(done) {
    this.timeout(10000);
    timelineMicroservice.use('.', {
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
    consumerMicroservice.act('role:timelineservice,cmd:post',newpost, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      console.log("======"+response.postId+"========");
      done();
    });
});
    it('find post by user id',function(done){
     consumerMicroservice.act('role:timelineservice,cmd:retrievedPostsByUserId',{userId:"12334"},function(err,response){
     if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
      done();

      }) ;
    });

    it('delete user post by id',function(done){
     consumerMicroservice.act('role:timelineservice,cmd:deletePostByID',{userId:"12334"},function(err,response){
     if(err){done(err)}
       response.should.have.property('response');
       response.response.should.be.exactly('success');
       console.log(response.deletedPost);
      done();
      }) ;
    });

  });
