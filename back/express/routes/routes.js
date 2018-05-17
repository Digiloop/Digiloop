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
module.exports = (app, passport, users) => {
    //	app.get('/categories',isLoggedIn, function(req, res
/*
    app.get('/categories', function(req, res, next) {
        connection.query('SELECT * FROM Category WHERE Status = 1', function(err, result) {
            if (err) throw err;
            res.json({
                category: result
            });
        });
    });
*/
    app.get('/announcements', (req, res) => {
        connection.query('SELECT * FROM Announcements', (err, result) => {
                if (err) throw err;
                res.json(result);
            });
    });

	 app.get('/getUsers',isLoggedIn, (req, res) => {
        connection.query('SELECT * FROM users',(err, result) => {
                if (err) throw err;
                res.json(result);
            });
    });
	 app.post('/deleteUser', isLoggedIn, (req, res) => {
		 if (req.user.userlvl == 0){
        connection.query('UPDATE users SET Status = ? WHERE id = ?;', [req.body.Status, req.body.id], (err, rows) => {
            if (err) throw err;
            console.log(rows.affectedRows + " record(s) updated");
        });
        res.end();
		 }
    });

    
    app.post('/updateUser', isLoggedIn, (req, res) => {
        connection.query('UPDATE users SET fname = ?, lname = ?, email = ?, password = ? WHERE id = ?;', [req.body.fname, req.body.lname, req.body.email, bcrypt.hashSync(req.body.password, null, null), req.user.id], (err,result) => {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        })
    });

    app.post('/announcementADD', isLoggedIn, (req, res) => {
        var newItem = {
            info: req.body.info.toString(),
            dateBegin: req.body.dateBegin.toString(), // use the generateHash function in our user model
            dateEnd: req.body.dateEnd,
        };

        var insertQuery = "INSERT INTO Announcements ( info, dateBegin, dateEnd) values (?, ?, ?)";

            connection.query(insertQuery, [newItem.info, newItem.dateBegin, newItem.dateEnd], function(err, result) {
                if (err) throw err;
            });
            res.end();
        });

    app.get('/items',isLoggedIn, (req, res) => {
        if (req.user.userlvl <= 1){
        connection.query('SELECT * FROM junk INNER JOIN Coordinates ON junk.junkID=Coordinates.ID;',
            function(err, result) {
                if (err) throw err;
                res.json(result);
            });
          }
          else {
            connection.query('SELECT * FROM junk INNER JOIN Coordinates ON junk.junkID=Coordinates.ID WHERE owner = ?;', [req.user.id.toString()],
                function(err, result) {
                    if (err) throw err;
                    res.json(result);
                });
          }
    });



    //item Status
    app.post('/itemStatus', (req, res) => {
        connection.query('UPDATE junk SET status = ? WHERE junkID = ?;', [req.body.status, req.body.subIdStatus], (err, rows) => {
            if (err) throw err;
            console.log(rows.affectedRows + " record(s) updated");
        });
        console.log(req.body.status, " ", req.body.subIdStatus)
        res.end();
    });

    app.post('/itemReserve', isLoggedIn, (req, res) => {
        connection.query('UPDATE junk SET status = ?, fetcher = ? WHERE junkID = ?;', [req.body.status,req.body.fetcher, req.body.subIdStatus], (err, rows) => {
            if (err) throw err;
            console.log(rows.affectedRows + " record(s) updated");
        });
        console.log(req.body.status, " ",req.body.fetcher , " ", req.body.subIdStatus)
        res.end();
    });



    //kaatuu ilman loggausta sisään tarttee City / Post valuet
    app.post('/itemADD',isLoggedIn, (req, res) => {
        var newItem = {
            category: req.body.category.toString(),
            subCat: req.body.subCat.toString(), // use the generateHash function in our user model
            weight: req.body.weight,
            size: req.body.size,
            description: req.body.description.toString(),
            picture: "",//req.body.picture.toString(),
            pcs: req.body.pcs,
            pickupaddr: req.body.pickupaddr.toString(),
            junkdate: req.body.junkdate,
            junkdateadded: req.body.junkdateadded,
            status: req.body.status,
            owner: req.user.id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            coordstatus: req.body.status2
        };

        if (req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

        var picture = req.files.picture;
        var userfolder = './kuvat/' + req.user.username;
        if(!fs.existsSync(userfolder)){
          fs.mkdirSync(userfolder);
        }
        var filepath = './kuvat/'+ req.user.username+ '/' + Date.now() + '.' + picture.name.split('.').pop();
        newItem.picture = filepath;
        // Use the mv() method to place the file somewhere on your server
        picture.mv(filepath, function(err) {
          if (err)
            return res.status(500).send(err);
        })};

        var insertQuery = "INSERT INTO junk ( category, subCat, weight, size, description, picture, pcs, pickupaddr, junkdate, junkdateadded, status, owner ) values (?,?,?,?,?,?,?,?,?,?,?,?)";
        var insertQuery2 = "INSERT INTO Coordinates ( latitude, longitude, coordstatus) values (?, ?, ?)";
        connection.beginTransaction(function(err) {
            if (err) {
                throw err;
            }
            connection.query(insertQuery, [newItem.category, newItem.subCat, newItem.weight, newItem.size, newItem.description, newItem.picture, newItem.pcs, newItem.pickupaddr, newItem.junkdate, newItem.junkdateadded, newItem.status, newItem.owner], function(err, result) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }

                connection.query(insertQuery2, [newItem.latitude, newItem.longitude, newItem.coordstatus], function(err, result) {
                    if (err) {
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            connection.rollback(function() {
                                throw err;
                            });
                        }
                        console.log('Item added success!');
                    });
                });
            });
        });
        res.end();
    });

// Esimerkki userlvl tarkastuksesta routessa, ei käytössä
    app.get('/items2', (req, res) => {
      //if (req.user.userlvl <= 1){
      //res.send(__dirname);
        connection.query('SELECT * FROM junk INNER JOIN Coordinates ON junk.junkID=Coordinates.ID WHERE Status != 0',
            function(err, result) {
                if (err) throw err;
                res.json(result);
            });
    //    }
    });



    app.get('/items3',passport.authenticate('bearer', { session: false }), function(req, res) {
        connection.query('SELECT * FROM junk INNER JOIN Coordinates ON junk.junkID=Coordinates.ID',
            function(err, result) {
                if (err) throw err;
                res.json({
                    category: result
                });
            });
    });

    app.get('/', function(req, res) {
        //res.render('index.ejs'); // load the index.ejs file
        //res.sendFile('index.html',{root: __dirname});
        //res.sendFile('/home/projectmanager/Digiloop/front/build/index.html');
        console.log(__dirname);
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
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
			var userObject = {address:req.user.address, city:req.user.city, company:req.user.company, email:req.user.email,
			fname:req.user.fname, id:req.user.id, lname:req.user.lname, phone:req.user.phone, userlvl:req.user.userlvl, username:req.user.username, zipcode:req.user.zipcode};
            
            res.json({
                userdata:userObject
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
    app.get('/profile', isLoggedIn, (req, res) => {res.json(req.user)});
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