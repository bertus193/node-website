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
	framework.getAuth().login(pet.body.user, pet.body.password, function(err, rows){
		if(err)
			resp.send(err)
			resp.send(rows)
	})
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
		var fullUrl = '<img src="' + pet.protocol + '://' + pet.get('host') + '/images/lib/';
		framework.getImages().getImageByLink(pet.params.enlace, function(err, rows){
			if(!err){
				var salida = fullUrl + rows[0].pathName + '"/>';
				resp.send(salida);
			}
			else{
				resp.send("Parece que ha habido un error");
			}
		})
})

app.get('/images/lib/:enlace', function(pet,resp){
		var imageDir = './images/lib/';
		var fullUrl = pet.protocol + '://' + pet.get('host') + pet.originalUrl;		
		var lastSegment = fullUrl.split('/').pop();
	
		fs.readFile(imageDir + lastSegment, function (err, content) {
            if (err) {
                resp.writeHead(400, {'Content-type':'text/html'})
                resp.end("No such image");    
            } else {
                //specify the content type in the response will be an image
                resp.writeHead(200,{'Content-type':'image/jpg'});
                resp.end(content);
            }
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