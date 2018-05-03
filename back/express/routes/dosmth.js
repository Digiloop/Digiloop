var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var queryresult;



module.exports = {


/*getcategories : async function(taulu,tieto)  {

  connection.query('SELECT * FROM '+ taulu +' WHERE Status = '+ tieto +'',async function(err, result) {
if (err) throw err;
console.log(result);
console.log(JSON.stringify(result));

return JSON.stringify(result);
return result;
            await res.json(result);  //toimiii
            await console.log(taulu);
            await console.log(tieto);
            await console.log(result);

            xres = await result;
            //return result;
        });
        return xres;
    }
*/

asd: function() {

},

//https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql
getinfo: async function(taulu,tieto){
  connection.query('SELECT * FROM '+ taulu +' WHERE Status = '+ tieto +'',async function(err, result) {
    if (err) throw err;
    queryresult = result;
});
return await queryresult;
}, // muista pilkut prkl ::::::: https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

getcats: async function(taulu,tieto) {
 let stuff = await this.getinfo(taulu,tieto);
 //let stuff = await this.testi(taulu) // toimii
 return stuff;
}











};
