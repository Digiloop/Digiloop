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

  queryGet(query, callback) {
    connection.query(query, (err, result) => {
      callback(err, result);
    })
  }

  querySql(query, values) {
    if (typeof values == "undefined") {
      connection.query(query, (err, result) => {
        if (err) console.log(err);
        //console.log(result.affectedRows + " record(s) updated");
        console.log(query);
      })
    } else {
      connection.query(query, values, (err, result) => {
        //if (err) throw err;
        if (err) console.log(err);
        //console.log(result.affectedRows + " record(s) updated");
        console.log(query);
        console.log(values);
      })
    }
  }

  async categoryAccess(category,iffi) {
    try {
      if (await iffi) {
        return `SELECT * FROM ${category}`
      } else {
        return `SELECT * FROM ${category} WHERE Status = 1`
      }
    } catch (error) {
      console.log(error)
    }

  }







};
