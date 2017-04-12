var Koa = require("koa");
var locale = require('koa-locale');
var app =  module.exports = new Koa();
var os = require('os');

//console.log(os.cpus());

locale(app, {
  // the `lang-key` defaults to `lang`
  lang: 'language'
});

app.use(ctx => {
	try{
		//ctx.body = 'Hello Worl';

		var lang = ctx.request.acceptsLanguages();
		console.log(lang);
		ctx.body = lang;
		
		var clientIp = ctx.request.ip;
		ctx.body = clientIp;
		console.log(clientIp);
		

		var host = ctx.request.header; //host is an object
		var agent = host['user-agent'];
		ctx.body = agent 
		console.log(host['user-agent']);

		ctx.body = clientIp + " " + lang + " " + agent;
		
		
	} catch(err) {
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	} 
});


//var port = process.env.PORT || (process.argv[2] || 3000);
//port = (typeof port === "number") ? port : 3000;
var port = process.env.PORT || 3000;

if(!module.parent){ app.listen(port); }

console.log("Application started. Listening on port: " + port);