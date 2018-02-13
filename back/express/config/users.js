var express = require('express');
var router = express.Router();// load up the user model
var mysql = require('mysql2');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);




/*
connection.query('UPDATE subCat SET Status = 1 WHERE subId = 8', (err, rows) => {
  console.log("this updated something");
});
*/
