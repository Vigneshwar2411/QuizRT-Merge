exports = module.exports = function(options) {

this.use('redis-transport');
this.add('role:chat,cmd:sendMsg',function(msg,respond){
  console.log('recieved msg:'+msg.msg);
  return respond(null,{response:'success'});
})
this.listen({type:'redis',pin:'role:chat,cmd:*', host:'172.23.238.253'})
