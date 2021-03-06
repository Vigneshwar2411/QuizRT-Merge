var should = require('should');
var seneca = require('seneca');

const baseMicroservice = seneca();
const timelineMicroservice = seneca();
const consumerMicroservice = seneca();

const newpost = {
  _id: '1565r4r3880879',
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

// describe('Before', function() {
//   it('Clear timeline collection', function(done) {
//     consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('success');
//       done();
//     });
//   });
// });

describe('save post to database', function() {
  it('post', function(done) {
    consumerMicroservice.act('role:timelineservice,cmd:post',newpost, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});
