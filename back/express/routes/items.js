var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var itemadd = require('../code/itemadd.js');
var itemC = require('../code/itemsC.js');
var middleware = require('../code/middleware.js');

//GET
router.route('/items')
    .get(middleware.wrap(async (req, res, next) => {

        let result = await itemC.itemGet(req.user.id, req.user.userlvl, 2)
        res.json(result)

    }))
    .delete(middleware.wrap(async (req, res, next) => {
        //let values = req.body.id
        let check = await sqldatahaku.querySql(`SELECT owner FROM junk WHERE junkID = ${req.body.id}`);
        let user = await req.user.id
        let query;
        console.log(check[0].owner + ' owner id')
        //console.log(values + ' values')
        console.log(user + ' user id')
        if (user == check[0].owner) {
            //query = `DELETE FROM junk WHERE junkID = ${req.body.id}`
            query = 'UPDATE junk SET STATUS = ? WHERE junkID = ?'
            values = [0, req.body.id]
            await sqldatahaku.querySql(query, values)
        } else {
            console.log('Cant let you do that')
        }
        res.end()
        //let query = 'DELETE FROM junk WHERE junkID = ?'
        //let values = [req.body.id]

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
    res.end();
}));

router.post('/itemStatus', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [req.body.status, req.body.fetcher, req.body.junkId])
    res.end();
}));

router.post('/itemReserveCancel', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [1, 0, req.body.junkId])
    res.end();
}));

//tarttee checking että ei voi varata muitten varattuja
router.post('/itemReserve', middleware.wrap(async (req, res, next) => {
    await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    res.end();
}));


router.get('/profile', (req, res) => { res.json(req.user) });

module.exports = router
