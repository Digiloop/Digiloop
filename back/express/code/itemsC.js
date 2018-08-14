var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
module.exports = {
    async itemGet(userlvl) {
        let query;
        if (userlvl != 0) {
            //query = `SELECT * FROM junk where owner = 8 AND status = 1`
            query = `SELECT * FROM junk where status = 1 OR status = 2`

        } else {
            query = 'SELECT * FROM junk'
        }

        let result = await sqldatahaku.querySql(query)
        return result
    },

    async itemReservations(company) {
        let query;
        query = `SELECT * FROM junk WHERE company = ?`
        let result = await sqldatahaku.querySql(query, company)
        return result
    },

    async itemDelete(userid, itemid) {

        let check = await sqldatahaku.querySql(`SELECT * FROM junk WHERE junkID = ?`, [itemid]);
        let user = await userid
        let query;
        //console.log(check[0].owner + ' owner id')
        //console.log(values + ' values')
        console.log(check)
        console.log(user + ' user id')
        if (user == check[0].owner && check[0].status == 1) {
            //query = `DELETE FROM junk WHERE junkID = ?`
            query = 'UPDATE junk SET status = ? WHERE junkID = ?'
            values = [0, itemid]
            await sqldatahaku.querySql(query, values)
            console.log('item deleted')
        } else {
            console.log('Cant let you do that')
        }
    },


    async itemReserve(userid, junkid, company) {
        junk = await junkid;
        let check = await sqldatahaku.querySql(`SELECT status FROM junk WHERE junkID = ?`, [junkid]);
        console.log(check[0].status == 1)
        if (check[0].status == 1) {
            await sqldatahaku.querySql('UPDATE junk SET status = ?, fetcher = ?, company = ? WHERE junkID = ?;', [2, userid, company, junkid])
        } else {
            return 410
        }
        //await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])

    }

}