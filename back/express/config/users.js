var express = require('express');
var router = express.Router();// load up the user model
var mysql = require('mysql2');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + 'user_digiloop');


//module.exports = {testi3 : "abc"};
//module.exports = function(users) {
//var category;
//app.set("hello",category);
//req.random="paivaa";
//app.set('abc', abc);
/*
// used to serialize the user for the session
passport.serializeUser(function(CatId, done) {
    done(null, category.CatId);
});

// used to deserialize the user
passport.deserializeUser(function(CatId, done) {
    connection.query("SELECT * FROM Category WHERE CatId = ? ",[CatId], function(err, rows){
        done(err, rows[0]);
    });
});
*/
//connection.connect(function(err) {
  //if (err) throw err;
	connection.query('SELECT * FROM Category', (err, rows) => {
  //category = rows[0].CatName;
	var testi1 = rows;

  exports.Testi1 = testi1;
	//if (err) throw err;
  //  });

  console.log("Connected!");
  console.log("")
});

//};
