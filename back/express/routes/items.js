var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var itemadd = require('../code/itemadd.js');
var itemC = require('../code/itemsC.js');
var middleware = require('../code/middleware.js');
var apicache = require('apicache')
//GET
router.route('/items')
    .get(middleware.wrap(async (req, res, next) => {
        req.apicacheGroup = 'tavarat'
        let result = await itemC.itemGet(req.user.id, req.user.userlvl, 2, 1)//userid, userlvl, userlvlrequired, status = hidden or visible 0 / 1
        res.json(result)

    }))
    .delete(middleware.wrap(async (req, res, next) => {

        await itemC.itemGet(req.user.id,req.body.id)
        await apicache.clear('tavarat')
        res.end()

    }))

//POST
router.post('/itemAdd', middleware.wrap(async (req, res, next) => {

    let itemAdd = new itemadd(req.body, req.files)
    let msngImg = ['0']
    msngImg = await itemAdd.onlyMissingImg()

    let splittedArray = await misk.spliceArray(itemAdd.cleanArray(), 14)
    const query = 'INSERT INTO junk ( category, city, description, iscompany, latitude, longitude, pcs, itemphone, wishbox, pickupaddr,  size, subCat, weight, zipcode, junkdate, junkdateadded, status, owner, picture ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [['date', Date.now()], ['datetoday', misk.dateToday()], ['owner', 1], ['userid', req.user.id]]//req.user.id

    await misk.createArray(splittedArray, secondary, req.files, sqldatahaku.querySql, query, msngImg)
    await apicache.clear('tavarat')
    res.end();
}));

router.post('/itemStatus', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [req.body.status, req.body.fetcher, req.body.junkId])
    await apicache.clear('tavarat')
    res.end();
}));

router.post('/itemReserveCancel', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [1, 0, req.body.junkId])
    await apicache.clear('tavarat')
    res.end();
}));

//tarttee checking että ei voi varata muitten varattuja
router.post('/itemReserve', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    await apicache.clear('tavarat')
    res.end();
}));


router.get('/profile', (req, res) => { res.json(req.user) });

module.exports = router
