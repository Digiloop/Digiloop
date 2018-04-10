// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy	 = require('passport-http-bearer').Strategy;
// load up the user model
var mysql = require('mysql2');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(new BearerStrategy(
      function(token, done) {
        User.findOne({ token: token }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user, { scope: 'read' });
        });
      }
    ));



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done("working just fine");
                if (rows.length) {
                    return done(null, false, console.log('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        fname: req.body.fname.toString(),
                        lname: req.body.lname.toString(),
                        email: req.body.email.toString(),
                        phone: req.body.phone.toString(),
                        address: req.body.address.toString(),
                        zipcode: req.body.zipcode.toString(),
                        city: req.body.city.toString(),
                        company: req.body.company.toString(),
                        userlvl: null,
                        Status: req.body.Status.toString()
                  };
                  //normi user check
                  if (typeof res != 'undefined')
                    newUserMysql.userlvl = res.locals.level
                  else
                  newUserMysql.userlvl = req.body.userlvl.toString();
					if (newUserMysql.Status == undefined) newUserMysql.Status = 0;
                    /*console.log(leveli + "  leveli");*/
                    var insertQuery = "INSERT INTO users ( username, password, fname, lname, email, phone, address, zipcode, city, company, userlvl, Status ) values (?,?,?,?,?,?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password, newUserMysql.fname, newUserMysql.lname, newUserMysql.email, newUserMysql.phone, newUserMysql.address, newUserMysql.zipcode, newUserMysql.city, newUserMysql.company, newUserMysql.userlvl, newUserMysql.Status],function(err, rows) {
                        //newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, {
                      message:'username' // koita saada tämä routesin loginin failaukseen
                    })
                };

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, console.log('loginMessage', 'Oops! Wrong password.'));

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
