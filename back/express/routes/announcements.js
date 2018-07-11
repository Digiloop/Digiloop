var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');

//*GET
router.route('/announcement')
    .get(middleware.wrap(async (req, res) => {
        let query = 'SELECT * FROM Announcements'
        res.json(await sqldatahaku.querySql(query))
    }))
    .post(middleware.wrap(async (req, res) => {
        let query = 'INSERT INTO Announcements ( info, dateBegin, dateEnd, title, userid) values (?, ?, ?, ?, ?)'
        let values = await [req.body.info, req.body.dateBegin, req.body.dateEnd, req.body.title, req.body.id]//req.user.id
        await sqldatahaku.querySql(query, values)
        res.end()
    }))
    .put(middleware.wrap(async (req, res) => {
        let query = 'UPDATE Announcements SET info = ?, dateBegin = ?, dateEnd = ?, title = ? WHERE id = ?'
        let values = [req.body.info, req.body.dateBegin, req.body.dateEnd, req.body.title, req.body.id]
        await sqldatahaku.querySql(query, values)
        res.end()
    }))
    .delete(middleware.wrap(async (req, res) => {
        let query = 'DELETE FROM Announcements WHERE id = ?'
        let values = await [req.body.id]
        console.log(req.body.id)
        await sqldatahaku.querySql(query, values)
        res.end()
    }))


/*
router.get('/jotain/:Add', async (req, res) => {
    console.log(req.params)
    res.end()
})
*/

module.exports = router