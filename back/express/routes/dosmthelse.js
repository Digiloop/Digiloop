var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);




module.exports = {
getcategoriestemp : async function(req,res,next)  {
      connection.query('SELECT * FROM Category WHERE Status = 1',async function(err, result) {

            return res.json(result);  //toimiii
        });
    }
  }
