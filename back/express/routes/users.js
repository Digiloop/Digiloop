var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');
var bcrypt = require('bcrypt-nodejs');

router.route('/users')
    .get(middleware.wrap(async (req, res) => {
        let query = 'SELECT * FROM users'
        res.json(await sqldatahaku.querySql(query))
    }))
    .put(middleware.wrap(async (req, res) => {
        let query = 'UPDATE users SET fname = ?, lname = ?, address = ?, zipcode = ?, city = ?, phone = ? WHERE id = ?'
        let values = [req.body.fname, req.body.lname, req.body.address, req.body.zipcode, req.body.city, req.body.phone, req.user.id]
        await sqldatahaku.querySql(query, values)
        res.end()
    }))
    .post(middleware.wrap(async (req, res) => {
        let query = 'UPDATE users SET Status = ? WHERE id = ?'
        let values = [req.body.Status, req.body.id]
        await sqldatahaku.querySql(query, values)
        res.end()
    }))

    router.post('/changePassword', middleware.wrap(async (req, res, next) => {
        //let check = await sqldatahaku.querySql('SELECT email FROM users WHERE email = ?',[req.body.email]);
        let query = 'UPDATE users SET password = ? WHERE id = ?'
        let pass = await req.body.password
        let oldpass = await bcrypt.hashSync(req.body.oldpassword)
        if (oldpass == req.user.password){
            let newpass = await bcrypt.hashSync(pass, null, null)
            let values = await [newpass, req.user.id]
            await sqldatahaku.querySql(query, values)
        }else{
            res.json('Ei toimi')
        }
        res.end();
    }));
module.exports = router