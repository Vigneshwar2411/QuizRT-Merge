exports = module.exports = function(options) {
  console.log(options);

  var self = this;

  self.roomId = options.roomId;
  self.socket = options.socket;

  const tx = require('seneca')();
  const rx = require('seneca')();

  rx.use('redis-transport')
    .add('role:chat,roomId:chatroom1,cmd:send',function(msg,respond){
    console.log('recieved msg chatroom1:'+msg.msg);
    self.socket.emit('chatReceived:'+self.roomId,{roomId:self.roomId,msg:msg.msg});
    return respond(null,{response:'success',message:msg.msg});
  })
    .listen({type:'redis',pin:'role:chat,roomId:chatroom1,cmd:*'})
    .ready(function(){
      console.log('=====Setup TX=====');
      tx.use('redis-transport');
      tx.client({type:'redis',pin:'role:chat,roomId:chatroom1,cmd:*'});
      if(options.cb) {
        tx.ready(function()
        {
           options.cb();
        })
      }
  });

  this.add('role:chat,cmd:sendMsg', function(msg, respond) {
            return tx.ready(function(err){
            if(err) { return respond(err); }
            return tx.act('role:chat,roomId:chatroom1,cmd:send',{msg:msg.msg},respond);
          });
    });

  }
