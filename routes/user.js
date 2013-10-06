var User = require('../models/user').User;


/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.findById = function(req, res){
	console.log('Here!');
	User.findOne({_id: req.params.id}, function(err, user){
		if(err){
			res.send(404);
		}
		else{
			resUser={
				name: {
					firstName: user.name.firstName,
					lastName: user.name.lastName
				},
				email: user.email
			};
			res.json(resUser);
	}
	});
};

exports.createUser = function(req, res, next){
	req.onValidationError(function (field) {
   		return next({code: 400, msg: 'Invalid email'});
 	});
 	req.check('email', 'email').len(1).isEmail();
	var user = {
		name: {
			firstName: req.body.name.firstName,
			lastName: req.body.name.lastName
		},
		email: req.body.email
	}

	User.hashPassword(req.body.password, function(err, passwordHash){
		user.passwordHash = passwordHash;
		User.create(user, function(err, createdUser){
			if(!err){
				res.send('/user/'+createdUser._id.toString());
			}
		});
	});

	
};
