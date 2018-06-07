var mysql = require('mysql2');
var dbconfig = require('../app/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = class sqldata {
  constructor() {
    //tobedone
  }

  get info() {
    //this.getinfo();
  }

  randomshizzle(callback) {
    //res.json('mo')
  }

  queryGet(query, callback) {
    connection.query(query, (err, result) => {
      callback(err, result);
    })
  }

  querySql(query, values) {
    if (typeof values == "undefined") {
      connection.query(query, (err, result) => {
        //if (err) throw err;
        //console.log(result.affectedRows + " record(s) updated");
        console.log(query);
      })
    } else {
      connection.query(query, values, (err, result) => {
        //if (err) throw err;
        //console.log(result.affectedRows + " record(s) updated");
        console.log(query);
        console.log(values);
      })
    }
  }

};