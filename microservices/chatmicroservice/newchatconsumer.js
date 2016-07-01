const seneca = require('seneca');

const tx = seneca();

tx.use('redis-transport');

tx.act('role:chat,roomId:chatroom1,cmd:getList',{Friend:'Sandeep!'},function(err,res){
  console.log("inside tx");
  if(res.response === 'success') console.log('Msg sent success to chatroom2');
})

tx.act('role:chat,roomId:chatroom1,cmd:send',{msg:'Vigneshwar!'},function(err,res){
  console.log("inside tx");
  if(res.response === 'success') console.log('Msg sent success to chatroom1');
})

tx.client({type:'redis',pin:'role:chat,roomId:chatroom1,cmd:*',host:'172.23.238.253'})

tx.close();
