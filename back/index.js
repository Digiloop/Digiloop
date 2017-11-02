var mysql = require('mysql');
var bodyParser = require("body-parser");
const express = require('express');
const app = express();


var con = mysql.createConnection({
  host: "niisku.lamk.fi",
  user: "digiloop",
  password: "Koodaus1",
  database: "user_digiloop"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('../front/public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
   console.log(__dirname);
})



app.listen(4302, function () {
    console.log('Example app listening on port 4302 !');
});


app.get('/nimi', function (req, res) {

    con.query('SELECT * FROM Category', (err, rows) => {
        if (err) throw err;

        res.send('Data received from Db:\n' + rows[0].CatName);
    });

});
