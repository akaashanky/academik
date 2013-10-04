
var should = require('chai').should(),
    utils = require('../util'),
    User = require('../../models/user').User;


describe('User model', function(){

	describe('#create()', function(){

		it('should create a user', function(done){
			var user = {
				name:{
					firstName: 'Akaash',
					lastName: 'Patnaik'
				},
				email: 'akaashanky@gmail.com'
			};
			User.create(user, function(err, createdUser){
				should.not.exist(err);
				createdUser.name.firstName.should.equal('Akaash');
				createdUser.name.lastName.should.equal('Patnaik');
				createdUser.email.should.equal('akaashanky@gmail.com');
				done();
			});
		});
	});

	describe('#hashPassword()', function(){

		it('should return hashed password asynchronously', function(done){
			var password = 'secret';
			
			User.hashPassword(password, function(err, passwordHash){
				should.not.exist(err);
				should.exist(passwordHash);
				done();
			});
		});
	});


	describe('#comparePasswordAndHash()', function(){
		it('should return true for the correct password', function(done){
			var realPassword = 'secret';

			User.hashPassword(realPassword, function(err, passwordHash){
				should.not.exist(err);
				User.comparePasswordAndHash(realPassword, passwordHash, function(err, areEqual){
					should.not.exist(err);
					areEqual.should.be.equal(true);
					done();
				});
			});
		});

		it('should return false for an incorrect password', function(done){
			var realPassword = 'secret';

			User.hashPassword(realPassword, function(err, passwordHash){
				var fakePassword = 'fakesecret';
				should.not.exist(err);
				User.comparePasswordAndHash(fakePassword, passwordHash, function(err, areEqual){
					should.not.exist(err);
					areEqual.should.be.equal(false);
					done();
				});
			});
		});
	});

});