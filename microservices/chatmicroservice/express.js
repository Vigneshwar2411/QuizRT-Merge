var chatmiddlewaremicroservice = require('seneca');
chatmiddlewaremicroservice.use('redis-transport');
chatmiddlewaremicroservice.use('./chat-plugin2',{ roomId: roomId, socket: socket });

socket.on('sendmessage',function(msg){
  chatmiddlewaremicroservice.act('role:chat,cmd:sendMsg', {msg: msgToSend}, function(err, response) {

  }
})
