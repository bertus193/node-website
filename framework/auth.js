var jwt = require('jwt-simple');
var moment = require('moment');
//var session = require('express-session');

var framework = require('./framework')

var auth = {
  username : 'root',
  password: '123456',
  
  login: function(username, password, callback) {
      var con = framework.getMysql().getCon();
      con.query('SELECT * FROM usuarios WHERE username = "'+username+'" && password = "'+password+'" LIMIT 1',function(err,rows){
        if(err){ 
          callback(err);
        }else{
          if(rows.length == 0){
            callback(undefined, false);
          }
          else{
            var token = framework.getAuth().generateToken(username, password);
            framework.getAuth().updateToken(username,token);
            callback(undefined, token);
          }
        }
      });
  },
  
  updateToken(username, token){
    var con = framework.getMysql().getCon();
    con.query('UPDATE usuarios set token = "'+token+'" WHERE username = "'+username+'"');
  },
  
  generateToken(username, password){
    var payload = {
      login: username,
      exp: moment().add(7, 'days').valueOf()
    }
    return token = jwt.encode(payload, password);
  },
  
  getTokenInfo(token, password){
      return decoded = jwt.decode(token, password);
  }
  
  
  
  
  
  
}
 
module.exports = auth;