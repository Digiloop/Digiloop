var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js');          var misk = new misc;
var sqldata = require('../code/sqldata.js');    var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit

//winscp kaatu
//GET
router.get('/items',(req, res, next) => {
    const query = 'SELECT * FROM junk'
    sqldatahaku.getInfoSql(query,(err, result) => {
        if (err) throw err;
        res.json(result);
        next();
      });
});

//POST
router.post('/itemAdd', (req, res, next) => {
    const query = 'INSERT INTO junk ( pickupaddr, zipcode, city, itemphone, wishbox, iscompany, category, subCat, pcs, size, weight, description, latitude, longitude, junkdate, junkdateadded, status, owner ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [Date.now(), '2018-05-23 13:06:00', 1, req.user.id]
    misk.fuseItemArray(req.body,secondary,sqldatahaku.querySql,query)//req.body = all items, secondary = data from backend, sqldatahaku.querySql = function that inserts stuff to database, query = sqlquery
    res.end();
});

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ? WHERE junkID = ?;',[req.body.status,req.body.junkId])
    res.end();
})

router.post('/itemReserve', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;',[2,req.user.id,req.body.junkId])
    res.end();
})

router.get('/itemTest', (req, res, next) => {
    res.json(req.user.id);
})

module.exports = router