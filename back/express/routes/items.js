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

// fetches missing items for frontend
router.post('/itemRefresh', (req, res) => {

    const query = 'SELECT * FROM junk'

    sqldatahaku.queryGet(query, (err, result) => {
        if(err) throw err;

        let diff = result.length - req.body.listLength;
        console.log("Kanta: "+result.length+" Front: "+req.body.listLength+" Erotus: "+diff)
        if(diff > 0){

            let responseArray = []

            for(let i = req.body.listLength, j = 0; i < result.length; i++, j++){
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
/*
router.post('/imageAdd', (req, res) => {
    //console.log(req.get('Content-Type'));
    console.log(req.files)
    //console.log(req.files.pic)
    //console.log(typeof req.files.pic)
    console.log(req.body)
    
      const query = 'UPDATE junk' +  SET  + cat[2] + ' = ? WHERE ' + cat[1] + '  = ?'
      imgname = `${req.body.id}_${req.files.pic.name}`;
      misk.imageAdd(req.files.pic, req.body.catType, imgname)
      sqldatahaku.querySql(query, [imgname, req.body.id])
    
    //console.log(typeof req.files.image);
    //console.log(req.body.image);
    //console.log(req.body);
    //console.log(typeof req.body);

    //console.log(Object.keys(req.body).length)
    //misk.imageAdd(req.files.img0, 0);// categories,subcategories,users = 0/1/2
    res.end();
    //console.log(req.files.sample);
});
*/

router.post('/itemAddOld', (req, res, next) => {
    
    //console.log(req.files)
    console.log(third)
    const query = 'INSERT INTO junk ( category, city, description, iscompany, latitude, longitude, pcs, itemphone, wishbox, pickupaddr,  size, subCat, weight, zipcode, junkdate, junkdateadded, status, owner, picture ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const secondary = [Date.now(), misk.dateToday(), 1, req.user.id]//req.user.id
    //let imuguu = misk.keyToArray(req.files)[1].name
    // console.log(imuguu)
    //misk.fuseItemArray(req.body, secondary, third, sqldatahaku.querySql, query)//req.body = all items, secondary = data from backend, sqldatahaku.querySql = function that inserts stuff to database, query = sqlquery
    res.end();
});

router.post('/itemAdd', (req, res, next) => {
    a = req.body
    //console.log(a)
    //console.log(a)
    var arr = Object.entries(a);

    //for (i = 0; i < a; i++) {}
    let pusheri = []
    
    arr.forEach(([key, value]) => {
        if (key.includes('img')){
            key.pop(key,value)
        }
        //console.log(`${key} ${value}`); 
        });

        console.log(arr)
/*
//console.log(pusheri)
    for (var key in a) {
        //arr.push(vals[key]);
        if (key.includes('img')){
            //arr.push(key)
        }
    }
*/
    res.end();
});

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ? WHERE junkID = ?;', [req.body.status, req.body.junkId])
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

