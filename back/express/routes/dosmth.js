var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);






module.exports = {
getcategories : async function(taulu,tieto,req,res,next)  {
  await taulu,tieto
      connection.query('SELECT * FROM '+ taulu +' WHERE Status = '+ tieto +'',async function(err, result) {

            //return res.json(result);  //toimiii
            await console.log(result);
            await console.log(taulu);
            await console.log(tieto);
        });
    console.log('hi');
    }
};
