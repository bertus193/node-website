var framework = require('./framework/framework')


console.log(framework.getImages().generate(3))

framework.getMysql().connect();

var app = framework.getPaths();

app.listen(3000,function(){
	console.log('Marchando el servidor...')

})