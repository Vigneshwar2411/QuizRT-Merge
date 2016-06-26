var seneca = require('seneca')();

seneca
	.use('entity')
	.use('verifyToken')
	.use('mesh',{auto:true,pin:'role:user,action:*'});
