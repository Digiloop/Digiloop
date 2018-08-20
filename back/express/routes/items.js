var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var itemadd = require('../code/itemadd.js');
var itemC = require('../code/itemsC.js');
var redis = require('../config/redisdb.js')
var middleware = require('../code/middleware.js');
//GET
router.route('/items')
    .get(middleware.wrap(async (req, res, next) => {
        let result = await itemC.itemGet(req.user.userlvl)//userid, userlvl, userlvlrequired, status = hidden or visible 0 / 1

        res.json(result)

    }))
    .delete(middleware.wrap(async (req, res, next) => {
        console.log('tätä logataan ' + req.body)
        console.log(req.body)
        await itemC.itemDelete(req.user.id, req.body.id)
        res.end()

    }))

router.get('/itemReservations', middleware.wrap(async (req, res, next) => {
    //await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    result = await itemC.itemReservations();
    res.json(result)
}));

router.get('/itemHistory', middleware.wrap(async (req, res, next) => {
    //await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    result = await itemC.itemHistory(req.user.id);
    res.json(result)
}));

router.get('/itemStamp', middleware.wrap(async (req, res, next) => {

    timestamppi = await redis.getTimestamp()
    res.json(timestamppi);

}));

router.get('/profile', (req, res) => { res.json(req.user) });


//POST
router.post('/itemAdd', middleware.wrap(async (req, res, next) => {

    let itemAdd = new itemadd(req.body, req.files)
    let msngImg = ['0']
    msngImg = await itemAdd.onlyMissingImg()

    let splittedArray = await misk.spliceArray(itemAdd.cleanArray(), 14)
    const query = 'INSERT INTO junk ( category, city, description, iscompany, latitude, longitude, pcs, itemphone, wishbox, pickupaddr,  size, subCat, weight, zipcode, junkdate, junkdateadded, status, owner, picture ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [['date', Date.now()], ['datetoday', misk.dateToday()], ['owner', 1], ['userid', req.user.id]]//req.user.id

    await misk.createArray(splittedArray, secondary, req.files, sqldatahaku.querySql, query, msngImg)
    redis.setTimestamp();
    res.end();
}));

router.post('/itemStatus', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [req.body.status, req.body.fetcher, req.body.junkId])
    redis.setTimestamp();
    res.end();
}));

router.post('/itemReserveCancel', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [1, 0, req.body.junkId])
    redis.setTimestamp();
    res.end();
}));

//tarttee checking että ei voi varata muitten varattuja
router.post('/itemReserve', middleware.wrap(async (req, res, next) => {
    //await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    result = await itemC.itemReserve(req.user.id, req.body.junkId, req.user.company);
    if (result == 410) { res.status(410) } else { result }
    redis.setTimestamp();
    res.end();
}));


module.exports = router
