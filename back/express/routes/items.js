var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var itemadd = require('../code/itemadd.js');

//GET
router.get('/items', (req, res, next) => {
    const query = 'SELECT * FROM junk'
    sqldatahaku.queryGet(query, (err, result) => {
        if (err) throw err;
        res.json(result);
        next();
    });
});

// fetches missing items for frontend
router.post('/itemRefresh', (req, res) => {

    const query = 'SELECT * FROM junk'

    sqldatahaku.queryGet(query, (err, result) => {
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


//POST
router.post('/itemAddOld', (req, res, next) => {

    const query = 'INSERT INTO junk ( category, city, description, iscompany, latitude, longitude, pcs, itemphone, wishbox, pickupaddr,  size, subCat, weight, zipcode, junkdate, junkdateadded, status, owner, picture ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [Date.now(), misk.dateToday(), 1, 47]//req.user.id
    const third = misk.keyToArray(req.files)

    misk.fuseItemArray(req.body, secondary, third, sqldatahaku.querySql, query)//req.body = all items, secondary = data from backend, sqldatahaku.querySql = function that inserts stuff to database, query = sqlquery
    res.end();
});









router.post('/itemAdd', (req, res, next) => {
/*
    let arr = Object.entries(req.body);
    let arr2 = Object.keys(req.body)


    //Amount of arrays received ---------------------------------------------
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    let onlychar = []
    arr2.forEach(element => {
        onlychar.push(element.charAt(0))
    })
    let amountOfArrays = onlychar.filter(onlyUnique)
    //--------------------------------------------------------------------
    let betterarray = []
    amountOfArrays.forEach((element, i = 0) => {
    })
    //console.log(betterarray)


    //Arrays that miss image --------------------------------- imgval,undef,indexi
    let missingImg = []
    arr.forEach(([key, value], i = 0) => {
        i++
        if (key.includes('img')) {
            //
            missingImg.push(arr[i - 1].slice().concat([i - 1]))
        }
        //console.log(`${key} ${value}`); 
    });
    //---------------------------------------------------------------------------
    let sliceri = []

    missingImg.forEach((element, i = 0) => {

        arr.splice(element[2] - i, 1)
        i++
    })
  
    console.log('---------------------------------------------------')
    //console.log(arr.splice(0, 14))
    console.log(missingImg) // deleted elements
    console.log(amountOfArrays)
*/
let itemAdd = new itemadd(req.body,req.files)

console.log(itemAdd.numberOfItems())
console.log(itemAdd.missingImage())
console.log(misk.spliceArray(itemAdd.cleanArray())[1])
console.log(itemAdd.logFiles())











    res.end();


});

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [req.body.status,req.body.fetcher, req.body.junkId])
    res.end();
})

router.post('/itemReserveCancel', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [1, 0, req.body.junkId])
    res.end();
})

//tarttee checking että ei voi varata muitten varattuja
router.post('/itemReserve', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])
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

