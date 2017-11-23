var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var testi;
var testi2;

var con = mysql.createConnection({
  host: "niisku.lamk.fi",
  user: "digiloop",
  password: "Koodaus1",
  database: "user_digiloop"
});

con.connect(function(err) {
  if (err) throw err;
	con.query('SELECT * FROM Category', (err, rows) => {
        testi = rows[0].CatName;
	testi2 = rows[1].CatName;
	if (err) throw err;
    });
  
  console.log("Connected!");
  
    
});

console.log(testi);








/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: testi
  }, {
  	id: 2,
  	username: testi2
  }]);
});

module.exports = router;
