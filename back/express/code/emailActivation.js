var redis = require('../config/redisdb.js')
module.exports = {
    
async checkActivation(email,url){
result = await redis.getEmailActivation(email)

    if (url == result) {
        await redis.delEmailActivation(email)
        return 'aktivoitu'
    } else {
        console.log('fail '+ result)
        return false
    }
},

async sendActivation(email){
    console.log(email)
    email = await email
    await redis.setEmailActivation(email)
    const result = await redis.getEmailActivation(email)
    return result
},

}

/*



router.get(`/testi/:id`, middleware.wrap(async (req, res, next) => {
    console.log()
    
    
    if (parametrit == result) {
        await redis.delEmailActivation(req.user.id)
        res.json('aktivoitu')
    } else {
        console.log(result)
        res.json('ei toimi saatana')
    }

}));

router.post('/aktivaatio', middleware.wrap(async (req, res, next) => {
    await redis.setEmailActivation(req.user.id)
    const result = await redis.getEmailActivation(req.user.id)
    res.json(`Aktivointi osoite on kierratys.lamk.fi/${result}`)
}));
*/