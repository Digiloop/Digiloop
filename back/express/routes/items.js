var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); //haetaan luokka joka hoitaa sql sydeemeit
var sqldatahaku = new sqldata; 



router.post('/itemAdd',(req, res, next) => {
    /*
    sqldatahaku.queryInsertItems(req.body.category, req.body.subCat, req.body.weight, req.body.size, req.body.description, 
                    req.body.pcs, req.body.pickupaddr, Date.now(), '2018-05-23 13:06:00', 1,
                    req.user.id, 62.017713, 25.682757, req.body.pickupInstructions, req.body.city, req.body.zipcode, req.body.iscompany, req.body.phone);
                    */
    const query = 'INSERT INTO junk ( category, subCat, weight, size, description, pcs, pickupaddr, junkdate, junkdateadded, status, owner, latitude, longitude, wishbox, city, zipcode, iscompany, itemphone ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    sqldatahaku.queryInsert(query,[req.body.category, req.body.subCat, req.body.weight, req.body.size, req.body.description, 
    req.body.pcs, req.body.pickupaddr, Date.now(), '2018-05-23 13:06:00', 1,
    req.user.id, 62.017713, 25.682757, req.body.pickupInstructions, req.body.city, req.body.zipcode, req.body.iscompany, req.body.phone]);
    res.end();
}); // //req.user.id

router.get('/items',(req, res, next) => {
    sqldatahaku.getInfoAll('junk',(err, result) => {
        if (err) throw err;
        res.json(result);
        next();
      });
});


//POST

router.post('/itemStatus', (req, res, next) => {
    sqldatahaku.queryInsert('UPDATE junk SET status = ? WHERE junkID = ?;',[req.body.status,req.body.junkId])
    res.end();
})

router.post('/itemReserve', (req, res) => {
    sqldatahaku.queryInsert('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;',[2,req.user.id,req.body.junkId])
    res.end();
})

router.get('/testi', async (req, res) => {
    a = [1,2,3,4,5,6]
    await console.log(typeof sqldatahaku.viduTesti(a))
    await res.json(sqldatahaku.viduTesti(a));
})

module.exports = router