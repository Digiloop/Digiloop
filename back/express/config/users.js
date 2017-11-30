var express = require('express');
var router = express.Router();// load up the user model
var mysql = require('mysql2');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

connection.query('SELECT * FROM Category', (err, rows) => {
exports.Category = rows;
});

connection.query('SELECT * FROM subCat', (err, rows) => {
exports.subCat = rows;
});

connection.query('SELECT * FROM junk', (err, rows) => {
exports.junk = rows;
});
