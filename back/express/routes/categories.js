var dosmth = require("./dosmth.js");
var dosmthelse = require("./dosmthelse.js");
var express = require('express');
var router = express.Router();

//https://javascript.info/async-await
//https://itnext.io/using-async-await-to-write-cleaner-route-handlers-7fc1d91b220b
//GET
router.get('/categories', function(req, res, next) {
  dosmth.getinfo('Category','1',function(err, result){
    if (err) throw err;
    res.json(result);
    next();
  });
});

router.get('/subcat', function(req, res, next) {
  dosmth.getinfo('subCat','1',function(err, result){
    if (err) throw err;
    res.json(result);
    next();
  });
});

//POST
router.post('/subcatstatus', function(req, res, next) {
  dosmth.updatesubcatstatus('subCat',req.body.Status,req.body.subIdStatus)
    console.log("Status ",req.body.Status," subIdStatus ", req.body.subIdStatus)
    res.end();
});


module.exports = router
