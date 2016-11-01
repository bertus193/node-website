var app = require('../index');
var supertest = require('supertest');
var framework = require('../framework/framework')

var assert = require('assert');


describe('Prueba Framework', function(){
  
    //TEST 1
    it('saludar() debería devolver hola mundo', function(){
      assert.equal("hola mundo",framework..saludar());
    });
 
});