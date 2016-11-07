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
   res.render('../views/login.ejs', {user: 'test' })
});

app.post('/checkLogin', function(pet, resp) {
	framework.getAuth().login(pet.body.user, pet.body.password, function(err, result){
		if(err)
			resp.send(err)
			resp.send(result)
	})
})

app.get('/checkLogin', function(pet, resp) {
	resp.redirect("/login")
})

app.get('/perfil', function(pet, resp) {
	  var token = pet.query.token;
		framework.getAuth().validateSession(token, function(err, result){
				if(result.length == 1){
						resp.send("Hola " + result[0].username);
				}
				else {
    				resp.status(401);
    		    resp.send("Debes autentificarte");
    		}
		});

});

app.get('/images/upload', function(pet, res){
		 res.render('../views/uploadImage.ejs', {user: 'test' })
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
						resp.send(req.files.image.name + " enlace: " + enlace);
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
	
app.put('/images/edit/', function(pet, resp){
	var image = pet.body;
	framework.getImages().updateImage(image, function(err, result){
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

    //set default variables
    var pageSize = 2;
    var currentPage = 1,
        images = [],
        imagesArrays = [], 
        imagesList = [];

    //genreate list of students

	
		framework.getImages().getLast10Images(function(err, result){
			if(err){
				res.send("Parece que ha habido un error");
			}
			/*else if(result == 0){
				resp.send("No se ha encontrado ninguna imagen");
			}*/
			else{
					var totalImages = result.length;
					var pageCount = totalImages/pageSize;
					var url = req.protocol + '://' + req.get('host') + "/images/lib/";
				  for (var i = 0; i < totalImages; i++) {
        			images.push({name: '<img src="'+url+result[i].pathName+'"/>'});
    			}

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
							currentPage: currentPage
					});
			}
	})
});

app.get('*', function(pet, resp){
	resp.status(404);
	resp.send('Hola soy express que tal');
})

module.exports = app;