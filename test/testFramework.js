var app = require('../index');
var supertest = require('supertest');
var framework = require('../framework/framework')

var assert = require('assert');

var tokenValido = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InJvb3QiLCJleHAiOjE0NzgwOTk3NjM3MTR9.LxJ5Mu_ANpairH3nrWdRYFqTS2XaHpkSf3WlgZLDMNg';

describe('Prueba Framework', function(){

  
    //TEST 1
    it('Test Decode Token user root', function(){
      assert.equal("root",framework.getAuth().getTokenInfo(tokenValido, "123456").login);
    });
 
});