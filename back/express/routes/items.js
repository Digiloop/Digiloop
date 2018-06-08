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
router.post('/imageAdd', (req, res) => {
    //console.log(req.get('Content-Type'));
    console.log(req.files)
    //console.log(req.files.pic)
    //console.log(typeof req.files.pic)
    console.log(req.body)
  /*
    const query = 'UPDATE junk' +  SET  + cat[2] + ' = ? WHERE ' + cat[1] + '  = ?'
    imgname = `${req.body.id}_${req.files.pic.name}`;
    misk.imageAdd(req.files.pic, req.body.catType, imgname)
    sqldatahaku.querySql(query, [imgname, req.body.id])
  */
    //console.log(typeof req.files.image);
    //console.log(req.body.image);
    //console.log(req.body);
    //console.log(typeof req.body);
  
    //console.log(Object.keys(req.body).length)
    //misk.imageAdd(req.files.img0, 0);// categories,subcategories,users = 0/1/2
    res.end();
    //console.log(req.files.sample);
  });

  
router.post('/itemAdd', (req, res, next) => {
    //console.log(req.body.itemData)
        //console.log(req.body)
        //console.log(req.body.pickupInstructions0)
        //console.log(req.files)
        //console.log(req.body)
    //console.log(typeof req.body.itemData)
    //console.log(misk.checkValidLength(req.body.itemData, 14))
    //console.log(misk.checkValidValues(req.body.itemData));
    //misk.loopityLoop(req.body.itemData,console.log)
    //console.log(req.body.itemData)
    //console.log(Object.keys(req.body.itemData[0].picture).length)
    //console.log(misk.imageAdd(req.body.itemData[0].req.files.picture, 0));
    let third = misk.keyToArray(req.files)
        const query = 'INSERT INTO junk ( category, city, description, iscompany, latitude, longitude, pcs, itemphone, wishbox, pickupaddr,  size, subCat, weight, zipcode, junkdate, junkdateadded, status, owner, picture ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
        const secondary = [Date.now(), misk.dateThing(), 1, 47]//req.user.id
        //let imuguu = misk.keyToArray(req.files)[1].name
        
       // console.log(imuguu)
    misk.fuseItemArray(req.body, secondary, third, sqldatahaku.querySql, query)//req.body = all items, secondary = data from backend, sqldatahaku.querySql = function that inserts stuff to database, query = sqlquery
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

