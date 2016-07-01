var seneca = require('seneca');

var timelinemicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

timelinemicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});
timelinemicroservice.use('mesh', {auto:true, pin:'role:timelineservice,cmd:*'});
