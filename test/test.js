var utils = require('./util');
var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('test', function () {
 it('should add 1+1 correctly', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });

 it('should 2 in response sum from add/1/1', function(done){
 	api.get('/add/1/1')
 	.expect(200)
 	.end(function(err, res){
 		should.not.exist(err);
 		res.text.should.equal('2');
 		done();
 	});
 });

});