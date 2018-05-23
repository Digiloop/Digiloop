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

queryGet(query,callback){
  connection.query(query,(err, result) => {
    callback(err,result);
  })
}

queryConnection(){
  connection.query(this.argLoop(arguments), (err,result) => {
    
    //console.log(arguments);
    console.log('minä olen queryConnection')
    console.log(result.affectedRows + " record(s) updated");
  })
}
/*
queryPost(query, values, nmbrOfVals){
  if(typeof values == "undefined") {
  connection.query(query,(err,result) => {
    console.log(result.affectedRows + " record(s) updated");
  })
} else
  connection.query(query, values, (err,result) => {
    console.log(result.affectedRows + " record(s) updated");
  })
}
*/
queryPost(query, values){
  if(typeof values == "undefined") {
    connection.query(query, (err,result) => {
      console.log(result.affectedRows + " record(s) updated");
    })
  } else {
    connection.query(query, values, (err,result) => {
      console.log(result.affectedRows + " record(s) updated");
    })
  }

}

queryUpdateStatus(){
  let sqlquery = 'UPDATE junk SET status = ? WHERE junkID = ?;';
  let values = [arguments[0],arguments[1]]
  this.queryPost(sqlquery,values)
}

queryItemReserve(){
  let sqlquery = 'UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;';
  let values = [arguments[0],arguments[1],arguments[2]]
  this.queryPost(sqlquery,values)
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



queryInsertItems(){  
  let sqlquery = 'INSERT INTO junk ( category, subCat, weight, size, description, pcs, pickupaddr, junkdate, junkdateadded, status, owner, latitude, longitude ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);'
  let values = [arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],arguments[11],arguments[12]]
  connection.query(sqlquery, values, (err, result) => {
    console.log(result.affectedRows + " record(s) updated");
    console.log(sqlquery);
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