var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); //haetaan luokka joka hoitaa sql sydeemeit
var sqldatahaku = new sqldata; 



router.post('/itemAdd',(req, res, next) => {
    sqldatahaku.queryInsertItems(req.body.category, req.body.subCat, req.body.weight, req.body.size, req.body.description, 
                    req.body.pcs, req.body.pickupaddr, Date.now(), req.body.junkdateadded, req.body.status,
                    req.user.id, req.body.latitude, req.body.longitude);
    res.end();
});

router.get('/items',(req, res, next) => {
    sqldatahaku.getInfoAll('junk',(err, result) => {
        if (err) throw err;
        res.json(result);
        next();
      });
});


//POST

router.post('/itemStatus', (req, res) => {
    sqldatahaku.queryUpdateStatus(req.body.status,req.body.junkId)
    res.end();
    //'UPDATE junk SET status = ? WHERE junkID = ?;', [, ]
})

router.post('/itemReserve', (req, res) => {
    sqldatahaku.queryItemReserve(req.body.status,req.body.fetcher,req.body.junkId)
    res.end();
})

/*
    //item Status
    app.post('/itemStatus', (req, res) => {
        connection.query('UPDATE junk SET status = ? WHERE junkID = ?;', [req.body.status, req.body.subIdStatus], (err, rows) => {
            if (err) throw err;
            console.log(rows.affectedRows + " record(s) updated");
        });
        console.log(req.body.status, " ", req.body.subIdStatus)
        res.end();
    });

    app.post('/itemReserve', isLoggedIn, (req, res) => {
        connection.query('UPDATE junk SET status = ?, fetcher = ? WHERE junkID = ?;', [req.body.status,req.body.fetcher, req.body.subIdStatus], (err, rows) => {
            if (err) throw err;
            console.log(rows.affectedRows + " record(s) updated");
        });
        console.log(req.body.status, " ",req.body.fetcher , " ", req.body.subIdStatus)
        res.end();
    });
*/
module.exports = router