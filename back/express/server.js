// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors'); //tarttee devaukses koska front ei ole samalla palvelimella
var app      = express();
var port     = process.env.PORT || 80;
var fileUpload = require('express-fileupload')
var passport = require('passport');
//var flash    = require('connect-flash');

//var users;
//var source = require('./config/users.js');
// configuration ===============================================================
// connect to our database
//console.log('server' + source.Testi1);

require('./config/passport')(passport); // pass passport for configuration
//require('./config/users')(users);


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	limit:'50mb',
	extended: true
}));
app.use(bodyParser.json({
	limit:'50mb'
}));
app.use(fileUpload());
app.use(cors());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//app.set('view engine', 'ejs'); // set up ejs for templating not actually used in this project
//app.set('views', __dirname, 'views');
// required for passport
app.use(session({
	secret: 'helloworldisthreehundredfiftysixbilliontree',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes ======================================================================
require('./app/routes.js')(app, passport, /*users*/); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
