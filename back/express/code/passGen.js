var bcrypt = require('bcrypt');
var generatePassword = require('password-generator');
var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;

module.exports = {

    async password() {

        let gen = await generatePassword(12, false)
        let hash = await bcrypt.hash(gen, 10)
        let info = {
            pass: gen,
            hashpass: hash
        }
        return info;
    },

    async changePassword(id, password, oldpassword, hashpass) {

        let query = 'UPDATE users SET password = ? WHERE id = ?'
        let compareAsync = await bcrypt.compare(oldpassword, hashpass)
        await console.log(compareAsync)
        if (compareAsync) {
            let newpass = await bcrypt.hash(password, 10)
            let values = await [newpass, id]
            await sqldatahaku.querySql(query, values)
        } else {
            return false;
        }

    }

}