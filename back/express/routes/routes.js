var express = require('express');

module.exports = (app, passport, users) => {
/*
    app.get('/users', (req, res) => {
        connection.query('SELECT * FROM users', (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
*/
 
    app.get('/', function (req, res) {});

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        res.json({
            user: '-1'
        });
    });


    // process the login form
    //mahdollinen ratkaisu palautukseen ilman flashia
    //https://github.com/jaredhanson/passport-local/issues/4
    app.post('/login', passport.authenticate('local-login', { session: true }), (req, res) => {
        console.log(req.user.email + " logged in.");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 30000;
        } else {
            req.session.cookie.expires = false;
        }

        var userObject = {
            address: req.user.address, city: req.user.city, company: req.user.company, email: req.user.email,
            fname: req.user.fname, id: req.user.id, lname: req.user.lname, phone: req.user.phone, userlvl: req.user.userlvl, username: req.user.username, zipcode: req.user.zipcode, ytunnus: req.user.ytunnus
        };

        res.json({
            userdata: userObject
        });
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    /*
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        //res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
*/
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {}));
    app.post('/signupCompany', passport.authenticate('local-company', {}));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', (req, res) => {
        req.logout();
        //res.redirect('/login');
        res.end();
    });
};