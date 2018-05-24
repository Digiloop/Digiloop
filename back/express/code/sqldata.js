var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

//winscp kaatu
module.exports = class sqldata  {
    constructor(){
        //tobedone
    }
//https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql
//wut
get info(){
  //this.getinfo();
}

randomshizzle(callback){
  console.log(callback)
  //res.json('mo')
}

queryGet(query,callback){
  connection.query(query,(err, result) => {
    callback(err,result);
  })
}

queryPost(query, values){
  if(typeof values == "undefined") {
    connection.query(query, (err,result) => {
      //console.log(result.affectedRows + " record(s) updated");
      console.log(query);
    })
  } else {
    connection.query(query, values, (err,result) => {
      //console.log(result.affectedRows + " record(s) updated");
      console.log(query);
      console.log(values);
    })
  }
}

queryInsert(query,values){
  this.queryPost(query,values);
}

getInfoStatus(table,Status,callback){
  connection.query(`SELECT * FROM ${table} WHERE Status = ${Status}`,(err, result) => {
    callback(err,result);
  })
}

getInfoAll(table,callback){
  connection.query(`SELECT * FROM ${table}`,(err, result) => {
    callback(err,result);
  })
}

//queryinsertillä voidaan syöttää ainakin toistaiseksi catADD sekä subcatADD, 
//parametrit ovat nimeltään samat mitä tietokannassa
//CatName, Status, RealName, ImgReference
queryInsertCats(table, value1, value2, value3, value4){
  let sqlquery;
  let values;

  if (table === 'Category') {
    values = [value1, value2, value3, value4]
    sqlquery = `INSERT INTO ${table} ( CatName, Status, RealName, ImgReference ) VALUES (?,?,?,?)`
  } else if (table === 'subCat') {
    values = [value1, value2, value3]
    sqlquery = `INSERT INTO ${table} ( CatId, subName, Status) VALUES (?,?,?)`
  } else {
    console.log('Did not work')
  }

  connection.query(sqlquery, values, (err, result) => {
    console.log(result.affectedRows + " record(s) updated");
  })
}

};