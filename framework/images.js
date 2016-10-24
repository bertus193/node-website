var framework = require('./framework');

var images = {
  
  getImageByLink : function(link, callback) {
    var con = framework.getMysql().getCon();
    con.query('SELECT * FROM imagenes WHERE enlace = "'+link+'" LIMIT 1',function(err,rows){
      if(err) 
        callback(err);
        callback(undefined, rows);
    });
  },
  
  newImage(nombre, autor, pathName){
    var enlace = generate(5);
    
    var con = framework.getMysql().getCon();
    con.query("INSERT INTO `imagenes` (nombre`, `enlace`, `autor`, `pathName`) VALUES ('"+nombre+"', '"+enlace+"', '"+autor+"', "+pathName+");");
    
  },
  
  generate(count) {
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';

    for(var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str;
}
  
  
}
 
module.exports = images;