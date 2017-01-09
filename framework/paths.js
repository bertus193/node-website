var bp = require('body-parser')
var multipart = require('connect-multiparty');


var framework = require('./framework')

var app = framework.app;
var fs = framework.fs;
var path = framework.path;

//HTML CON PARAMETROS -> RENDER
app.set('view engine', 'ejs');

app.use(bp.urlencoded({ extended: true })) //POST obtener datos
app.use(bp.json())

app.post('/login', function(pet, resp) {
	framework.getAuth().login(pet.body.user, pet.body.pass, function(err, result){
		if(err)
			resp.send("Parece que ha habido algún error");
		else if(result == 2)
			resp.send("Contraseña y/o login incorrectos");
		else{
			framework.localStorage.token = result;
			resp.send("OK");
		}
	})
})

app.get('/logout', function(pet, resp) {
	  var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				if(user.length == 1){
					framework.localStorage.token = null;
					resp.redirect("/")
				}
				else {
    				resp.redirect("/404")
    		}
		});

});

app.get('/perfil', function(pet, resp) {
	  var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				if(user.length == 1){
						resp.render('../views/profile.ejs', {user})
				}
				else {
    				resp.redirect("/404")
    		}
		});

});

app.get('/images/upload', function(req, res){
		var msg = req.query.msg;
		var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				res.render('../views/uploadImage.ejs', {msg, user})
		})
})
	
app.post('/images/upload', multipart(), function(req, resp) {
	var token = framework.localStorage.token;
	framework.getAuth().validateSession(token, function(err, user){
		if(typeof user !== 'undefined' && user !== null && user.length == 1){
			user = user[0].username;
		}
		else{
			user = "Anónimo";
		}
		var tempPath = req.files.image.path;
		var enlace = framework.getImages().generateImageName(5);
		var imageName = enlace + ".png";
		var targetPath = path.resolve('./images/lib/'+imageName);

		if(req.files.image.name === ''){
			resp.render('../views/uploadImage.ejs', {msg : 1, user})
		}	
		else if (req.files.image.type === 'image/png') {
					fs.rename(tempPath, targetPath, function(err) {
							if (err) throw err;
							framework.getImages().newImage("Nueva Imagen",user, enlace, imageName);
							resp.redirect("/images/"+enlace+"?msg=3");
							
					});
		} 
		else {
					fs.unlink(tempPath, function () {
							resp.status(406);
							resp.render('../views/uploadImage.ejs', {msg : 2, user})
					});
		}
	})
})

app.get('/images/:enlace', function(pet,resp){
		var msg = pet.query.msg;
		var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				framework.getImages().getImageByLink(pet.params.enlace, function(err, rows){
					if(err){
						resp.render('../views/viewImage.ejs', {msg : 1, user})
					}
					else if(rows.length == 0){
						resp.render('../views/viewImage.ejs', {msg : 2, user})
					}
					else{
						var urlImage = pet.protocol + '://' + pet.get('host') + '/images/lib/' + rows[0].pathName;
						resp.render('../views/viewImage.ejs', {urlImage, rows, user, msg})
					}
				})
		})
})

app.use('/images/web', framework.express.static('images/web'));
app.use('/css', framework.express.static('css'));
app.use('/js', framework.express.static('js'));
app.use('/lib', framework.express.static('lib'));

app.get('/images/lib/:enlace', function(pet,resp){
		var imageDir = './images/lib/';
		var fullUrl = pet.protocol + '://' + pet.get('host') + pet.originalUrl;		
		var lastSegment = fullUrl.split('/').pop();
	
		fs.readFile(imageDir + lastSegment, function (err, content) {
            if (err) {
                resp.redirect("/404");  
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
			else if(result === 0){
				resp.send("No se ha encontrado ninguna imagen");
			}
			else{
				resp.send("imagen eliminada");
			}
	})
})

app.delete('/images/deleteLastImage', function(pet, resp){
	framework.getImages().deleteLastImage(function(err, result){
			if(err){
				resp.send("Parece que ha habido un error");
			}
			else if(result === 0){
				resp.send("No se ha encontrado ninguna imagen");
			}
			else{
				resp.send("imagen eliminada");
			}
	})
})

app.get('/images/edit/:enlace', function(pet,resp){
		var msg = pet.query.msg;
		var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				framework.getImages().getImageByLink(pet.params.enlace, function(err, rows){
					if(err){
						resp.render('../views/editImage.ejs', {msg : 1, user})
					}
					else if(rows.length == 0){
						resp.render('../views/editImage.ejs', {msg : 2, user})
					}
					else{
						var urlImage = pet.protocol + '://' + pet.get('host') + '/images/lib/' + rows[0].pathName;
						resp.render('../views/editImage.ejs', {urlImage, rows, user, msg})
					}
				})
		})
})
	
app.put('/images/edit/:enlace', function(pet, resp){
	var nombre = pet.body.nombre;
	framework.getImages().updateImage(pet.params.enlace, nombre, function(err, result){
			if(err){
				resp.send("Parece que ha habido un error");
			}
			else if(result == 0){
				resp.send("No se ha encontrado ninguna imagen");
			}
			else{
				resp.send("Datos de la imagen modificados");
			}
	})
})

app.get('/', function(req, res){
	var token = framework.localStorage.token;
	framework.getAuth().validateSession(token, function(err, user){
		if(err){
			res.send("Parece que ha habido un error");
		}
		
		res.render('../views/home.ejs', {user});	
	})
});

app.get('/test', function(pet, res){
		 res.render('../views/test.ejs', {})
})

app.get('/functions/verGaleria', function(req, res){
		//set default variables
	var pageSize = 2;
	var currentPage = 1,imagesArrays = [], imagesList = [];
	framework.getImages().getGalleryImages(function(err, images){
			if(err){
				res.send("Parece que ha habido un error");
			}
			else{
					var totalImages = images.length;
					var pageCount = totalImages/pageSize;
					if(totalImages % 2 != 0){
						pageCount++;
					}
				
					while (images.length > 0) {
							imagesArrays.push(images.splice(0, pageSize));
					}
				
					if (typeof req.query.page !== 'undefined') {
							currentPage = +req.query.page;
					}
				
					imagesList = imagesArrays[+currentPage - 1];
				
					res.render('../views/viewGallery.ejs', {
							images: imagesList,
							pageSize: pageSize,
							pageCount: pageCount,
							currentPage: currentPage,
					});
			}
	})
})

app.get('/404', function(pet, res){
	res.status(404);
	var token = framework.localStorage.token;
	framework.getAuth().validateSession(token, function(err, user){
			res.render('../views/404.ejs', {user})
	})
})

app.get('*', function(pet, res){
	res.redirect("/404");
})

module.exports = app;