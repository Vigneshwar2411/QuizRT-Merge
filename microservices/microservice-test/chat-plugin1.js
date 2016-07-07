

var obj = {
  message: "hi"
}

exports = module.exports = function(options) {
  console.log(options);

  tx.require('./chat-plugin');
  tx.use('redis-transport');
  tx.client({type:'redis',pin:'role:chat,chatroomId:dd'});
  tx.ready(function(err){
    if(err) { return done(err); }
    tx.act('role:chat,chatroomId:abc',obj,function(err, response) {
      if(err) { return done(err); }

    });
  })

  rx.use('redis-transport');
  rx.listen({type:'redis',pin:'role:chat,chatroomId:abc'});
  rx.ready(respond to );

  this.add('role:chat,chatroomId:middle', function(msg, respond) {
    tx(msg.message);
  });
}
