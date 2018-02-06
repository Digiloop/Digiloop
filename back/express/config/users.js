var express = require('express');
var router = express.Router();// load up the user model
var mysql = require('mysql2');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

connection.query('SELECT * FROM Category WHERE Status = 1', (err, rows) => {
exports.Category = rows;

});

connection.query('SELECT * FROM subCat WHERE Status = 1', (err, rows) => {
exports.subCat = rows;
});


connection.query('SELECT * FROM junk INNER JOIN Coordinates ON junk.junkID=Coordinates.ID', (err, rows) => {
exports.items = rows;
});


connection.query('UPDATE Category SET Status = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;', (err, rows) => {
exports.subCat = rows;
});
