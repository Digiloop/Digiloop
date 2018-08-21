const redis = require("async-redis");


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
        urli = await client.set(`emailurl: ${email}`, `${email}${Date.now()}`, 'NX', 'EX', 120)
    },

    async getEmailActivation(email) {
        const value = await client.get(`emailurl: ${email}`)
        return value
    },

    async delEmailActivation(email){
        await client.del(`emailurl: ${email}`)
    }



}