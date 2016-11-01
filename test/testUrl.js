var app = require('../index');
var supertest = require('supertest');
var framework = require('../framework/framework')
var path = framework.path

var tokenValido = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InJvb3QiLCJleHAiOjE0NzgwOTk3NjM3MTR9.LxJ5Mu_ANpairH3nrWdRYFqTS2XaHpkSf3WlgZLDMNg';

var tokenNoValido = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InJvb3QiLCJleHAiOjE0NzgwOTk3NjM3MTR9.LxJ5Mu_ANpairH3nrWdRYFqTS2XaHpkSf3WlgZLDMNy';


describe('prueba de la app web', function(){
  
    //TEST 1
    it('/ devuelve el contenido adecuado', function(done){
        supertest(app)
            .get('/')
            .expect(200)
            .expect('Hola soy express que tal', done);
    });
  
    //TEST 2
    it('La ruta /hola no existe', function(done){
        supertest(app)
            .get('/hola')
            .expect('Hola soy express que tal')
            .expect(200, done);
    });

    //TEST 3
    it('Subir Imagen', function(done){
        supertest(app)
            .post('/images/upload/')
            .attach('image', path.join(__dirname, 'x.png'))
            .expect('x.png')
            .expect(200, done);
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
    it('Perfil con sesion iniciada', function(done){
        supertest(app)                    
            .get('/perfil?token='+tokenValido)
            .expect('Hola root')
            .expect(200, done);
    });
  
    //TEST 8
    it('Perfil, token no valido', function(done){
        supertest(app)                    
            .get('/perfil?token='+tokenNoValido)
            .expect('Debes autentificarte')
            .expect(401, done);
    });
});