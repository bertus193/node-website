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

app.get('/login', function(req, res) {
	var msg = req.query.msg;
	var token = framework.localStorage.token;
	framework.getAuth().validateSession(token, function(err, user){
			res.render('../views/login.ejs', {msg, user})
	})
});

app.post('/checkLogin', function(pet, resp) {
	framework.getAuth().login(pet.body.user, pet.body.password, function(err, result){
		if(err)
			resp.redirect("/login?msg=1")
		else if(result == 2)
			resp.redirect("/login?msg=2")
		else{
			framework.localStorage.token = result;
			resp.redirect("/perfil")
		}
	})
})

app.get('/logout', function(pet, resp) {
	  var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				if(user.length == 1){
						 framework.localStorage.token = null;
						resp.redirect("/login?msg=4")
				}
				else {
    				resp.redirect("/login?msg=3")
    		}
		});

});

app.get('/checkLogin', function(pet, resp) {
	resp.redirect("/login")
})

app.get('/perfil', function(pet, resp) {
	  var token = framework.localStorage.token;
		framework.getAuth().validateSession(token, function(err, user){
				if(user.length == 1){
						resp.render('../views/profile.ejs', {user})
				}
				else {
    				resp.redirect("/login?msg=3")
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
	var user = req.body.user;
	var tempPath = req.files.image.path;
	var enlace = framework.getImages().generateImageName(5);
	var imageName = enlace + ".png";
  var targetPath = path.resolve('./images/lib/'+imageName);
	if(req.files.image.name === ''){
		resp.redirect("/images/upload?msg=1");
	}	
  else if (path.extname(req.files.image.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            framework.getImages().newImage("Nueva Imagen",user, enlace, imageName);
						resp.redirect("/images/"+enlace+"?msg=3");
        });
  } 
	else {
        fs.unlink(tempPath, function () {
            resp.redirect("/images/upload?msg=2");
        });
  }
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
		var msg = req.query.msg;
    //set default variables
    var pageSize = 2;
    var currentPage = 1,imagesArrays = [], imagesList = [];

    //genreate list of students
			var token = framework.localStorage.token;
	framework.getAuth().validateSession(token, function(err, user){
			if(err){
				res.send("Parece que ha habido un error");
			}
	
		framework.getImages().getLast10Images(function(err, images){
			if(err){
				res.send("Parece que ha habido un error");
			}
			else{
					var totalImages = images.length;
				console.log(images.length);
					var pageCount = totalImages/pageSize;
					var url = req.protocol + '://' + req.get('host') + "/images/lib/";
					//split list into groups
					while (images.length > 0) {
							imagesArrays.push(images.splice(0, pageSize));
					}

					//set current page if specifed as get variable (eg: /?page=2)
					if (typeof req.query.page !== 'undefined') {
							currentPage = +req.query.page;
					}

					//show list of students from group
					imagesList = imagesArrays[+currentPage - 1];

					//render index.ejs view file
					res.render('home', {
							images: imagesList,
							pageSize: pageSize,
							pageCount: pageCount,
							currentPage: currentPage,
							user,
							msg
					});
			}
	})
			})
});

app.get('/test', function(pet, res){
		 res.render('../views/test.ejs', {})
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