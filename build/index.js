"use strict";

var Koa = require("koa");
var app = module.exports = new Koa();

app.use(function (ctx) {
	try {
		//ctx.body = 'Hello Worl';

		var lang = ctx.request.acceptsLanguages(); //get language ['en-US', 'en']
		langStr = lang[0]; //parse first response

		var clientIp = ctx.request.ip;
		if (clientIp.substr(0, 7) == "::ffff:") {
			//convert from ip6 to ip4 if it's in ip6
			clientIp = clientIp.substr(7);
		}

		var host = ctx.request.header; //host is an object
		var agent = host['user-agent']; //user user-agent key to get value of user agent
		agent = agent.split(/[\(\)]/)[1]; //regular expression that splits the string where an opening or closing parenthesis is found and return second chunk [1] 

		ctx.body = { "ip address": clientIp, "software": agent, "language": langStr };
	} catch (err) {
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	}
});

var port = process.env.PORT || 3000;

if (!module.parent) {
	app.listen(port);
}

console.log("Application started. Listening on port: " + port);