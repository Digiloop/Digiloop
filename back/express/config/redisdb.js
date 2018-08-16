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
    }

}