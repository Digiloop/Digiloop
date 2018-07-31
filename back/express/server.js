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
var cors = require('cors'); //tarttee devaukses koska front ei ole samalla palvelimella
var app = express();
//certifikaatti sydeemit tässä
var cert = require('./config/cert')
var maintcheck = require('./config/maint')
var port = process.env.PORT || 443;
var port2 = process.env.PORT2 || 80;
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
//misc functions and stuff
var middleware = require('./code/middleware.js');
//MemoryStore
var RedisStore = require('connect-redis')(session)
//var MemoryStore = require('session-memory-store')(session);
var compression = require('compression')
var apicache = require('apicache')
var redis = require('redis')
var baseurl = '/prod'
var routes = require('./routes/routes.js');
// configuration ===============================================================
//app.use(cache('7 days'))

let cacheredis = apicache.options({
    redisClient: redis.createClient(),
    debug: true,
    statusCodes: {
        exclude: [],             // list status codes to specifically exclude (e.g. [404, 403] cache all responses unless they had a 404 or 403 status)
        include: [200],             // list status codes to require (e.g. [200] caches ONLY responses with a success/200 code)
    },
}).middleware

require('./passport')(passport); // pass passport for configuration
//require('./config/users')(users);

//CORS
let whitelist = ['http://localhost:3000', 'http://35.228.227.224:3000','http://127.0.0.1'];

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


// set up our express application
app.use(morgan('dev')); // log every request to the console
//app.use(morgan('combined'));
app.use(cookieParser('tikiruuma1337')); // read cookies (needed for auth)
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

// required for passport

app.use(session({
    secret: 'tikiruuma1337',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    //store: new MemoryStore(options)
    store: new RedisStore,
    name: 'KierratettyKeksi.sid'
})); // session secret


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

app.set('trust proxy', true)

require('./routes/routes.js')(app, passport,baseurl);
//app.use(baseurl, routes)
//app.use(cacheredis('2 minutes'))
app.use(baseurl, recoverPassword);
app.use(baseurl, categories)
app.all('*', middleware.isLoggedIn)
app.use(baseurl, announcements, users, items)
//app.use('/', categories, items); // http://193.166.72.18/categories
app.use(baseurl + '/images', express.static('./kuvat'), serveIndex('./kuvat', { 'icons': true }))
//app.use('/items5', items);
//app.use('/birds', birds) //<<- toimia esimerkki
//'./app/maint'

//* Error Handler
app.use((error, req, res, next) => {
    console.log('###################ERROR##################')
    //console.log(error.message)
    console.log(error)
    console.log('###################ERROR##################')
    res.end()
    //res.json({ message: error.message });
});


// launch ======================================================================
//app.listen(port);
//console.log('päkki pystys portissa ' + port);

/*
https.createServer(cert, app).listen(port, () => {
    console.log(`päkki pyörii portissa ${port}`);
});


http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
*/


app.listen(5000);
