// server.js

// set up ======================================================================
// get all the tools we need
var https  = require('https');
var fs = require('fs');
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors'); //tarttee devaukses koska front ei ole samalla palvelimella
var app      = express();
//var port     = process.env.PORT || 80;

//certifikaatti sydeemit tässä
var options = {
    key: fs.readFileSync('key.key'),
    cert: fs.readFileSync('key.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

var fileUpload = require('express-fileupload')
var passport = require('passport');
var categories = require('./routes/categories')
var items = require('./routes/items')
// configuration ===============================================================
// connect to our database

require('./passport')(passport); // pass passport for configuration
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

//React path
let maint = false; // onko mainteanance
if(maint === false) {
    app.use(express.static("/home/projectmanager/Digiloop/front/build"));
} else{
    app.use(express.static("/home/projectmanager/Digiloop/back/express/app"));
}

//app.use(express.static("/home/projectmanager/Digiloop/front/build"));
app.use(fileUpload()); // required for pictures

//Cors tätä tarttee jos haluaa frontin pystyvän devailemaa localhostissa
app.use(cors());
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



// XD
// required for passport
app.use(session({
	secret: 'helloworldisthreehundredfiftysixbilliontree',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// routes ======================================================================
//https://expressjs.com/en/guide/routing.html
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//router.use(require('./routes/routes.js')(app, passport));
//app.use('/cat', cats); // http://193.166.72.18/cat/categories
app.use('/', categories,items); // http://193.166.72.18/categories
//app.use('/items5', items);
//app.use('/birds', birds) //<<- toimia esimerkki


// launch ======================================================================
//app.listen(port);
//console.log('päkki pystys portissa ' + port);

var server = https.createServer(options, app).listen(443, () => {
    console.log("päkki pyörii portissa 443");
});

app.listen(80, () => {
    console.log("päkki pyörii portissa 80");
});
