exports = module.exports = function(options) {
  console.log(options);

  var self = this;

  self.roomId = options.chatroomId;
  self.socket = options.socket;

  const tx = require('seneca')();
  const rx = require('seneca')();

  rx.use('redis-transport')
    .add('role:chat,roomId:'+self.roomId+',cmd:send',function(msg,respond){
    console.log('recieved msg chatroom1:'+msg.msg);
    self.socket.emit('received_msg',msg.msg);
    return respond(null,{response:'success',message:msg.msg});
  })
    .listen({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'})
    .ready(function(){
      console.log('=====Setup TX=====');
      tx.use('redis-transport');
      tx.client({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'});
      // if(options.cb) {
      //   tx.ready(function()
      //   {
      //      options.cb();
      //   })
      // }
  });

  this.add('role:chat,cmd:sendMsg', function(msg, respond) {
            return tx.ready(function(err){
            if(err) { return respond(err); }
            return tx.act('role:chat,roomId:'+self.roomId+',cmd:send',{msg:msg.msg},respond);
          });
    });

  }
