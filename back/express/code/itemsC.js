var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
module.exports = {
    async itemGet(userlvl) {
        let query;
        if (userlvl != 0) {
            //query = `SELECT * FROM junk where owner = 8 AND status = 1`
            query = `SELECT junk.junkID,junk.category,junk.subCat,junk.weight,junk.size,junk.description,junk.picture,junk.pcs,junk.pickupaddr,junk.junkdate,
            junk.junkdateadded,junk.status,junk.owner,junk.fetcher,junk.city,junk.zipcode,junk.latitude,junk.longitude,junk.wishbox,
            junk.iscompany,junk.itemphone,users.fname,users.lname,users.company 
            FROM junk INNER JOIN users ON junk.owner = users.id WHERE junk.status = 1 OR junk.status = 2`
        } else {
            query = 'SELECT * FROM junk INNER JOIN users ON junk.owner = users.id'
        }

        let result = await sqldatahaku.querySql(query)
        return result
    },

    async itemReservations(company) {
        let query;
        //`SELECT junk.*,users.* FROM junk INNER JOIN users ON junk.fetcher = users.id WHERE users.company = ?`
        query = `SELECT junk.*,users.fname,users.lname,users.company FROM junk,users WHERE junk.fetcher = users.id AND users.company = ?`
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


    async itemReserve(userid, junkid) {
        junk = await junkid;
        let check = await sqldatahaku.querySql(`SELECT status FROM junk WHERE junkID = ?`, [junkid]);
        console.log(check[0].status == 1)
        if (check[0].status == 1) {
            await sqldatahaku.querySql('UPDATE junk SET status = ?, fetcher = ? WHERE junkID = ?;', [2, userid, junkid])
        } else {
            return 410
        }
        //await sqldatahaku.querySql('UPDATE junk SET status = ?,fetcher = ? WHERE junkID = ?;', [2, req.user.id, req.body.junkId])

    }

}