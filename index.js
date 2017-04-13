var Koa = require("koa");
var app =  module.exports = new Koa();
var os = require('os');

app.use(ctx => {
	try{
		//ctx.body = 'Hello Worl';

		var lang = ctx.request.acceptsLanguages(); //get language ['en-US', 'en']
		console.log(lang);
		langStr = lang[0]; //parse first response
		console.log(langStr);
		ctx.body = lang;
		
		var clientIp = ctx.request.ip;
		if (clientIp.substr(0, 7) == "::ffff:") { //convert from ip6 to ip4 if it's in ip6
	  		clientIp = clientIp.substr(7)
			}
		ctx.body = clientIp;
		console.log(clientIp);
		
		var host = ctx.request.header; //host is an object
		var agent = host['user-agent']; //user user-agent key to get value of user agent
		agent = agent.split(/[\(\)]/)[1]; //regular expression that splits the string where an opening or closing parenthesis is found and return second chunk [1] 
		ctx.body = agent 
		console.log(host['user-agent']);

		ctx.body = { "ip address": clientIp, "software": agent, "language": langStr}
		
		//clientIp + " " + agent + " " + langStr;
		
		
	} catch(err) {
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	} 
});

var port = process.env.PORT || 3000;

if(!module.parent){ app.listen(port); }

console.log("Application started. Listening on port: " + port);