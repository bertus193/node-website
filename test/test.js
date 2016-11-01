var app = require('../index');
var supertest = require('supertest');
var framework = require('../framework/framework')
var path = framework.path


describe('prueba de la app web', function(){
  
    it('/ devuelve el contenido adecuado', function(done){
        supertest(app)
            .get('/')
            .expect(200)
            .expect('Hola soy express que tal', done);
    });
  
    it('La ruta /hola no existe', function(done){
        supertest(app)
            .get('/hola')
            .expect('Hola soy express que tal')
            .expect(200, done);
    });

    it('Subir Imagen', function(done){
        supertest(app)
            .post('/images/upload/')
            .attach('image', path.join(__dirname, 'x.png'))
            .expect('x.png')
            .expect(200, done);
    });
  
    it('Ver imagen', function(done){
        supertest(app)
            .get('/images/lib/6lrjg.png')
            .expect('Content-Type', 'image/jpg')
            .expect(200, done);
    });
  
    it('Borrar ultima imagen', function(done){
        supertest(app)
            .delete('/images/deleteLastImage')
            .expect('imagen eliminada')
            .expect(200, done);
    });
});