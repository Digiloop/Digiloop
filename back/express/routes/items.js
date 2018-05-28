var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); //haetaan luokka joka hoitaa sql sydeemeit
var sqldatahaku = new sqldata; 
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
router.post('/itemAdd',isLoggedIn, (req, res, next) => {
    const query = 'INSERT INTO junk ( pickupaddr, zipcode, city, itemphone, wishbox, iscompany, category, subCat, pcs, size, weight, description, latitude, longitude, junkdate, junkdateadded, status, owner ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [Date.now(), '2018-05-23 13:06:00', 1, req.user.id]
    fuseItemArray(req.body,secondary,query)
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

router.post('/itemTest', (req, res, next) => {
})

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.end();
}

function keyToArray(vals){
    let arr = [];
    for (var key in vals) {
       arr.push(vals[key]);
    }
    return arr;
    }

function fuseItemArray(array1,array2,query) {
    let arr = [];
    for (var i = 0; i < array1.length; i++) {
        sqldatahaku.querySql(query,keyToArray(array1[i]).concat(array2))
    }
}

module.exports = router