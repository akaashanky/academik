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

		res.json(user);
	});
};