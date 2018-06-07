// server.js

// set up ======================================================================
// get all the tools we need
var http = require('http');
var https = require('https');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors'); //tarttee devaukses koska front ei ole samalla palvelimella
var app = express();
//certifikaatti sydeemit tässä
var cert = require('./app/cert')
var options = cert;
var maintcheck = require('./app/maint')
var port = process.env.PORT || 443;
var port2 = process.env.PORT2 || 80;
var fileUpload = require('express-fileupload')
var passport = require('passport');
var serveIndex = require('serve-index');
var categories = require('./routes/categories')
var items = require('./routes/items')
var MemoryStore = require('session-memory-store')(session);
// configuration ===============================================================
// connect to our database

require('./passport')(passport); // pass passport for configuration
//require('./config/users')(users);


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser('tikiruuma1337')); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

// onko mainteanance true/false
app.use(express.static(maintcheck.mainteanance(false)));


//app.use(express.static("/home/projectmanager/Digiloop/back/express/app"));
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
    secret: 'tikiruuma1337',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new MemoryStore(options)
    //name: 'KierratettyKeksi.sid'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
//https://expressjs.com/en/guide/routing.html
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//router.use(require('./routes/routes.js')(app, passport));
//app.use('/cat', cats); // http://193.166.72.18/cat/categories
app.use('/', categories, items); // http://193.166.72.18/categories
app.use('/images', express.static('./kuvat'), serveIndex('./kuvat', { 'icons': true }))
//app.use('/items5', items);
//app.use('/birds', birds) //<<- toimia esimerkki
//'./app/maint'

// launch ======================================================================
//app.listen(port);
//console.log('päkki pystys portissa ' + port);

https.createServer(options, app).listen(port, () => {
    console.log(`päkki pyörii portissa ${port}`);
});
/*
app.listen(port2, () => {
    console.log("päkki pyörii portissa 80");
});
*/

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);