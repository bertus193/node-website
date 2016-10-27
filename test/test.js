var app = require('../index');
var supertest = require('supertest');
var framework = require('../framework/framework')
var path = framework.path


describe('prueba de la app web', function(){
    it('/ devuelve el contenido adecuado', function(done){
        //Al objeto supertest le pasamos la app de Express
        supertest(app)
            //Hacemos una petición HTTP
            .get('/')
            //Supertest incluye sus propias aserciones con 'expect'
            //Cuando ponemos un entero estamos verificando el status HTTP
            .expect(200)
            //Cuando ponemos dos String estamos verificando una cabecera HTTP
            //.expect('X-Mi-Cabecera', 'hola')
            //Si ponemos un string  estamos verificando el cuerpo de la respuesta
            //Como esta ya es la última expectativa, pasamos el 'done'. Supertest lo llamará
            //Cualquier 'expect' admite el 'done' como último parámetro
            .expect('Hola soy express que tal', done);
    });
  
    it('La ruta /hola no existe', function(done){
        supertest(app)
            .get('/hola')
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
            .get('/images/6lrjg')
            .expect('<img src="http://hostimg-albertoricogarcia1993162828.codeanyapp.com:3000/images/lib/6lrjg.png">')
            .expect(200, done);
    });
});