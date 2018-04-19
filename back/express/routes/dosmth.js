var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);






module.exports = {



getcategories : async function(taulu2,tieto2,req,res,next)  {
  let taulu = await taulu2
  let tieto = await tieto2
      connection.query("SELECT * FROM '" + connection.escape(taulu) + "' WHERE tieto = '" + connection.escape(tieto) + "'",async function(err, result) {

            //return res.json(result);  //toimiii
            let stuff = await result
            return res.json(stuff);
            throw new Error("Whoops!");
            next();
            //return(result);
        });
    }






};
