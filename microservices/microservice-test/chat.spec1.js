var should = require('should');
var seneca = require('seneca');

const firstMicroservice = seneca();
const secondMicroservice = seneca();


var obj1 = {
  message: "hi from micro 1"
}

var obj2 = {
  message: "hi from micro 2"
}

describe('Using Redis', function() {

    it('Microservice1', function(done) {

      firstMicroservice.use('./chat-plugin')
                        .use('redis-transport')
                        .listen({type:'redis',pin:'role:first,chatroomId:abc'})
                          .client({type:'redis',pin:'role:second,chatroomId:abc'})
                          .ready(function(err) {
                            if(err) { return done(err); }
                            firstMicroservice.act('role:chat,chatroomId:abc',obj1,function(err, response) {
                            if(err) { return done(err); }
                            console.log(response);
                            response.should.have.property('message');
                            response.message.should.be.exactly('hi from micro 1');
                            done();
                          })
                        })

                    });

        it('Microservice2', function(done) {
          secondMicroservice.use('./chat-plugin')
                            .use('redis-transport')
                            .listen({type:'redis',pin:'role:second,chatroomId:abc'})
                              secondMicroservice.client({type:'redis',pin:'role:first,chatroomId:abc'})
                              .ready(function(err) {
                                if(err) { return done(err); }
                                secondMicroservice.act('role:chat,chatroomId:abc',obj2,function(err, response) {
                                if(err) { return done(err); }
                                console.log(response);
                                response.should.have.property('message');
                                response.message.should.be.exactly('hi from micro 2');
                                done();
                              })

                          })
                        });

  });
