var seneca = require('seneca')();
// var data = {
// 	name:'anshul',
// 	password:'1234'
// }

seneca.use('entity')
.use('mongo-store',{
	name: process.env.MONGO_DB_NAME || "quizRT4",
	host: process.env.MONGO_HOST || "127.0.0.1",
	port: process.env.PORT || 27017
})
	.use('./registerUser')
	.use('mesh',{auto:true,pin:'role:user,action:*'});
	// .act('role:user,action:add',{data:data},function(err,saveddata){
	// 	console.log('-----------------from service'+saveddata+'----------------------------');
	// })
