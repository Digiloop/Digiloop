var dosmth = require("./dosmth.js");
var dosmthelse = require("./dosmthelse.js");
var express = require('express');
var router = express.Router();

//https://javascript.info/async-await
//https://itnext.io/using-async-await-to-write-cleaner-route-handlers-7fc1d91b220b

/*
router.get('/categories', function(req, res, next) {
        connection.query('SELECT * FROM Category WHERE Status = 1', function(err, result) {
            if (err) throw err;
            res.json({
                category: result
            });
        });
    });
*/
/*(taulu = 'Category', tieto = 'Status')*/
    router.get('/categories2',dosmth.getcategories, async function(req, res, next) {

          await dosmth.getcategories('Category','1')
          /*res.json(dosmth.getcategories(taulu = 'Category', tieto = 'Status'))*/
        //  throw new Error("Whoops!");
    //  next();

        });


        router.get('/categories',dosmthelse.getcategoriestemp, async function(req, res, next) {

            });







    router.get('/error', function(req, res, next) {
            connection.query('SELECT * FROM Category WHERE Status = 1', function(err, result) {
                if (err) throw err;
                res.json({
                    category: ServuKaatuu
                });
            });
        });




module.exports = router
