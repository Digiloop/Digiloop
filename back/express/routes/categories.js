//var dosmth = require("./dosmth.js");
var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata; //haetaan luokka joka hoitaa sql sydeemeit
var middleware = require('../code/middleware.js');

//GET
router.get('/categories', middleware.wrap(async (req, res, next) => {
  let query = await sqldatahaku.categoryAccess('Category', req.user && req.user.userlvl && req.user.userlvl == 0)
  res.json(await sqldatahaku.querySql(query))
}));

router.get('/subcat', middleware.wrap(async (req, res, next) => {
  let query = await sqldatahaku.categoryAccess('subCat', req.user && req.user.userlvl && req.user.userlvl == 0)
  res.json(await sqldatahaku.querySql(query))
}));

router.get('/feikkiCat', middleware.wrap(async (req, res, next) => {
  let query = await sqldatahaku.categoryAccess('SubSubCats', req.user && req.user.userlvl && req.user.userlvl == 0)
  res.json(await sqldatahaku.querySql(query))
}));

//POST
router.post('/catUpdate', middleware.wrap(async (req, res, next) => {
  let cat = await misk.selector(await req.body.catType, ['Category', 'subCat', 'SubSubCats'], ['CatName', 'subName', 'name'], ['CatId', 'subId', 'Id'])
  let arr = await [req.body.name, req.body.id]
  const query = await `UPDATE ${cat[0]} SET ${cat[1]} = ? WHERE ${cat[2]} = ?`
  sqldatahaku.querySql(query, arr)
  res.end();
}));

//Values: 0 = Category, 1 = subCat, 2 = SubSubCats
router.post('/catStatus', middleware.wrap(async (req, res, next) => {

  let cat = await misk.selector(req.body.catType, ['Category', 'subCat', 'SubSubCats'], ['CatId', 'subId', 'Id'])
  const query = 'UPDATE ' + cat[0] + ' SET Status = ? WHERE ' + cat[1] + '  = ?'
  //console.log(query);
  await sqldatahaku.querySql(query, [req.body.Status, req.body.id])

  res.end();
}));

router.post('/catAdd', middleware.wrap(async (req, res) => {
  const query = 'INSERT INTO Category ( CatName, Status, RealName, ImgReference ) VALUES (?,?,?,?)'
  await sqldatahaku.querySql(query, [req.body.catname, 1, req.body.catname, 'imgmissing.png']);
  res.end();
}));

router.post('/subcatAdd', middleware.wrap(async (req, res) => {
  const query = 'INSERT INTO subCat ( CatId, subName, Status) VALUES (?,?,?)'
  await sqldatahaku.querySql(query, [req.body.catid, req.body.subcatname, 1]);
  res.end();
}));

router.post('/feikkiCatAdd', middleware.wrap(async (req, res) => {
  const query = 'INSERT INTO SubSubCats ( imgReference, name, subCatId, Status) values (?, ?, ?, ?)'
  await sqldatahaku.querySql(query, ['imgmissing.png', req.body.name, req.body.subCatId, 1]);
  res.end();
}));


router.post('/imageCatAdd', (req, res) => {

  let imgname;
  let cat = misk.selector(req.body.catType, ['Category', 'SubSubCats'], ['CatId', 'Id'], ['ImgReference', 'imgReference'])

  const query = 'UPDATE ' + cat[0] + ' SET ' + cat[2] + ' = ? WHERE ' + cat[1] + '  = ?'

  // no image -> set reference to null
  if (req.body.nulli == 1) {
    imgname = 'imgmissing.png'
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