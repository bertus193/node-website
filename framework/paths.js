var bp = require('body-parser')
var multipart = require('connect-multiparty');
var path = require('path')

var framework = require('./framework')

var app = framework.app;
var fs = framework.fs;

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

app.get('/images/upload', function(pet, res){
		res.sendFile('views/uploadImage.html', {root: __dirname })
})
	
app.post('/images/upload', multipart(), function(req, resp) {
	var tempPath = req.files.image.path;
	var enlace = framework.getImages().generateImageName(5);
	var imageName = enlace + ".png";
  var targetPath = path.resolve('./images/lib/'+imageName);
	
  if (path.extname(req.files.image.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            framework.getImages().newImage("Alberto","Alberto", enlace, imageName);
						resp.send(req.files.image.name);
        });
  } 
	else {
        fs.unlink(tempPath, function () {
            resp.send("Only .png files are allowed!");
        });
  }
})

app.get('/images/:enlace', function(pet,resp){
		
		framework.getImages().getImageByLink(pet.params.enlace, function(err, rows){
			if(err){
				resp.send("Parece que ha habido un error");
			}
			else if(rows.length == 0){
				resp.send("no existe dicha imagen");
			}
			else{
				var fullUrl = '<img src="' + pet.protocol + '://' + pet.get('host') + '/images/lib/';
				var salida = fullUrl + rows[0].pathName + '"/>';
				resp.send(salida);
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
                resp.writeHead(200,{'Content-type':'image/jpg'});
                resp.end(content);
            }
		})
})

app.delete('/images/delete/:enlace', function(pet, resp){
	framework.getImages().deleteImage(pet.params.enlace, function(err, result){
			if(err){
				resp.send("Parece que ha habido un error");
			}
			else if(result == 0){
				resp.send("No se ha encontrado ninguna imagen");
			}
			else{
				resp.send("imagen eliminada");
			}
	})
})
	
app.put('/images/edit/:enlace', function(pet, resp){
	resp.send("Name: " + pet.query.nombre);
})

app.get('*', function(pet, resp){
	resp.send('Hola soy express que tal')
})

module.exports = app;