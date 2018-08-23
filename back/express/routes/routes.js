var express = require('express');
var apicache = require('apicache');
//var baseurl = '/prod'
module.exports = (app, passport, baseurl) => {

    app.get(baseurl+'/prod/session', function (req, res) {res.json(baseurl) });
    app.get(baseurl+'/apicache', function (req, res) {res.json(apicache.getIndex()) });
    app.get(baseurl+'/cacheclear', function (req, res) {apicache.clear()});
    //app.get('/', function (req, res) { });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get(baseurl+'/login', function (req, res) {
        res.json({
            user: '-1'
        });
    });


    // process the login form
    //https://github.com/jaredhanson/passport-local/issues/4
    app.post(baseurl+'/login', passport.authenticate('local-login', { session: true }), (req, res) => {
        console.log(req.user.email + " logged in.");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 30;
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
    app.post(baseurl+'/signup', passport.authenticate('local-signup'), (req, res, next) => {
        res.end()
    });


    app.post(baseurl+'/signupCompany', passport.authenticate('local-company'), (req, res, next) => {
        res.end()
    });

    app.post(baseurl+'/signupCompanyUser',passport.authenticate('local-subuser'), (req, res, next) => {
        console.log(req.body)
        //
        res.end()
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get(baseurl+'/logout', (req, res) => {
        req.logout();
        //res.redirect('/login');
        res.end();
    });
};