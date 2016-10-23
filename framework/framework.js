var express = require('express')

var framework = {
  app : express(),
  
  getAuth: function() {
      return auth = require('./auth');
  },
  
  getMysql(){
    return require('./mysql');
  },
  
  getPaths(){
    return require('./paths');
  }
}
 
module.exports = framework;