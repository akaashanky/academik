var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var BCRYPT_COST = 12;

var userSchema = new mongoose.Schema({
	name: {
		firstName: String,
		lastName: String
	},
	email: String,
	passwordHash: String
});

userSchema.statics.hashPassword = function (rawPassword, fn) {
	 // To speed up tests, we do a NODE_ENV check.
	 // If we are in the test environment we set the BCRYPT_COST = 1
	 if (process.env.NODE_ENV === 'test') {
	   BCRYPT_COST = 1;
	 }
	 // encrypt the password using bcrypt; pass the callback function
	 // `fn` to bcrypt.hash()
	 bcrypt.hash(rawPassword, BCRYPT_COST, fn);
};

userSchema.statics.comparePasswordAndHash = function (pwd, pwdHash, fn) {
	//Compare password to the password hash
	bcrypt.compare(pwd, pwdHash, fn);
};

exports.User = mongoose.model('User', userSchema);
