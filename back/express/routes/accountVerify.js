var express = require('express');
var router = express.Router();
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var middleware = require('../code/middleware.js');
var emailActivation = require('../code/emailActivation')


router.get(`/activation/:url`, middleware.wrap(async (req, res, next) => {

    result = await emailActivation.checkActivation(req.user.email, req.params.url)

    if (result == false) {  
        res.status(410)
        res.end()
    } else {
        let query = 'UPDATE users SET Status = ? WHERE email = ?'
        let values = [1, req.user.email]
        await sqldatahaku.querySql(query,values)
        res.redirect('https://kierratys.lamk.fi/devclient')
    }
    res.end()
}));

/* 
router.post('/aktivaatio', middleware.wrap(async (req, res, next) => {
   result = await emailActivation.sendActivation(req.user.email)
   res.json(result)
}));
*/

router.get('/testia', middleware.wrap(async (req, res, next) => {
    let result = 2;
        if([1,2,3].indexOf(result) +1){
        console.log('1,2 tai 3')
    }else if(result == 4||result == 5){
        console.log('4 tai 5')
    }else {
        console.log('muu')
    }
    res.end()
    }));

module.exports = router