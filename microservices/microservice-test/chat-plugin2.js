exports = module.exports = function(options) {
  console.log(options);

  var self = this;

  self.roomId = options.roomId;
  self.socket = options.socket;

  const tx = require('seneca');
  const rx = require('seneca');

  tx.use('redis-transport')
    .client({type:'redis',pin:'role:chat,cmd:sendMsg'});

  rx.use('redis-transport')
    .listen({type:'redis',pin:'role:chat,cmd:sendMsg'});


  this.add('role:chat,cmd:sendMsg', function(msg, respond) {
    tx.act('role:chat,cmd:sendMsg',{msg:"Vigneshwar"},function(err,res){
      if(res.response === 'success') console.log('Msg sent success');
    })
    return respond(null, {response: 'success' ,message: msg.msgToSend});
  });
}
