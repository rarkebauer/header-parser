
var app = require('./index.js');
var request = require("supertest").agent(app.listen());

describe('server test', function() {

	it('should pass', function(done) {
		request
			.get('/')
			.expect(200)
			.expect('Hello World')
			
			.end(function(err, res) {
				if (err) return done(err);
				done();
			}); 
	})

})


