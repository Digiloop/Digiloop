var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = class sqldata  {
    constructor(){
        //tobedone
    }
//https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql

get info(){
  //this.getinfo();
}

randomshizzle(callback){
  console.log(callback)
  //res.json('mo')
}

queryget(query,callback){
  connection.query(query,function(err, result) {
    if (err) throw err;
    callback(err,result);
  })
} 

querypost(query){
  connection.query(query,function(err,result){
    if (err) {
      connection.rollback(function() {
          throw err;
      });
    }
    else {
      console.log(result.affectedRows + " record(s) updated");
    }
  })
} 


getinfo(table,Status,callback){
  connection.query(`SELECT * FROM ${table} WHERE Status = ${Status}`,function(err, result) {
    callback(err,result);
  })
} 

//queryinsertillä voidaan syöttää ainakin toistaiseksi catADD sekä subcatADD, tarvii mahdollisesti sql escapea
//parametrit ovat nimeltään samat mitä tietokannassa
queryinsert(CatName, Status, RealName, ImgReference){
  connection.query(`INSERT INTO Category ( CatName, Status, RealName, ImgReference ) VALUES ('${CatName}','${Status}','${RealName}','${ImgReference}')`,function(err, result){
    if (err) {
      connection.rollback(function() {
          throw err;
      });
    }
    else {
      console.log(result.affectedRows + " record(s) updated");
    }
  })

}
//`INSERT INTO Category ( CatName, Status, RealName ) VALUES ('${req.body.catname}','1','${req.body.catname}')
};


/*


/*
app.post('/subcatADD', function(req,res) {
  var newsubCat = {
    catid:req.body.catid,
    subcatname:req.body.subcatname.toString(),
    subcatstatus:1//req.body.subcatstatus
  };
  var insertQuery = "INSERT INTO subCat ( CatId, subName, Status ) values (?,?,?)";
  connection.query(insertQuery, [newsubCat.catid, newsubCat.subcatname, newsubCat.subcatstatus], function(err, result) {
      if (err) {
          connection.rollback(function() {
              throw err;
          });
      }});
      res.end();
});







getinfo(table,Status,callback){
  connection.query('SELECT * FROM '+ table +' WHERE Status = '+ Status +'',function(err, result) {
    callback(err,result);
  })
} 



updatesubcatstatus(taulu,status,subid) {
  connection.query('UPDATE ' + taulu +' SET Status = ' + status + ' WHERE subId = ' + subid + ';',function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  })
}


*/