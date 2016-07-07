const seneca = require('seneca');

const consumermicroservice = seneca();

consumermicroservice.use('redis-transport');

consumermicroservice.act('role:chat,cmd:chatroom1',{msg:'Sandeep!'},function(err,res){
  if(res.response === 'success') console.log('Msg sent success');
})
consumermicroservice.client({type:'redis',pin:'role:chat,cmd:*',host:'172.23.238.253'})

consumermicroservice.close();
