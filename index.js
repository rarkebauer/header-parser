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
		console.log(ctx)

		var langu = ctx.request.acceptsLanguages();
		console.log(langu);

		var clientIp = ctx.request.ip;
		console.log(clientIp);

		var lang = ctx.language;
		console.log(lang);



		var head = ctx.request.header.host;
		ctx.body = head;
		console.log(head);
		
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