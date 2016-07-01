exports = module.exports = function(options) {
  console.log(options);
  this.add('role:chat,chatroomId:abc', function(msg, respond) {
    return respond(null, {response: 'success' ,message: msg.message});
  });
}
