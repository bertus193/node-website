var mysql = require("mysql");
var framework = require('./framework')

var mysql = {
  con : mysql.createConnection({
          host: "localhost",
          user: "root",
          password: ""
        }),
  
  connect(){
    this.con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      
      console.log('Connection established');
    });
    this.con.query("use hostimg;");
  },
  
  end(){
      this.con.end(function(err) {
        
      });
  },
  
  getCon(){
    return this.con;
  }
}
 
module.exports = mysql;