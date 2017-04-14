
module.exports = {
	checkLang: function(ctx) {
		var lang = ctx.request.acceptsLanguages(); //get language ['en-US', 'en']
		langStr = lang[0]; //parse first response 
		return langStr;
	}
}