var express = require('express');
var router = express.Router();// load up the user model
var mysql = require('mysql2');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
// app/routes.js
//var catquery = require('../config/catquery');
//var source = require('../config/users.js');


module.exports = function(app, passport, users) {
//	app.get('/categories',isLoggedIn, function(req, res)
	app.get('/categories', function(req, res, next) {
		connection.query('SELECT * FROM Category WHERE Status = 1', function (err, result){
		if (err) throw err;
		res.json(
			{category : result}
				);
		});
});

	app.get('/subcat', function(req, res) {
		connection.query('SELECT * FROM subCat WHERE Status = 1',
		function (err, result){
		if (err) throw err;
		res.json(
			{category : result}
				);
		});
});

	app.get('/items', function(req, res) {
		connection.query('SELECT * FROM junk INNER JOIN Coordinates ON junk.junkID=Coordinates.ID',
		function (err, result){
		if (err) throw err;
		res.json(
			{category : result}
				);
		});
		});


// main code, muista x-www-form-urlencoded
	app.post('/subCatStatus', function(req, res) {
		connection.query('UPDATE subCat SET Status = ? WHERE subId = ?;',[req.body.Status, req.body.subIdStatus], (err, rows) => {
			if (err) throw err;
     	console.log(rows.affectedRows + " record(s) updated");
	});
	console.log(req.body.Status," ",req.body.subIdStatus)
		res.json(
			{category : source.subCat}
		);
});

//item Status
app.post('/itemStatus', function(req, res) {
	connection.query('UPDATE junk SET Status = ? WHERE junkID = ?;',[req.body.Status, req.body.subIdStatus], (err, rows) => {
		if (err) throw err;
		console.log(rows.affectedRows + " record(s) updated");
});
console.log(req.body.Status," ",req.body.subIdStatus)
	res.json(
		{category : source.subCat}
	);
});

//itemi lisäys

app.post('/itemADD', function(req, res) {
	var newItem = {
			category: req.body.category.toString(),
			subCat: req.body.subCat.toString(),  // use the generateHash function in our user model
			weight: req.body.weight,
			size: req.body.size,
			description: req.body.description.toString(),
			picture: req.body.picture.toString(),
			pcs: req.body.pcs,
			pickupaddr: req.body.pickupaddr.toString(),
			junkdate: req.body.junkdate,
			junkdateadded: req.body.junkdateadded,
			status: req.body.status,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			status2: req.body.status2
	};
	var insertQuery = "INSERT INTO junk ( category, subCat, weight, size, description, picture, pcs, pickupaddr, junkdate, junkdateadded, status ) values (?,?,?,?,?,?,?,?,?,?,?)";
	var insertQuery2 = "INSERT INTO Coordinates ( latitude, longitude) values (?, ?)";
connection.beginTransaction(function(err){
	if (err) throw err;
	connection.query(insertQuery,[newItem.category, newItem.subCat, newItem.weight, newItem.size, newItem.description, newItem.picture, newItem.pcs, newItem.pickupaddr, newItem.junkdate, newItem.junkdateadded, newItem.status],function(err, rows) {

			//newItem.id = rows.insertId;
			console.log(rows.affectedRows + " record(s) updated");
		});
		connection.query(insertQuery2,[newItem.latitude, newItem.longitude, newItem.status2],function(err, rows) {
	//console.log(rows.affectedRows + " record(s) updated");
			});
			connection.commit(function(err){
				if (err) {
					connection.rollback(function(){
						throw err;
					})
				}
			});
res.end();
});
});



/*
app.post('/submit',function(req, res, next) {
 console.log(req.body.junk);
res.end();
});

app.get('/submit',function(req, res) {
//res.write(req.body.junk);
});
*/
	//---------------------------------------------------------------------------------------------------------



	app.get('/', function(req, res) {
		//res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {


		res.json(
			{user : '-1'}
		);
		// render the page and pass in any flash data if it exists
		//res.render('login.ejs', { message: req.flash('loginMessage'), user : '-1' });
	});


	// process the login form
	app.post('/login', passport.authenticate('local-login', {
          //successRedirect : '/profile', // redirect to the secure profile section
          //failureRedirect : '/login', // redirect back to the signup page if there is an error
          //failureFlash : true // allow flash messages

		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 30;
            } else {
              req.session.cookie.expires = false;
            }
        //res.redirect('/');
				res.end();
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		//res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		//successRedirect : '/profile', // redirect to the secure profile section
		//failureRedirect : '/signup', // redirect back to the signup page if there is an error
		//failureFlash : true // allow flash messages

	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
			//user : req.user // get the user out of session and pass to template
			res.json(
				{user : req.user}
			);
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		//res.redirect('/login');
		res.end();
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	//res.redirect('/');
	res.end();
}
