var bcrypt = require('bcrypt');
var generatePassword = require('password-generator');


module.exports = {

    async password() {

        let gen = await generatePassword(12, false)
        let hash = await bcrypt.hash(gen, 10)
        let info = {
            pass: gen,
            hashpass: hash
        }
        return info;
    }


}