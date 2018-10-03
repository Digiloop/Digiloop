// config/passport.js
// It's not a real passport, since with a real passport you could go to all different kinds of countries
// but with this passport you can't even go buy beer from the supermarket

// load all the things we need
var maileri = require('./code/mailer')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var sqldata = require('./code/sqldata'); var sqldatahaku = new sqldata;
var generatePassword = require('password-generator');
var emailActivation = require('./code/emailActivation')
// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(async function (id, done) {

        let result = await sqldatahaku.querySql("SELECT * FROM users WHERE id = ? ", [id])
        done(null, result[0]);

    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'



    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'email',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, async (req, email, password, done) => {
            await console.log(req.body)
            let pass = await generatePassword(12, false)
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            let result = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ?", [email])
            if (result.length) {
                return done(null, false, console.log('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user let pass = await generatePassword(12, false)
                var newUserMysql = {
                    email: email.toString(),
                    password: await bcrypt.hash(pass, 10),  // use the generateHash function in our user model
                    fname: req.body.fname.toString(),
                    lname: req.body.lname.toString(),
                    phone: req.body.phone.toString(),
                    address: req.body.address.toString(),
                    zipcode: req.body.zipcode.toString(),
                    city: req.body.city.toString(),
                    userlvl: 2,
                    Status: 0
                };
                /*console.log(leveli + "  leveli");*/
                var insertQuery = "INSERT INTO users ( password, fname, lname, email, phone, address, zipcode, city, userlvl, Status ) values (?,?,?,?,?,?,?,?,?,?)";
                emailurl = await emailActivation.sendActivation(newUserMysql.email)
                await sqldatahaku.querySql(insertQuery, [newUserMysql.password, newUserMysql.fname, newUserMysql.lname, newUserMysql.email, newUserMysql.phone, newUserMysql.address, newUserMysql.zipcode, newUserMysql.city, newUserMysql.userlvl, newUserMysql.Status])
                await maileri.mail(newUserMysql.email,'Email activation url: kierratys.lamk.fi/prod/activation/'+emailurl+'<br>'+'password: '+pass)
                //newUserMysql.id = rows.insertId;
                //let final = await sqldatahaku.querySql('select * from users where email = ?', newUserMysql.email)
                //return done(null, final)
                //return done(null, 8);
                let final = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ?", [email])
                return done(null, final[0])
            }
        })
    );

    passport.use(
        'local-company',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'email',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, async (req, email, password, done) => {
            let pass = await generatePassword(12, false)
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            let result = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ?", [email])
            if (result.length) {
                return done(null, false, console.log('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                var newUserMysql = {
                    email: email.toString(),
                    password: await bcrypt.hash(pass, 10),  // rng password in company
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

                await sqldatahaku.querySql(insertQuery, [newUserMysql.password, newUserMysql.fname, newUserMysql.lname, newUserMysql.email, newUserMysql.phone, newUserMysql.address, newUserMysql.zipcode, newUserMysql.city, newUserMysql.company, newUserMysql.ytunnus, newUserMysql.userlvl, newUserMysql.Status])
                //newUserMysql.id = rows.insertId;

                await maileri.mail(newUserMysql.email, pass)
                //return done(null, newUserMysql);
                let final = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ?", [email])
                return done(null, final[0])
            }
        })
    );


    passport.use(
        'local-subuser',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, async (req, email, password, done) => {
            await console.log(req.body)
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            let result = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ?", [email])
            if (result.length) {
                return done(null, false, console.log('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user

                let infocomp = await req.user.company.toString()
                let infoytunnus = await req.user.ytunnus.toString()
                var newUserMysql = {
                    email: email.toString(),
                    password: await bcrypt.hash(password, 10),  // rng password in company
                    fname: req.body.fname.toString(),
                    lname: req.body.lname.toString(),
                    phone: req.body.phone.toString(),
                    address: req.body.address.toString(),
                    zipcode: req.body.zipcode.toString(),
                    city: req.body.city.toString(),
                    company: infocomp,
                    ytunnus: infoytunnus,
                    userlvl: 3,
                    Status: 1
                };
                /*console.log(leveli + "  leveli");*/
                var insertQuery = "INSERT INTO users ( password, fname, lname, email, phone, address, zipcode, city, company, ytunnus, userlvl, Status ) values (?,?,?,?,?,?,?,?,?,?,?,?)";

                await sqldatahaku.querySql(insertQuery, [newUserMysql.password, newUserMysql.fname, newUserMysql.lname, newUserMysql.email, newUserMysql.phone, newUserMysql.address, newUserMysql.zipcode, newUserMysql.city, newUserMysql.company, newUserMysql.ytunnus, newUserMysql.userlvl, newUserMysql.Status])
                //newUserMysql.id = rows.insertId;

                await maileri.mail(newUserMysql.email, password)
                //return done(null, newUserMysql);
                let final = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ?", [email])
                return done(null, final[0])
            }
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
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            async function (req, email, password, done) { // callback with email and password from our form
                let result = await sqldatahaku.querySql("SELECT * FROM users WHERE email = ? AND Status = 1", [email])
                if (!result.length) {
                    return done(null, false, {
                        message: 'email' // koita saada tämä routesin loginin failaukseen
                    })
                };

                // if the user is found but the password is wrong
                let check = await bcrypt.compare(password, result[0].password)
                if (!check) {
                    return done(null, false, console.log('loginMessage', 'Oops! Wrong password.'));
                }
                else {
                    console.log(check)
                    // all is well, return successful user
                    //return done(null, false, console.log('loginMessage', 'Oops! Wrong password.'));
                    return done(null, result[0]);
                }
            })
    );
};
