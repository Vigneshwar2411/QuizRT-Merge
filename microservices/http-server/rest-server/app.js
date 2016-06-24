var seneca = require('seneca');

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

var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';

console.log('env is: ' + env);

app.use(express.static(__dirname + '/../common-ui'));

if(env.trim() === 'dev') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    next();
  });
};

app.use(require('body-parser').json());

app.use('/api/v1', require('./router'));

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


app.use(function(req, res) {
  return res.status(404).send();
});

exports = module.exports = app;