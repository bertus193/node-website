var express = require('express')

var framework = {
  app : express(),
  
  getAuth: function() {
      return auth = require('./auth');
  },
  
  getPaths(){
    return require('./paths');
  }
}
 
module.exports = framework;