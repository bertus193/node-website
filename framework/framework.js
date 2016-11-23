var express = require('express')

var framework = {
  app : express(),
  fs : require('fs'),
  path : require('path'),
  localStorage : require('localStorage'),
  
  getAuth: function() {
      return auth = require('./auth');
  },
  
  getMysql(){
    return require('./mysql');
  },
  
  getPaths(){
    return require('./paths');
  },
  
  getImages(){
    return require('./images');
  }
  
}
 
module.exports = framework;