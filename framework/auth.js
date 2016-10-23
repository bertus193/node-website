var jwt = require('jwt-simple');
var moment = require('moment');
var session = require('express-session');

var framework = require('./framework')

var auth = {
  username : 'root',
  password: '123456',
  
  login: function(username, password) {
      if(this.validate(username, password)){
          var token = this.getValidationToken();
          session.token = token;
        return true
      }
      else{
        return false
      }
  },
  
  validateSession(){      
        if (session.token){
          var token1 = session.token.split('.')[0]
          var token2 = this.getValidationToken().split('.')[0];
          console.log(token1)
          console.log(token2)
          if(token1 == token2)
            return true
            return false
        }
        else{
          return false
        }
          
  },
 
  validate(username, password) {
    if(this.username == username && this.password == password){
      return true;
    }
    else{
      return false;
    }
  },
  
  getValidationToken(){
    return this.generateToken(this.user, this.password);
  },
  
  generateToken(username, password){
    var payload = {
      login: username,
      exp: moment().add(7, 'days').valueOf()
    }
    return token = jwt.encode(payload, password);
  },
  
  isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (this.validate(username, password))
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
  },
}
 
module.exports = auth;