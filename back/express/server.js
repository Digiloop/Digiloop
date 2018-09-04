// server.js

// set up ======================================================================
// get all the tools we need
var http = require('http');
var https = require('https');
https.globalAgent.maxSockets = 50;
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var app = express();
var fileUpload = require('express-fileupload')
var passport = require('passport');
var serveIndex = require('serve-index');
//routes
var router = express.Router()
var categories = require('./routes/categories')
var items = require('./routes/items')
var announcements = require('./routes/announcements')
var users = require('./routes/users')
var recoverPassword = require('./routes/recoverPassword')
var accountVerify = require('./routes/accountVerify')
//misc functions and stuff
var middleware = require('./code/middleware.js');
//MemoryStore
var RedisStore = require('connect-redis')(session)
var compression = require('compression')
var redis = require('redis')
var baseurl = '/prod'
var sessionInfo = require('./config/sessionInfo')
// configuration ===============================================================

require('./passport')(passport); // pass passport for configuration

//CORS
let whitelist = ['http://localhost:3000', 'http://35.228.227.224:3000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, false)
            //callback(new Error('Not allowed by CORS'))
            //next()
        }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs,nodejs) choke on 204
    allowedHeaders: ['Content-Type', 'X-Requested-With', 'Accept'],
    methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
    credentials: true
}
app.use(cors(corsOptions))
//----------------------------------------------------------------------------------------

// set up our express application
app.use(morgan('dev')); // log every request to the console
//app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(compression())

//app.use(express.static("/home/projectmanager/Digiloop/back/express/app"));
//app.use(express.static("/home/projectmanager/Digiloop/front/build"));
app.use(fileUpload()); // required for pictures
app.use(cookieParser(sessionInfo.secret)); // read cookies (needed for auth)
app.use(session(sessionInfo,new RedisStore));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(express.static(maintcheck.mainteanance(false)));
// routes ======================================================================
//https://expressjs.com/en/guide/routing.html
// load our routes and pass in our app and fully configured passport
//router.use(require('./routes/routes.js')(app, passport));
//app.use('/cat', cats); // http://193.166.72.18/cat/categories
//app.use('*', middleware.logIp)
//app.use('*', middleware.wrap) 


app.set('trust proxy', true)//required for nginx, cant serve files otherwise.

require('./routes/routes.js')(app, passport, baseurl);
app.use(baseurl, recoverPassword);
app.use(baseurl, categories)
app.use(baseurl, accountVerify)
app.all('*', middleware.isLoggedIn)
app.use(baseurl, announcements, users, items)
app.use(baseurl+'/images', express.static('./kuvat'), serveIndex('./kuvat', { 'icons': true }))


//* Error Handler
app.use((error, req, res, next) => {
    console.log('###################ERROR##################')
    //console.log(error.message)
    console.log(error)
    console.log('###################ERROR##################')
    res.end()
    //res.json({ message: error.message });
});


app.listen(5000);
