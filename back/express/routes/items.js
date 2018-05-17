var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); //haetaan luokka joka hoitaa sql sydeemeit
var sqldatahaku = new sqldata; 



router.post('/itemss',(req, res, next) => {
    sqldatahaku.queryInsertItems(req.body.category, req.body.subCat, req.body.weight, req.body.size, req.body.description, 
                    req.body.pcs, req.body.pickupaddr, req.body.junkdate, req.body.junkdateadded, req.body.status,
                    req.user.id);
                    //req.body.latitude, req.body.longitude, req.body.coordstatus
    res.end();
});

router.get('/items5',(req, res, next) => {
    sqldatahaku.getInfoAll('junk',(err, result) => {
        if (err) throw err;
        res.json(result);
        next();
      });
});



/*    app.post('/itemADD',isLoggedIn, (req, res) => {
        var item = {
            category: req.body.category.toString(),
            subCat: req.body.subCat.toString(), // use the generateHash function in our user model
            weight: req.body.weight,
            size: req.body.size,
            description: req.body.description.toString(),
            //picture: "",//req.body.picture.toString(),
            pcs: req.body.pcs,
            pickupaddr: req.body.pickupaddr.toString(),
            junkdate: req.body.junkdate,
            junkdateadded: req.body.junkdateadded,
            status: req.body.status,
            owner: req.user.id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            coordstatus: req.body.coordstatus
        };

  

        var insertQuery = "INSERT INTO junk ( category, subCat, weight, size, description, pcs, pickupaddr, junkdate, junkdateadded, status, owner ) values (?,?,?,?,?,?,?,?,?,?,?)";
        var insertQuery2 = "INSERT INTO Coordinates ( latitude, longitude, coordstatus) values (?, ?, ?)";
        connection.beginTransaction(function(err) {
            if (err) {
                throw err;
            }
            connection.query(insertQuery, [newItem.category, newItem.subCat, newItem.weight, newItem.size, newItem.description, newItem.picture, newItem.pcs, newItem.pickupaddr, newItem.junkdate, newItem.junkdateadded, newItem.status, newItem.owner], function(err, result) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }
            connection.query(insertQuery2, [newItem.latitude, newItem.longitude, newItem.coordstatus], function(err, result) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }
            connection.commit(function(err) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('Item added success!');
                    });
                });
            });
        });
        res.end();
    });
*/

module.exports = router