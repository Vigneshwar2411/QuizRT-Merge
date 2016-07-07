var should = require('should');
var seneca = require('seneca');

const firstMicroservice = seneca();
const secondMicroservice = seneca();


var obj = {
  message: "hi"
}

describe('Using Redis', function() {
  const roomId = 'abc';
  const msgToSend = 'yeo!';

  const player1Microservice = seneca();
  const player2Microservice = seneca();

  var p1Received = false;
  var p2Received = false;
  it('Create Player1 Chat Middleware uService', function(done) {
    const socket = {
      emit: function(event,msg) {
        event.should.be.exactly('chatReceived:abc');
        msg.should.have.property('roomId');
        msg.roomId.should.be.exactly(roomId);
        msg.should.have.property('msg');
        msg.msg.should.be.exactly(msgToSend);
        p1Received = msg.msg;
      }
    }
    player1Microservice.use('chat-plugin2', { roomId: roomId, socket: socket });
    player1Microservice.ready(done);
  });

  it('Create Player2 Chat Middleware uService', function(done) {
    const socket = {
      emit: function(event,msg) {
        event.should.be.exactly('chatReceived:abc');
        msg.should.have.property('roomId');
        msg.roomId.should.be.exactly(roomId);
        msg.should.have.property('msg');
        msg.msg.should.be.exactly(msgToSend);
        p2Received = msg.msg;
      }
    }
    player2Microservice.use('chat-plugin2', { roomId: roomId, socket: socket });
    player2Microservice.ready(done);
  });

  it('P1 Sends Chat Msg', function(done) {
    player1Microservice.act('role:chat,cmd:sendMsg', {msg: msgToSend}, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      setTimout(function() {
        p1Received.should.be.exactly(response.msgToSend);
        p2Received.should.be.exactly(response.msgToSend);
        done();
      },600);
    });
  });
});
