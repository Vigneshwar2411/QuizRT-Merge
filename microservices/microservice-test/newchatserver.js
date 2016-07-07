const seneca = require('seneca');

const receivemicroservice = seneca();
receivemicroservice.use('redis-transport');

receivemicroservice.add('role:chat,cmd:chatroom1',function(msg,respond){
  console.log('recieved msg:'+msg.msg);
  return respond(null,{response:'success'});
})

receivemicroservice.listen({type:'redis',pin:'role:chat,cmd:*', host:'172.23.238.253'})
