var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
module.exports = {
    async itemGet(userid, userlvl, userlvlrequired) {
        let query;
        if (userlvl == userlvlrequired) {
            //query = `SELECT * FROM junk where owner = 8 AND status = 1`
            query = `SELECT * FROM junk where owner = ${userid} AND status = 1`// kasin tilalle takas !important
        } else {
            query = 'SELECT * FROM junk'
        }

        let result = await sqldatahaku.querySql(query)
        return result
    }


}