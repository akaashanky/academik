var utils = require('../util'),
	should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    User = require('../../models/user').User;

describe('User routes', function(){

	describe('POST user', function(){

		it('should create user object and return url to it', function(done){
			var user = {
				name:{
					firstName: 'Stevie',
					lastName: 'Gerrard'
				},
				email: 'stevie@lfc.com'
			};
			api.post('/user')
			.send(user)
			.expect(200)
			.end(function(err, res){
				should.not.exist(err);
				res.text.should.contain('/user/');
				done();
			});
		});

		describe('should return errors for invalid req objects with', function(){
			it('wrong schema', function(done){
				var user = {
					fullName: 'Akaash Patnaik'
				};
				api.post('/user')
				.send(user)
				.expect(400)
				.end(function(err, res){
					should.not.exist(err);
					res.status.should.equal(400);
					done();
				});
			});
			it('invalid email', function(done){
				var user = {
					name:{
						firstName: 'Stevie',
						lastName: 'Gerrard'
					},
					email: 'lfc.com'
				};
				api.post('/user')
				.send(user)
				.expect(400)
				.end(function(err, res){
					res.status.should.equal(400);
					res.body.error.should.contain('email');
					done();
				});
			});
		});
	});
});

