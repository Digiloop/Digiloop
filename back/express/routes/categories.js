//var dosmth = require("./dosmth.js");
var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var fileUpload = require('express-fileupload');
//var randomiii = new sqldata();
//https://javascript.info/async-await
//https://itnext.io/using-async-await-to-write-cleaner-route-handlers-7fc1d91b220b
//GET

router.get('/categories',(req, res, next) => {
  const query = 'SELECT * FROM Category WHERE Status = 1'
  sqldatahaku.queryGet(query, (err,result) => {
    if (err) throw err;
    res.json(result);
    next();
  });
});

router.get('/feikkiCat',(req, res, next) => {
  const query = 'SELECT * FROM SubSubCats'
  sqldatahaku.queryGet(query, (err,result) => {
    if (err) throw err;
    res.json(result);
    next();
  });
});


router.get('/subcat', (req, res, next) => {
  const query = 'SELECT * FROM subCat WHERE Status = 1'
  sqldatahaku.getInfoSql(query, (err, result) => {
    if (err) throw err;
    res.json(result);
    next();
  });
});

//POST
router.post('/subcatStatus', (req, res, next) => {
  const query = 'UPDATE subCat SET Status = ? WHERE subId = ?'
  sqldatahaku.querySql(query, [req.body.Status,req.body.subId])
  res.end();
});

router.post('/catAdd', (req,res) => {
  const query = 'INSERT INTO Category ( CatName, Status, RealName, ImgReference ) VALUES (?,?,?,?)'
  sqldatahaku.querySql(query,[req.body.catname, 1, req.body.catname,'imagereferenssi']);
  res.end();
});

router.post('/subcatAdd', (req,res) => {
  const query = 'INSERT INTO subCat ( CatId, subName, Status) VALUES (?,?,?)'
  sqldatahaku.querySql(query,[req.body.catid, req.body.subcatname, 1]);
  res.end();
});

router.post('/imageAdd', (req,res) => {
  misk.imageAdd(req.files.sample);
  res.end();
  //console.log(req.files.sample);
 
});

module.exports = router