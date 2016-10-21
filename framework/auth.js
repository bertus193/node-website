var jwt = require('jwt-simple');
var moment = require('moment');

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
  }
}
 
module.exports = auth;