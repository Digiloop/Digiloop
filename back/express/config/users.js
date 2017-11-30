var express = require('express');
var router = express.Router();// load up the user model
var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + 'user_digiloop');

connection.query('SELECT * FROM Category', (err, rows) => {
exports.Category = rows;
});

connection.query('SELECT * FROM subCat', (err, rows) => {
exports.subCat = rows;
});

connection.query('SELECT * FROM junk', (err, rows) => {
exports.junk = rows;
});
