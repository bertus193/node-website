var framework = require('./framework/framework')


console.log(framework.getAuth().getValidationToken())

var lista = new Map()
lista.set(1, {id:1, nombre:"patatas", cantidad:"1 bolsa"})
lista.set(2, {id:2, nombre:"whisky",cantidad:"2 botellas"})
var idActual = 3;


var app = framework.getPaths();


app.listen(3000,function(){
	console.log('Marchando el servidor...')

})