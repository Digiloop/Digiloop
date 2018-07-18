var connection = require('../config/database2')
module.exports = class sqldata {
  constructor() {
    //tobedone
  }

  async querySql(query, values) {
    try {
      if (typeof values == "undefined" || typeof values == "function") {
        let result = await connection(query)
        console.log(query);
        return result
      } else {
        let result = connection(query, values)
        console.log(query + ' ' + values);
        return result
      }
    } catch (error) {
      console.log(error)
    }
  }

  async categoryAccess(category, condition) {
    try {
      if (condition) {
        let result = await `SELECT * FROM ${category}`
        return result
      } else {
        let result = await `SELECT * FROM ${category} WHERE Status = 1`
        return result
      }
    } catch (error) {
      console.log(error)
    }
  }

};
