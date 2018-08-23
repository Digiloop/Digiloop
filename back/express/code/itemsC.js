var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
let longquery = `SELECT junk.junkID,junk.category,junk.subCat,junk.weight,junk.size,junk.description,junk.picture,junk.pcs,junk.pickupaddr,junk.junkdate,
    junk.junkdateadded,junk.status,junk.owner,junk.fetcher,junk.city,junk.zipcode,junk.latitude,junk.longitude,junk.wishbox,
    junk.iscompany,junk.itemphone,users.fname,users.lname,users.company
    FROM junk LEFT JOIN users ON junk.fetcher = users.id WHERE `// junk.status = 1 OR junk.status = 2`

let longqueryOwner = `SELECT junk.junkID,junk.owner,junk.status,
    users.fname,users.lname
    FROM junk LEFT JOIN users ON junk.owner = users.id WHERE `
module.exports = {
    


    async itemGet(userlvl,userid) {
        let query;
        
        if (userlvl != 0) {
            //query = `SELECT * FROM junk where owner = 8 AND status = 1`
            query = longquery + 'junk.status = 1 OR junk.status = 2'
        } else {
            query = 'SELECT * FROM junk INNER JOIN users ON junk.owner = users.id'
        }

        let result = await sqldatahaku.querySql(query)
        return result
    },

    async itemReservations() {

        //`SELECT junk.*,users.* FROM junk INNER JOIN users ON junk.fetcher = users.id WHERE users.company = ?`
        //`SELECT junk.*,users.fname,users.lname,users.company FROM junk,users WHERE junk.fetcher = users.id AND users.company = ?`
        let where = 'junk.status = 2 OR junk.status = 3 OR junk.status = 4'
        let query = longquery + where
        let query2 = longqueryOwner + where
        let result = await sqldatahaku.querySql(query)
        let result2 = await sqldatahaku.querySql(query2)
        //return result

    let i = 0;
    let arr = [];
//console.log(result.length)
//console.log(result2.length)


    for (i; i < result.length; i++) {
        let iteminfo = {
        junkID: result[i].junkID,
        category: result[i].category,
        subCat: result[i].subCat,
        weight: result[i].weight,
        size: result[i].size,
        description: result[i].description,
        picture: result[i].picture,
        pcs: result[i].pcs,
        pickupaddr: result[i].pickupaddr,
        junkdate: result[i].junkdate,
        junkdateadded: result[i].junkdateadded,
        status: result[i].status,
        owner: result[i].owner,
        fetcher: result[i].fetcher,
        city: result[i].city,
        zipcode: result[i].zipcode,
        latitude: result[i].latitude,
        longitude: result[i].longitude,
        wishbox: result[i].wishbox,
        iscompany: result[i].iscompany,
        itemphone: result[i].itemphone,
        fname: result[i].fname,
        lname: result[i].lname,
        company: result[i].company,
        fnameOwner: result2[i].fname,
        lnameOwner: result2[i].lname
        }


        arr.push(iteminfo)
    }

    return arr

    },

    async itemHistory(userid) {
        let query;
        query = longquery + 'junk.status = 1 OR junk.status = 2 OR junk.status = 3 OR junk.status = 4 AND junk.owner = ?'
        let result = await sqldatahaku.querySql(query,userid)
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