var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
module.exports = {
    async itemGet(userid, userlvl, userlvlrequired, status) {
        let query;
        if (userlvl == userlvlrequired) {
            //query = `SELECT * FROM junk where owner = 8 AND status = 1`
            query = `SELECT * FROM junk where owner = ? AND status = ?`// kasin tilalle takas !important
        } else {
            query = 'SELECT * FROM junk'
        }

        let result = await sqldatahaku.querySql(query, [userid, status])
        return result
    },

    async itemDelete(userid,itemid) {

        let check = await sqldatahaku.querySql(`SELECT owner FROM junk WHERE junkID = ?`, [userid]);
        let user = await userid
        let query;
        console.log(check[0].owner + ' owner id')
        //console.log(values + ' values')
        console.log(user + ' user id')
        if (user == check[0].owner) {
            //query = `DELETE FROM junk WHERE junkID = ?`
            query = 'UPDATE junk SET status = ? WHERE junkID = ?'
            values = [0, itemid]
            await sqldatahaku.querySql(query, values)
        } else {
            console.log('Cant let you do that')
        }
    }


}