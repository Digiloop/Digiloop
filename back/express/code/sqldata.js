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
  connection.query(query,(err, result) => {
    if (err) throw err;
    callback(err,result);
  })
}

querypost(query){
  connection.query(query,(err,result) => {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");

  })
}

getinfo(table,Status,callback){
  connection.query(`SELECT * FROM ${table} WHERE Status = ${Status}`,(err, result) => {
    callback(err,result);
  })
}

//queryinsertillä voidaan syöttää ainakin toistaiseksi catADD sekä subcatADD, tarvii mahdollisesti sql escapea
//parametrit ovat nimeltään samat mitä tietokannassa
//CatName, Status, RealName, ImgReference
queryinsert(table, value1, value2, value3, value4){
  let sqlquery;
  //console.log(`${table},${value1},${value2},${value3},${value4}`)
  if (table === 'Category') {
    sqlquery = `INSERT INTO ${table} ( CatName, Status, RealName, ImgReference ) VALUES ('${value1}','${value2}','${value3}','${value4}')`
  } else if (table === 'subCat') {
    sqlquery = `INSERT INTO ${table} ( CatId, subName, Status) VALUES ('${value1}','${value2}','${value3}')`
  } else {
    console.log('Did not work')
  }

  connection.query(sqlquery,(err, result) => {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  })

}
};


