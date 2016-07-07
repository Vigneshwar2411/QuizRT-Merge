var seneca = require('seneca');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


var mesh = seneca();
mesh.use('mesh',{auto:true});

var context = require('./context');
context.mesh = mesh;

context.authorizeMiddleware = function(req, res, next) {
  mesh.act('role:jwt,cmd:verify', {token: req.get('JWT')}, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response !== 'success') { return res.status(404).send(); }
    req.claims = response.claims;
    next();
  });
};




var env = process.env.NODE_ENV || 'dev';

console.log('env is: ' + env);

app.use(express.static(__dirname + '/../common-ui'));

if(env.trim() === 'dev') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    console.log("inside server checking env",env);
    next();
  });
};

app.use(require('body-parser').json());

app.use('/api/v1',require('./router'));
//


app.get('/topics',function(req,res) {
  console.log('form express-alltopics');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  mesh.act('role:allTopics,action:retrive',function(err,result){
    if (err) return console.error(err)
  console.log('-----------------'+result+'------------------------')
  res.send(result)
  })
  console.log('send');
});

//
app.post('/api/signup',function(req,res){
<<<<<<< HEAD
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  console.log("inside /api/signup");
=======
  console.log("inside /api/signup");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
>>>>>>> 4d803bdf7ebf780a2e583921ac8bc7325509c742
    var data = {
      username : req.body.name,
      password : req.body.password
    }
    console.log(data);
      mesh.act('role:authentication,cmd:create',data,function(err,response){
        if(err) { return res.status(500).json(err); }
        if(response.response==='success'){

          res.json({
            success: true
          })
        }
        else {
          res.json({
            message : 'User Already Exists',
            success : false
          })
        }
      })
    });


// io.on('connection',function(socket){
//   middleWareCount++;
//   console.log('\n =====Middleware count is: '+middleWareCount+'\n');
//
//   var playerMiddleWareService =  require('seneca')()
//    socket.on('playGame',function(msg){
//
//      playerMiddleWareService.use('redis-transport');
//     // console.log('\n Setting up middleware for user \n');
//     console.log('\n======Initializing plugin for  : '+(msg.username)+'\n');
//     playerMiddleWareService.use('./gameplayMiddlewarePlugin', {
//       username:msg.username,
//       tournamentId:msg.tournamentId,
//       socket:socket
//     });
//   });
//
//   socket.on('disconnect',function(){
//     console.log('\n======Closing service=====\n');
//     playerMiddleWareService.close();
//   })
//
//  // var serverMessages = ["North of the wall","Casterly Rock","Westeros","Pentos","Bravos","Winterfell","Mereen"]
//  // var randomSelection = Math.floor(Math.random()*7)
//
//
//   socket.emit('serverId',"This question is coming from "+name);
//
//   socket.on('myAnswer',function(socketObj){
//     console.log('\n==========Answer received by server is: '+socketObj.answer+'\n');
//      playerMiddleWareService.act('role:user,action:answer',{answer:socketObj.answer},function(err,response){
//
//      })
//   });
// })

//
app.get('/topics/myfav',function(req,res) {
 mesh.act('role:myFav,action:retrive',{user:req.params.uid},function(err,result){
 if (err) return console.error(err)
console.log('------------yahi to hai result-----'+result+'------------------------')
res.send(result);
 })
 console.log('agrt dfglca;lkg');
 })

 app.get('/tournamentSection',function(req,res) {
   console.log('form express-tournamentSection');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:randTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

 app.get('/tournaments',function(req,res) {
   console.log('form express-alltopics');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:allTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

app.post('/api/check',function(req,res){
 console.log('-------------- abc from express floow---------------');
 console.log(req.body.incre+'   0----------------------');
 console.log(req.body.id+'    ---------------------');
 var test = {
   id:req.body.id,
   incre:req.body.incre,
   username:req.body.uName
 }

 var username = req.body.uName;

 mesh.act('role:topic,action:like',{data:test},function(err,result){

   if(err) console.log(err+'---------------------------------------done liked---------');

   console.log(result+'yaha thak hai>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
   if(!req.body.incre) {
     mesh.act('role:topic,action:delete',{data:test},function(err,result2){

       if(err) console.log(err+' ========================');

       res.send(result)
     })
   }
     //  res.send(result);
 })
});

// server.listen(8080,function(){
//   console.log('Server is running at the port ' + 8080);
// });

app.use(function(req, res) {
  return res.status(404).send();
});

exports = module.exports = server;
