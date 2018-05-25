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
router.post('/itemAdd', (req, res, next) => {
    const query = 'INSERT INTO junk ( category, subCat, weight, size, description, pcs, pickupaddr, junkdate, junkdateadded, status, owner, latitude, longitude, wishbox, city, zipcode, iscompany, itemphone ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    sqldatahaku.querySql(query,[req.body.category, req.body.subCat, req.body.weight, req.body.size, req.body.description, 
    req.body.pcs, req.body.pickupaddr, Date.now(), '2018-05-23 13:06:00', 1,
    req.user.id, 62.017713, 25.682757, req.body.pickupInstructions, req.body.city, req.body.zipcode, req.body.iscompany, req.body.phone]);
    res.end();
}); // //req.user.id

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ? WHERE junkID = ?;',[req.body.status,req.body.junkId])
    res.end();
})

router.post('/itemReserve', (req, res, next) => {
    sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;',[2,req.user.id,req.body.junkId])
    res.end();
})

module.exports = router