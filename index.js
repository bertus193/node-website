var framework = require('./framework/framework')


console.log(framework.getAuth().getValidationToken())

var app = framework.getPaths();


app.listen(3000,function(){
	console.log('Marchando el servidor...')

})