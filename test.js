
var app = require('./index.js');
var request = require("supertest").agent(app.listen());
var should = require('should');
var expect = require('chai').expect



describe('server test', function() {

	it('server should work', function(done) { 
		request
			.get('/')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			}); 
	});


	it('should return request header object', function(done) {
		var res = request.get('/').expect(200).end(function(err, res) {
				if (err) return done(err);
				done();
			});
		expect(typeof(res.header)).to.equal('object');

	
	});
});


