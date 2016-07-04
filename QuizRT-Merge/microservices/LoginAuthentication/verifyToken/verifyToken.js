var jwt = require('jsonwebtoken');

module.exports = function verify(options){
	//To generate tokens for normal users
	this.add('role:user,action:generatetoken',function(msg,respond){
		var bcrypt = require('bcryptjs');
      	// check if password matches
		bcrypt.compare(msg.data.password, msg.data.comppassword, function(err, comp) {
	        if(comp == true){
	          var token = jwt.sign(msg.data.user, msg.data.secret, {
	              expiresIn: 86400 // expires in 24 hours
	            });

	            // return the information including token as JSON
	            respond(null,{
	            	userid:msg.data.name,
	            	success : true,
	            	token : token
	            });
	        }
	        else {
	        	respond(null,{success:false,message: 'Authentication failed. Wrong password.'});
	        }
      	});
	});

	//To generate tokens for Google Authentication
	this.add('role:user,action:generateGoogleToken',function(msg,respond){
		var token = jwt.sign(msg.data.user,msg.data.secret);

		respond(null,{
			token : token,
			success : true
		});
	});

	this.add('role:user,action:verifytoken',function(msg,respond){
		if (msg.data.token) {

		    // verifies secret and checks exp
		    jwt.verify(msg.data.token, msg.data.secret, function(err, decoded) {
		      if (err) {
		      	respond(null,{success:false, message: 'Failed to authenticate token.' });
		      } else {
		        respond(null,{success:true});
		      }
		    });

	 	} else {
	 		respond(null,{success:false,status:404});
	    }
	});
}
