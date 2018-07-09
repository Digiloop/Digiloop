var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;


router.route('/users')
    .get(async (req, res) => {
        let query = 'SELECT * FROM users'
        res.json(await sqldatahaku.querySql(query))
    })
    .put(async (req, res) => {
        let query = 'UPDATE users SET fname = ?, lname = ?, address = ?, zipcode = ?, city = ?, phone = ? WHERE id = ?'
        let values = [req.body.fname, req.body.lname, req.body.address, req.body.zipcode, req.body.city, req.body.phone, req.user.id]
        await sqldatahaku.querySql(query, values)
        res.end()
    })
    .delete(async (req, res) => {
        let query = 'UPDATE users SET Status = 0 WHERE id = ?'
        let values = req.body.id
        await sqldatahaku.querySql(query, values)
        res.end()
    })

    module.exports = router