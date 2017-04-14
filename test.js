
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
	})
	/*
	it('should return user language', function() {
		var test = app.ctx;
		request
			.post('/')
			.expect(test.request.acceptsLanguages()).to.be.equal(['en-US', 'en'])
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			}); 
	}); */
	it('should return request header object', function(done) {

		var res = request.get('/').expect(200).end(function(err, res) {
				if (err) return done(err);
				done();
			});
		console.log(JSON.stringify(res));
		console.log(res['host']);
		console.log(res.header);
		expect(typeof(res.header)).to.equal('object');

	
	});
})

describe('req.headers', () => {
  it('should return the request header object', () => {
    const req = request
    const ctx = context();
    req.headers.should.equal(req.request.headers);
  });
});
