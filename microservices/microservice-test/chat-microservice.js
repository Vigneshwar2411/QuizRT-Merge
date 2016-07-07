var seneca = require('seneca');

var chatMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';


chatMicroservice.use({pin: 'role:authentication,cmd:*'});
