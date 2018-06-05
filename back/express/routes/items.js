var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit

//GET
router.get('/items', (req, res, next) => {
    const query = 'SELECT * FROM junk'
    sqldatahaku.queryGet(query, (err, result) => {
        if (err) throw err;
        res.json(result);
        next();
    });
});

//POST
router.post('/itemAdd', (req, res, next) => {
    //console.log(req.body)
    //console.log(misk.checkValidLength(req.body.itemData, 14))
    //console.log(misk.checkValidValues(req.body.itemData));
    //misk.loopityLoop(req.body.itemData,console.log)
    const query = 'INSERT INTO junk ( city, iscompany, itemphone, wishbox, pickupaddr, zipcode, latitude, longitude, category, subCat, pcs, size, weight, description, junkdate, junkdateadded, status, owner ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [Date.now(), misk.dateThing(), 1, req.user.id]//req.user.id
    //misk.fuseItemArray(req.body.itemData, secondary, console.log, query)
    //'2018-05-23 13:06:00'
    //misk.dateThing().toString()
    //misk.dateThing()
    //console.log(req.body.itemData);
    //undefined tarkastus

    misk.fuseItemArray(req.body.itemData, secondary, sqldatahaku.querySql, query)//req.body = all items, secondary = data from backend, sqldatahaku.querySql = function that inserts stuff to database, query = sqlquery
    res.end();
});

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ? WHERE junkID = ?;', [req.body.status, req.body.junkId])
    res.end();
})

router.post('/itemReserve', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    res.end();
})

router.get('/stuff', (req, res, next) => {
    res.json(misk.dateThing())
})

//var myDate = new Date();
//myDate.setHours(myDate.getHours() + 6);

router.get('/profile', (req, res) => { res.json(req.user) });

module.exports = router

