var app = require('../index');
var supertest = require('supertest');
var framework = require('../framework/framework')
var path = framework.path
var assert = require('assert');


describe('Test Paths', function(){
  
  var token;
  
    //TEST 1
    it('Devuelve el contenido adecuado', function(done){
        supertest(app)
            .get('/')
            .expect(function(res) {
               assert(res.text.indexOf('HostIMG') > -1);
              })
            .expect(200,done)
    });
  
    //TEST 2
    it('La ruta /hola no existe', function(done){
        supertest(app)
            .get('/hola')
            .expect('Found. Redirecting to /404')
            .expect(302, done);
    });

    //TEST 3
    it('Subir Imagen', function(done){
        supertest(app)
            .post('/images/upload/')
            .attach('image', path.join(__dirname, 'x.png'))
            .expect(function(res) {
               assert(res.text.indexOf('Redirecting to /images') > -1);
              })
            .expect(302, done);
    });
  
    //TEST 4
    it('Ver imagen', function(done){
        supertest(app)
            .get('/images/lib/6lrjg.png')
            .expect('Content-Type', 'image/jpg')
            .expect(200, done);
    });
 
    //TEST 5
    it('Borrar ultima imagen', function(done){
        supertest(app)
            .delete('/images/deleteLastImage')
            .expect('imagen eliminada')
            .expect(200, done);
    });
  
    //TEST 6
    it('Editar imagen', function(done){
        supertest(app)
            .put('/images/edit')
            .send('id=3')
            .send('nombre=Test')
            .expect('Datos de la imagen modificados')
            .expect(200, done);
    });
  
    //TEST 7
    it('Perfil, token no valido', function(done){
        supertest(app)                    
            .get('/perfil')
            .expect('Found. Redirecting to /login?msg=3', done)
    });
  
    //TEST 8
    it('Login', function(done){
        supertest(app)                    
            .post('/checkLogin')
            .send('user=root')
            .send('password=123456')
            .expect('Found. Redirecting to /perfil',done)
    });
  
    //TEST 8-9
    it('Perfil con sesion iniciada', function(done){
        supertest(app)                    
            .get('/perfil?token='+token)
            .expect(function(res) {
               assert(res.text.indexOf('<h3>¡Hola <strong>root</strong>!</h3>') > -1);
              })
            .expect(200, done);
    });
  
    //TEST 10
    it('Subir imagen no valida', function(done){
        supertest(app)                    
            .post('/images/upload')
            .attach('image', path.join(__dirname, 'x.jpg'))
            .expect('Found. Redirecting to /images/upload?msg=2')
            .expect(302, done);
    });
  
    
});