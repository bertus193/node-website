var bp = require('body-parser')

var framework = require('./framework')
var app = framework.app

var lista = new Map()
lista.set(1, {id:1, nombre:"patatas", cantidad:"1 bolsa"})
lista.set(2, {id:2, nombre:"whisky",cantidad:"2 botellas"})
var idActual = 3;

app.use(bp.urlencoded({ extended: true })) //POST obtener datos
app.use(bp.json())

app.get('/login', function(req, res) {
   res.sendfile('views/login.html', {root: __dirname })
});

app.post('/checkLogin', function(pet, resp) {
	var salida = framework.getAuth().login(pet.body.user,pet.body.password)
	resp.send(salida);
})

app.get('/checkLogin', function(pet, resp) {
	resp.redirect("/login")
})

app.get('/restringido', function(pet, resp) {
		if(framework.getAuth().getSession())
        resp.send("OK, tienes permiso");
    else {
        resp.status(401);
        resp.send("Debes autentificarte");
    }
});

app.get('/api/items/:id', function(pet,resp){
	var id = parseInt(pet.params.id)
	if (isNaN(id)) {
		resp.status(400);
		resp.end();
	}
	else {
		var item = lista.get(id)
		if (item==undefined) {
			resp.status(404)
			resp.send('No existe el item con id ' + id);
		}
		else
			resp.send(item);
	}
})

//para probar con curl
//curl -d '{"nombre":"tomates","cantidad":1}' -H "Content-Type:application/json" -v http://localhost:3000/api/items
app.post('/api/items', function(pet, resp) {
   var nuevo = pet.body
   if (nuevo.nombre && nuevo.cantidad) {
     var creado = {id: idActual, nombre:nuevo.nombre, cantidad: nuevo.cantidad}
	 lista.set(idActual,creado)
	 idActual++
	 resp.status(201)
	 //Fundamentalismo REST
	 resp.header('Location','http://localhost:3000/api/items/'+creado.id) 
	 //En la práctica muchos APIs devuelven el objeto creado, incluyendo id
	 resp.send(creado)    
   }
   else {
   	 resp.status(400)
   	 resp.send("el objeto no tiene los campos adecuados")
   }
})

//Podéis probar esto con
//curl -X DELETE -v http://localhost:3000/api/items/1
app.delete('/api/items/:id', function(pet, resp){
	var id = parseInt(pet.params.id)
	if (isNaN(id)) {
		resp.status(400);
		resp.end();
	}
	else {
		var item = lista.get(id)
		if (item==undefined) {
			resp.status(404)
			resp.send('No existe el item con id ' + id);
		}
		else{
			lista.delete(id);
			resp.end();
		}
	}
})

app.get('*', function(pet, resp){
	resp.send('Hola soy express que tal')
})

module.exports = app;