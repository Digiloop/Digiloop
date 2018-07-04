var connection = require('../config/database')
var connection2 = require('../config/database2')
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

  async queryGetAsync(query) {
    try {
      const result = await connection2(query)
      return result
    } catch (err) {
      console.log(err)
    }
  }

  async querySql(query, values) {
    try {
      if (typeof values == "undefined") {
        let result = await connection2(query)
        console.log(query);
        return result
      } else {
        connection2(query, values)
        console.log(query);
        console.log(values);
      }
    }

    catch (error) {
      console.log(error)
    }

  }




  /*
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
  */
  async categoryAccess(category, condition) {
    try {
      if (await condition) {
        return `SELECT * FROM ${category}`
      } else {
        return `SELECT * FROM ${category} WHERE Status = 1`
      }
    } catch (error) {
      console.log(error)
    }

  }

};
