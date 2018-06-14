//var dosmth = require("./dosmth.js");
var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
//var fileUpload = require('express-fileupload');
//var randomiii = new sqldata();
//https://javascript.info/async-await
//https://itnext.io/using-async-await-to-write-cleaner-route-handlers-7fc1d91b220b


//GET
router.get('/categories',(req, res, next) => {
  //const query = 'SELECT * FROM Category WHERE Status = 1'
  const option = misk.selector(0,['SELECT * FROM Category','SELECT * FROM Category WHERE Status = 1',])
  const query = option[0]
  sqldatahaku.queryGet(query, (err, result) => {
    if (err) throw err;
    res.json(result);
    next();
  });
});

router.get('/subcat', (req, res, next) => {
  /*if (req.userlvl == 0){const query = 'SELECT * FROM subCat'}
  else{const query = 'SELECT * FROM subCat WHERE Status = 1'}*/
  const query = 'SELECT * FROM subCat'// WHERE Status = 1'
  sqldatahaku.queryGet(query, (err, result) => {
    if (err) throw err;
    res.json(result);
    next();
  });
});

router.get('/feikkiCat', (req, res, next) => {
  const query = 'SELECT * FROM SubSubCats'// WHERE Status = 1'
  sqldatahaku.queryGet(query, (err, result) => {
    if (err) throw err;
    res.json(result);
    next();
  });
});


//POST
router.post('/catUpdate', (req, res, next) => {
  //console.log(req.body);
  //console.log(req.body.Status)
  let cat = misk.selector(req.body.catType, ['Category', 'subCat', 'SubSubCats'], ['CatName', 'subName', 'name'], ['CatId', 'subId', 'Id'])
  const query = `UPDATE ${cat[0]} SET ${cat[1]} = ? WHERE ${cat[2]} = ?`
  sqldatahaku.querySql(query, [req.body.name, req.body.id])

  res.end();
});
//Values: 0 = Category, 1 = subCat, 2 = SubSubCats
router.post('/catStatus', (req, res, next) => {
  //console.log(req.body);
  //console.log(req.body.Status)
  //sqldatahaku.randomshizzle('moi')

  let cat = misk.selector(req.body.catType, ['Category', 'subCat', 'SubSubCats'], ['CatId', 'subId', 'Id'])
  const query = 'UPDATE ' + cat[0] + ' SET Status = ? WHERE ' + cat[1] + '  = ?'
  //console.log(query);
  sqldatahaku.querySql(query, [req.body.Status, req.body.id])

  res.end();
});

router.post('/catAdd', (req, res) => {
  const query = 'INSERT INTO Category ( CatName, Status, RealName, ImgReference ) VALUES (?,?,?,?)'
  sqldatahaku.querySql(query, [req.body.catname, 1, req.body.catname, 'imagereferenssi']);
  res.end();
});

router.post('/subcatAdd', (req, res) => {
  const query = 'INSERT INTO subCat ( CatId, subName, Status) VALUES (?,?,?)'
  sqldatahaku.querySql(query, [req.body.catid, req.body.subcatname, 1]);
  res.end();
});

router.post('/feikkiCatAdd', (req, res) => {
  const query = 'INSERT INTO SubSubCats ( imgReference, name, subCatId, Status) values (?, ?, ?, ?)'
  sqldatahaku.querySql(query, ['i can haz reference', req.body.name, req.body.subCatId, 1]);
  res.end();
});


router.post('/imageCatAdd', (req, res) => {

  let imgname;
  let cat = misk.selector(req.body.catType, ['Category', 'SubSubCats'], ['CatId', 'Id'], ['ImgReference', 'imgReference'])

  const query = 'UPDATE ' + cat[0] + ' SET ' + cat[2] + ' = ? WHERE ' + cat[1] + '  = ?'

  // no image -> set reference to null
  //lazy way to make the imagereference null
  if (req.body.nulli == 1) {
    imgname = null
    sqldatahaku.querySql(query, [imgname, req.body.id])

  // create the image name from (fake)catid + img name to prevent duplicates
  // removes all spaces, because they for some reason break in end user
  } else {
    imgname = `${req.body.id}_${req.files.pic.name}`;
    imgname = imgname.replace(/ /g, "")
    misk.imageAdd(req.files.pic, req.body.catType, imgname)
    sqldatahaku.querySql(query, [imgname, req.body.id])
  }

  res.end();
});

module.exports = router