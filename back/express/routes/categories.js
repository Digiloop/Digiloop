//var dosmth = require("./dosmth.js");
var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); //haetaan luokka joka hoitaa sql sydeemeit
var sqldatahaku = new sqldata; // 
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

router.get('/kuva', (req, res, next) => {
  res.sendFile(`${__dirname}/randomi.jpg`)
})

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

module.exports = router