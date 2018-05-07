var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports =  {

//https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql

getinfo: function(taulu,tieto,callback){
  connection.query('SELECT * FROM '+ taulu +' WHERE Status = '+ tieto +'',function(err, result) {
    callback(err,result)
  })
}, // muista pilkut prkl ::::::: https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

updatesubcatstatus: function(taulu,status,subid) {
  connection.query('UPDATE ' + taulu +' SET Status = ' + status + ' WHERE subId = ' + subid + ';',function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  })
},

};

/*
  connection.query('UPDATE' + taulu +' SET Status = ' + status + ' WHERE subId = ' + subid + ';',function(err, result) {
    callback(err,result)
  })

*/


    //connection.query('UPDATE' + taulu +' SET Status = ' + req.body.Status + ' WHERE subId = ' + req.body.subIdStatus + ';',
    //    connection.query('UPDATE subCat SET Status = ? WHERE subId = ?;', [req.body.Status, req.body.subIdStatus], (err, rows) => {
