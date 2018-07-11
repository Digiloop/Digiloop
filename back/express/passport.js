// config/passport.js
// It's not a real passport, since with a real passport you could go to all different kinds of countries
// but with this passport you can't even go buy beer from the supermarket

// load all the things we need
var maileri = require('./code/mailer')
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy	 = require('passport-http-bearer').Strategy;

var bcrypt = require('bcrypt-nodejs');
var connection = require('./config/database');


//connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        //done(null, user.id);
        done(null, user.id);
    });

    // used to deserialize the user
   passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });
    /*
    passport.deserializeUser(function(user, done) {
        done(null,user);
    });
*/

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
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },(req, email, password, done) => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, console.log('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = {
                        email: email.toString(),
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        fname: req.body.fname.toString(),
                        lname: req.body.lname.toString(),
                        phone: req.body.phone.toString(),
                        address: req.body.address.toString(),
                        zipcode: req.body.zipcode.toString(),
                        city: req.body.city.toString(),          
                        userlvl: 2,
                        Status: 1
                  };
                    /*console.log(leveli + "  leveli");*/
                    var insertQuery = "INSERT INTO users ( password, fname, lname, email, phone, address, zipcode, city, userlvl, Status ) values (?,?,?,?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.password, newUserMysql.fname, newUserMysql.lname, newUserMysql.email, newUserMysql.phone, newUserMysql.address, newUserMysql.zipcode, newUserMysql.city, newUserMysql.userlvl, newUserMysql.Status],(err, rows) => {
                        //newUserMysql.id = rows.insertId;

                        //return done(null, 8);
                    });
                }
            });
        })
    );

    passport.use(
        'local-company',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },(req, email, password, done) => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, console.log('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = {
                        email: email.toString(),
                        password: bcrypt.hashSync(password, null, null),  // rng password in company
                        fname: req.body.fname.toString(),
                        lname: req.body.lname.toString(),
                        phone: req.body.phone.toString(),
                        address: req.body.address.toString(),
                        zipcode: req.body.zipcode.toString(),
                        city: req.body.city.toString(),
                        company: req.body.company.toString(),
                        ytunnus: req.body.ytunnus.toString(),
                        userlvl: 1,
                        Status: 0
                  };
                    /*console.log(leveli + "  leveli");*/
                    var insertQuery = "INSERT INTO users ( password, fname, lname, email, phone, address, zipcode, city, company, ytunnus, userlvl, Status ) values (?,?,?,?,?,?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.password, newUserMysql.fname, newUserMysql.lname, newUserMysql.email, newUserMysql.phone, newUserMysql.address, newUserMysql.zipcode, newUserMysql.city, newUserMysql.company, newUserMysql.ytunnus, newUserMysql.userlvl, newUserMysql.Status],(err, rows) => {
                        //newUserMysql.id = rows.insertId;

                        maileri.mail(newUserMysql.email,'dangerous')
                        //return done(null, newUserMysql);
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
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE email = ? AND Status = 1",[email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, {
                      message:'email' // koita saada tämä routesin loginin failaukseen
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
