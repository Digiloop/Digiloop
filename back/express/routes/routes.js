var express = require('express');
var router = express.Router(); // load up the user model
var mysql = require('mysql2');
var dbconfig = require('../app/database');
var fileUpload = require('express-fileupload');
var connection = mysql.createConnection(dbconfig.connection);
var bcrypt = require('bcrypt-nodejs');
//var datenow = Date.now();
const fs = require('fs');
connection.query('USE ' + dbconfig.database);

// app/routes.js
//var catquery = require('../config/catquery');
//var source = require('../config/users.js');
//http://catlau.co/how-to-modularize-routes-with-the-express-router/
//https://blog.grossman.io/expressjs-tips-for-large-applications/
//https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
//https://www.terlici.com/2014/09/29/express-router.html
//https://www.caffeinecoding.com/better-express-routing-for-nodejs/
//winscp kaatu
module.exports = (app, passport, users) => {

    app.get('/session', (req, res) => {
        res.json(req.users);
    });
    app.post('/feikkiCatAdd', (req, res) => {
        connection.query("INSERT INTO SubSubCats ( imgReference, name, subCatId) values (?, ?, ?)", ['i can haz reference', req.body.name, req.body.subCatId], (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        res.end();
    });

    app.get('/announcements', (req, res) => {
        connection.query('SELECT * FROM Announcements', (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/getUsers', isLoggedIn, (req, res) => {
        connection.query('SELECT * FROM users', (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
    app.post('/deleteUser', isLoggedIn, (req, res) => {
        if (req.user.userlvl == 0) {
            connection.query('UPDATE users SET Status = 0 WHERE id = ?;', [req.body.id], (err, rows) => {
                if (err) throw err;
                console.log(rows.affectedRows + " record(s) updated");
            });
            res.end();
        }
    });


    app.post('/updateUser', (req, res) => {
        connection.query('UPDATE users SET fname = ?, lname = ?, address = ?, zipcode = ?, city = ?, phone = ? WHERE id = ?;', [req.body.fname, req.body.lname, req.body.address, req.body.zipcode, req.body.city, req.body.phone, req.user.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log(result.affectedRows + " record(s) updated");
        })
        res.end();
    });

    app.post('/announcementAdd', isLoggedIn, (req, res) => {
        var newItem = {
            info: req.body.info.toString(),
            dateBegin: req.body.dateBegin.toString(), // use the generateHash function in our user model
            dateEnd: req.body.dateEnd,
        };

        var insertQuery = "INSERT INTO Announcements ( info, dateBegin, dateEnd) values (?, ?, ?)";

        connection.query(insertQuery, [newItem.info, newItem.dateBegin, newItem.dateEnd], function (err, result) {
            if (err) throw err;
        });
        res.end();
    });


    app.get('/', function (req, res) {
        //res.render('index.ejs'); // load the index.ejs file
        //res.sendFile('index.html',{root: __dirname});
        //res.sendFile('/home/projectmanager/Digiloop/front/build/index.html');
        console.log(__dirname);
    });

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
    app.post('/login', passport.authenticate('local-login', {}), (req, res) => {
        console.log(req.user.email + " logged in.");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 30;
        } else {
            req.session.cookie.expires = false;
        }

        var userObject = {
            address: req.user.address, city: req.user.city, company: req.user.company, email: req.user.email,
            fname: req.user.fname, id: req.user.id, lname: req.user.lname, phone: req.user.phone, userlvl: req.user.userlvl, username: req.user.username, zipcode: req.user.zipcode
        };

        res.json({
            userdata: userObject
        });
        res.end();
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
    app.get('/logout', isLoggedIn, (req, res) => {
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

function ifUserLevel(req, res, next) {
    //errori jos ei logannu sisää
    // if user is authenticated in the session, carry on
    if (req.user.userlvl <= 1)
        return next();

    // if they aren't redirect them to the home page
    //res.redirect('/');
    res.end();
}