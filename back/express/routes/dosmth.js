var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = {



asd: function() {

},

//https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql
getinfo: function(taulu,tieto,callback){
  connection.query('SELECT * FROM '+ taulu +' WHERE Status = '+ tieto +'',function(err, result) {
    callback(err,result)
});
//return await queryresult;
}, // muista pilkut prkl ::::::: https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

/*
getcats: async function(taulu,tieto) {
 let stuff = await this.getinfo(taulu,tieto);
 //let stuff = await this.testi(taulu) // toimii
 return stuff;
}
*/










};
