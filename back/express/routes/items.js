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
router.post('/itemAdd',isLoggedIn, (req, res, next) => {
    //const query = 'INSERT INTO junk ( category, subCat, weight, size, description, pcs, pickupaddr, junkdate, junkdateadded, status, owner, latitude, longitude, wishbox, city, zipcode, iscompany, itemphone ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    const query = 'INSERT INTO junk ( pickupaddr, zipcode, city, itemphone, wishbox, iscompany, category, subCat, pcs, size, weight, description, latitude, longitude, junkdate, junkdateadded, status, owner ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    /*sqldatahaku.querySql(query,[req.body.category, req.body.subCat, req.body.weight, req.body.size, req.body.description, 
    req.body.pcs, req.body.pickupaddr, Date.now(), '2018-05-23 13:06:00', 1,
    req.user.id, 62.017713, 25.682757, req.body.pickupInstructions, req.body.city, req.body.zipcode, req.body.iscompany, req.body.phone]);
    res.end();*/
    let secondary = [Date.now(), '2018-05-23 13:06:00', 1, req.user.id]
    //sqldatahaku.querySql(query,fuseItemArray(req.body,secondary))
    fuseItemArray(req.body,secondary,query)
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

router.post('/itemTest', (req, res, next) => {
    req.body;
    let id = 102;
    //a = req.body[1]
    a1 = req.body[0];
    a = req.body;
    b = [Date.now(), '2018-05-23 13:06:00', 1, req.user.id]
    
let item = [a.pickupaddr,a.zipcode,a.city,a.phone,a.pickupInstructions,a.iscompany,
            a.category,a.subCat,a.pcs,a.size,a.weight,a.description,a.latitude,a.longitude]
    let ab = item.concat(b)
    //console.log(ab)
    //funkkari(a,b);
    //let arrar = keyToArray(a1);
    d = fuseItemArray(a,b)
    console.log(d)
    //console.log(arrar[1])
    //ab = a.concat(b);
    //console.log(Object.keys(a))
    //console.log(a)
    res.end();
})

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    //res.redirect('/');
    res.end();
}


function derppari(vals){
for (i=0;i<Object.keys(vals).length; i++) {
   console.log(vals[Object.keys(i)]);
}
}

function keyToArray(vals){
    let arr = [];
    for (var key in vals) {
       arr.push(vals[key]);
    }
    return arr;
    }

function fuseItemArray(array1,array2,query) {
    let arr = [];
    for (var i = 0; i < array1.length; i++) {
        //console.log()
        sqldatahaku.querySql(query,keyToArray(array1[i]).concat(array2))
        //Do something
    }
}


module.exports = router