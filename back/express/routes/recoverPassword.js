var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');
var bcrypt = require('bcrypt-nodejs');
var maileri = require('../code/mailer')
var generatePassword = require('password-generator');

router.post('/recoverPassword', middleware.wrap(async (req, res, next) => {
    //let check = await sqldatahaku.querySql('SELECT email FROM users WHERE email = ?',[req.body.email]);
    let query = 'UPDATE users SET password = ? WHERE email = ?'
    let pass = await generatePassword(12, false)
    let newpass = await bcrypt.hashSync(pass, null, null)
    let values = await [newpass, req.body.email]
    await sqldatahaku.querySql(query, values)
    await maileri.mail(values[1],pass)
    console.log('password: '+pass)
    res.end();
}));

module.exports = router