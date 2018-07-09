var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var itemadd = require('../code/itemadd.js');

//GET
router.route('/items')
    .get(async (req, res, next) => {
        let query;
        if (req.user.userlvl == 2) {
            query = `SELECT * FROM junk where owner = ${req.user.id}`
        } else {
            query = 'SELECT * FROM junk'
        }

            let result = await sqldatahaku.querySql(query)
            res.json(result)

    })
    .delete(async (req, res, next) => {
        //let values = req.body.id
        let check = await sqldatahaku.querySql(`SELECT owner FROM junk WHERE junkID = ${req.body.id}`);
        let user = await req.user.id
        let query;
        console.log(check[0].owner + ' owner id')
        //console.log(values + ' values')
        console.log(user + ' user id')
        if (user == check[0].owner) { 
            query = `DELETE FROM junk WHERE junkID = ${req.body.id}`
             console.log('hi')
             await sqldatahaku.querySql(query)
        }else{
            console.log('Cant let you do that')
        }
        res.end()
        //let query = 'DELETE FROM junk WHERE junkID = ?'
        //let values = [req.body.id]
        
    })

// fetches missing items for frontend
/*
router.post('/itemRefresh', (req, res) => {

    const query = 'SELECT * FROM junk'

    sqldatahaku.querySql(query, (err, result) => {
        if (err) throw err;

        let diff = result.length - req.body.listLength;
        console.log("Kanta: " + result.length + " Front: " + req.body.listLength + " Erotus: " + diff)
        if (diff > 0) {

            let responseArray = []

            for (let i = req.body.listLength, j = 0; i < result.length; i++ , j++) {
                responseArray[j] = result[i]
            }
            res.json(responseArray)

        } else {
            //do ingenting
        }
        res.end();
    });
});
*/

router.post('/itemRefresh', async (req, res) => {

    const query = 'SELECT * FROM junk'

    result = await sqldatahaku.querySql(query)
    let reslength = await result.length
    let listlength = await req.body.listLength
    let diff = reslength - listlength
    await console.log("Kanta: " + reslength + " Front: " + listlength + " Erotus: " + diff)
    if (diff > 0) {

        let responseArray = []

        for (let i = listlength, j = 0; i < reslength; i++ , j++) {
            responseArray[j] = result[i]
        }
        await res.json(responseArray)

    } else {
        //do ingenting
    }
    res.end();
});



//POST
router.post('/itemAdd', async (req, res, next) => {

    let itemAdd = new itemadd(req.body, req.files)
    let msngImg = ['0']
    msngImg = await itemAdd.onlyMissingImg()

    let splittedArray = await misk.spliceArray(itemAdd.cleanArray(), 14)
    const query = 'INSERT INTO junk ( category, city, description, iscompany, latitude, longitude, pcs, itemphone, wishbox, pickupaddr,  size, subCat, weight, zipcode, junkdate, junkdateadded, status, owner, picture ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [['date', Date.now()], ['datetoday', misk.dateToday()], ['owner', 1], ['userid', req.user.id]]//req.user.id

    misk.createArray(splittedArray, secondary, req.files, sqldatahaku.querySql, query, msngImg)
    res.end();
});

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [req.body.status, req.body.fetcher, req.body.junkId])
    res.end();
})

router.post('/itemReserveCancel', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [1, 0, req.body.junkId])
    res.end();
})

//tarttee checking että ei voi varata muitten varattuja
router.post('/itemReserve', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
    console.log(req.body)
    res.end();
})

router.get('/stuff', (req, res, next) => {
    res.json(misk.dateToday())
})

//var myDate = new Date();
//myDate.setHours(myDate.getHours() + 6);
router.get('/test', (req, res) => {
    let a
    if (1 == null) { a = 5 } else { a = 2 }
    res.json(a);
});
router.get('/profile', (req, res) => { res.json(req.user) });

module.exports = router
