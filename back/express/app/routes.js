// app/routes.js
//var catquery = require('../config/catquery');
var source = require('../config/users.js');

module.exports = function(app, passport, users) {

	app.get('/categories',isLoggedIn, function(req, res) {

		res.json(
			{category : source.Category}
		);
	});

	app.get('/subcat', function(req, res) {

		res.json(
			{category : source.subCat}
		);
	});

	app.get('/items', function(req, res) {

		res.json(
			{category : source.items}
		);
	});

	app.post('/subCatStatus', function(req, res) {
		connection.query('UPDATE subCat SET Status = ? WHERE subId = ?',[req.body.Status, req.body.subCat], (err, rows) => {
	})});


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
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          //failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 30;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
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
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
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
		res.redirect('/login');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
