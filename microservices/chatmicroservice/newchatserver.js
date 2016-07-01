const seneca = require('seneca');

const rx = seneca();
rx.use('redis-transport');

rx.add('role:chat,roomId:chatroom1,cmd:send',function(msg,respond){
  console.log("inside receiver");
  console.log('recieved msg chatroom1:'+msg.msg);
  return respond(null,{response:'success'});
})

rx.add('role:chat,roomId:chatroom1,cmd:getList',function(msg,respond){
  console.log("inside receiver");
  console.log('recieved msg chatroom1:'+msg.msg);
  return respond(null,{response:'success'});
})

rx.listen({type:'redis',pin:'role:chat,roomId:chatroom1,cmd:*', host:'172.23.238.253'});
