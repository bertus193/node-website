var bp = require('body-parser')
var multipart = require('connect-multiparty');
var fs = require('fs');
var path = require('path')

var framework = require('./framework')
var app = framework.app

var lista = new Map()
lista.set(1, {id:1, nombre:"patatas", cantidad:"1 bolsa"})
lista.set(2, {id:2, nombre:"whisky",cantidad:"2 botellas"})
var idActual = 3;

app.use(bp.urlencoded({ extended: true })) //POST obtener datos
app.use(bp.json())

app.get('/login', function(req, res) {
   res.sendFile('views/login.html', {root: __dirname })
});

app.post('/checkLogin', function(pet, resp) {
	var salida = framework.getAuth().login(pet.body.user,pet.body.password)
	resp.send(salida);
})

app.get('/checkLogin', function(pet, resp) {
	resp.redirect("/login")
})

app.get('/perfil', function(pet, resp) {
		if(framework.getAuth().validateSession()){
				resp.send(framework.getAuth().getTokenInfo())
		}
		else {
    		resp.status(401);
        resp.send("Debes autentificarte");
    }
});

app.get('/restringido', function(pet, resp) {
		if(framework.getAuth().validateSession()){
				
		}
		else {
    		resp.status(401);
        resp.send("Debes autentificarte");
    }
});



app.get('/images/:enlace', function(pet,resp){
		var prueba = "";
		framework.getImages().getImageByLink(pet.params.enlace, function(err, rows){
			console.log(rows);
			resp.send(rows);
		})
})

//para probar con curl
//curl -d '{"nombre":"tomates","cantidad":1}' -H "Content-Type:application/json" -v http://localhost:3000/api/items

app.get('/images/upload', function(pet, res){
		res.sendFile('views/uploadImage.html', {root: __dirname })
})
	
app.post('/images/upload', multipart(), function(req, resp) {
	var tempPath = req.files.image.path;
  var targetPath = path.resolve('./images/'+req.files.image.name);
	
  if (path.extname(req.files.image.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
						resp.send(req.files.image.name);
        });
  } 
	else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
  }
})

//Podéis probar esto con
//curl -X DELETE -v http://localhost:3000/api/items/1
app.delete('/images/:enlace', function(pet, resp){
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