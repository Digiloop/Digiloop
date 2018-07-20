var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');
var maileri = require('../code/mailer')
var passgen = require('../code/passGen')
router.post('/recoverPassword', middleware.wrap(async (req, res, next) => {
    //let check = await sqldatahaku.querySql('SELECT email FROM users WHERE email = ?',[req.body.email]);
    let query = 'UPDATE users SET password = ? WHERE email = ?'

    let password = await passgen.password();
    //console.log(password)

    let values = await [password.hashpass, req.body.email]
    await sqldatahaku.querySql(query, values)
    await maileri.mail(values[1],password.pass)
    //console.log(values[1],password.pass)
    //console.log('password: '+pass)
    res.end();
}));

module.exports = router