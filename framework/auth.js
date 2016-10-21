var jwt = require('jwt-simple');
var moment = require('moment');

var framework = require('./framework')

var auth = {
  user : 'pepito',
  secret: '123456',
  
  login: function(req, res) {
 
  },
 
  validate(username, password) {
    if(this.generateToken(username, password) == this.getValidationToken()){
      return true;
    }
    else{
      return false;
    }
  },
  
  getValidationToken(){
    return this.generateToken(this.user, this.secret);
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