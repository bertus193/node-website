var framework = {
  getAuth: function() {
      return auth = require('./auth');
  },
  
  getPaths(){
    return require('./paths')
  }
}
 
module.exports = framework;