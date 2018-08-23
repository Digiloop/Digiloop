const redis = require("async-redis");
const crypto = require("crypto");




const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {

    async setTimestamp() {
        await client.set("timestamppi", Date.now());
    },

    async getTimestamp() {
        const value = await client.get("timestamppi");
        return value;
    },

    async setEmailActivation(email) {
        //hash = await bcrypt.hash(email+Date.now(),1)
        const val = await crypto.randomBytes(30).toString('hex');
        urli = await client.set(`emailurl: ${email}`, val, 'NX', 'EX', 1200)
        // urli = await client.set(`emailurl: ${email}`, `${email}${Date.now()}`, 'NX', 'EX', 120)
    },

    async getEmailActivation(email) {
        const value = await client.get(`emailurl: ${email}`)
        return value
    },

    async delEmailActivation(email){
        await client.del(`emailurl: ${email}`)
    }



}