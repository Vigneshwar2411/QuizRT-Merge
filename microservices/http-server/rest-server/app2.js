var express = require('express');
var app = express();
var server = require('http').Server(app);
var x  =  require('./app1');
console.log(x.hello);
var io = require('socket.io').listen(server);

var path = require('path');

var Twitter = require('twitter');

const  TWITTERCONFIG =  require('./twitter.config');
console.log(TWITTERCONFIG);
app.use('/', express.static(path.join(__dirname, 'common-ui')));

var nsp = io.of('/my-namespace');

nsp.on('connection', function(socket){
  console.log("connection created");
});

var client = new Twitter(TWITTERCONFIG);

util =  require('util');
//
client.stream('statuses/filter', {track: '#PunjabOnTheRise'},  function(stream) {
  stream.on('data', function(tweet) {
  nsp.emit('tweetData',tweet);
   console.log(util.inspect(tweet.user.id));
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

server.listen(8080,function(){
  console.log('Server is running at the port ' + 8080);
})
