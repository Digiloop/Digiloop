var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');
var activator = require('../code/accountActivation')
var generatepassword = require('../code/passGen')
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
        activator.select(req.body.Status, req.body.id);
        res.end()
    }))

router.post('/changePassword', middleware.wrap(async (req, res, next) => {
    let result = await generatepassword.changePassword(req.user.id, req.body.password, req.body.oldpassword, req.user.password);//id, password, oldpassword
    if (result == false) { res.status(406) }
    res.end();
}));
module.exports = router