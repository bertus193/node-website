var jwt = require('jwt-simple');
var moment = require('moment');
//var session = require('express-session');

var framework = require('./framework')

var auth = {
  
  login: function(username, password, callback) {
      var con = framework.getMysql().getCon();
      con.query('SELECT * FROM usuarios WHERE username = "'+username+'" && password = "'+password+'" LIMIT 1',function(err,rows){
        if(err){ 
          callback(err);
        }else{
          if(rows.length === 0){
            callback(undefined, 2);
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
    return jwt.encode(payload, password);
  },
  
  getTokenInfo(token, password){
      return jwt.decode(token, password);
  },
  
  validateSession(token, callback){
    var con = framework.getMysql().getCon();
    con.query('SELECT username FROM usuarios WHERE token = "' + token + '" LIMIT 1',function(err,rows){
      if(err) 
        callback(err);
        callback(undefined, rows);
    });
  }
  
  
  
  
}
 
module.exports = auth;