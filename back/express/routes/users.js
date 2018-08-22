var express = require('express');
var router = express.Router();
var misc = require('../code/misc.js'); var misk = new misc;
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');
var activator = require('../code/accountActivation')
var generatepassword = require('../code/passGen')

router.route('/users')
    .get(middleware.isAdmin, middleware.wrap(async (req, res) => {
        let query = 'SELECT * FROM users'
        res.json(await sqldatahaku.querySql(query))
    }))
    .put(middleware.wrap(async (req, res) => {
        let query = 'UPDATE users SET fname = ?, lname = ?, address = ?, zipcode = ?, city = ?, phone = ? WHERE id = ?'
        let values = [req.body.fname, req.body.lname, req.body.address, req.body.zipcode, req.body.city, req.body.phone, req.user.id]
        await sqldatahaku.querySql(query, values)
        res.end()
    }))
    .post(middleware.wrap(async (req, res) => {
        activator.select(req.body.Status, req.body.id);
        res.end()
    }))

router.get('/fetcher/:id', middleware.wrap(async (req, res) => {
    let query = 'SELECT * FROM users WHERE id = ?'
    let values = await [req.params.id]
    let result = await sqldatahaku.querySql(query, values)
    let fetcher = {
        company: result[0].company,
        fname: result[0].fname,
        lname: result[0].lname,
        email: result[0].email
    }
    res.json(fetcher)
}))

router.get('/usersCompany', middleware.wrap(async (req, res) => {
    let query = 'SELECT * FROM users WHERE userlvl = ? AND company = ?' //AND company = ?'
    let values = await [3, req.user.company]//req.user.company
    let result = await sqldatahaku.querySql(query, values)
    let i = 0;
    let arr = [];



    for (i; i < result.length; i++) {
        let user = {
            id: result[i].id,
            fname: result[i].fname,
            lname: result[i].lname,
            email: result[i].email,
            phone: result[i].phone,
            address: result[i].address,
            zipcode: result[i].zipcode,
            city: result[i].city,
            company: result[i].company,
            ytunnus: result[i].ytunnus,
            status: result[i].Status
        }

        arr.push(user)
    }

    res.json(arr)

}))


router.post('/changePassword', middleware.wrap(async (req, res, next) => {
    let result = await generatepassword.changePassword(req.user.id, req.body.password, req.body.oldpassword, req.user.password);//id, password, oldpassword
    if (result == false) { res.status(406) }
    res.end();
}));

router.post('/sendFeedback', middleware.wrap(async (req, res, next) => {
    let query = 'INSERT INTO feedback (user_id,title,text,timestamp) VALUES (?,?,?,?)'
    //'INSERT INTO SubSubCats ( imgReference, name, subCatId, Status) values (?, ?, ?, ?)'
    let values = [req.user.id, req.body.title, req.body.text, Date.now()]
    await sqldatahaku.querySql(query, values)
    res.end();
}));

router.get('/endUsers', middleware.wrap(async (req, res, next) => {
    let query = 'SELECT fname,lname FROM users WHERE userlvl = 2'
    //'INSERT INTO SubSubCats ( imgReference, name, subCatId, Status) values (?, ?, ?, ?)' wat
    result = await sqldatahaku.querySql(query)
    res.json(result);
}));

router.get('/getFeedback', middleware.wrap(async (req, res, next) => {
    let query = 'SELECT * FROM feedback'
    //'INSERT INTO SubSubCats ( imgReference, name, subCatId, Status) values (?, ?, ?, ?)' wat
    result = await sqldatahaku.querySql(query)
    res.json(result);
}));




module.exports = router
