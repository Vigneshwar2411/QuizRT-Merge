var client = require('seneca')();

client.use('chat-plugin2', { roomId: 'abc' });

client.act('role:chat,cmd:sendMsg', {msg: "Hello"}, function(err, response) {
  if(err) { return err }
  console.log(response);
});
