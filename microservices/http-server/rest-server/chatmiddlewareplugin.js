exports = module.exports = function(options) {
  console.log(options);

  var self = this;

  self.roomId = options.chatroomId;
  self.socket = options.socket;

  const tx = require('seneca')();
  const rx = require('seneca')();

  rx.use('redis-transport')
    .add('role:chat,roomId:'+self.roomId+',cmd:send',function(msg,respond){
      console.log('msg object inside the rx:'+msg);
    console.log('recieved msg chatroom1:'+msg.msg);
    self.socket.emit('received_msg',msg.msg);
    return respond(null,{response:'success',message:msg.msg});
  })

    .listen({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'})
    .ready(function(){
      console.log('=====Setup TX=====');
      tx.use('redis-transport');
      tx.client({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'});
  });

  this.add('role:chat,cmd:sendMsg', function(msg, respond) {
            return tx.ready(function(err){
            if(err) { return respond(err); }
            console.log("========Inside Middleware No Act on plugin happened=====");
            return tx.act('role:chat,roomId:'+self.roomId+',cmd:send',{msg:msg.msg},respond);
          });
    });

  this.add('role:chat,cmd:unsubscribe',function(msg,respond){
      console.log("=====Inside Plugin to, msg is to unsubscribe the channel====",msg.msg);
      return tx.unsubscribe({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'},function(err){
          if(err) { return respond(err); }
          return respond(null,{response:'success',message:'unsubscibed'})
      })
  });

  }
