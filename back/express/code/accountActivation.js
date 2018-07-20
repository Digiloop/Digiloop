var sqldata = require('../code/sqldata.js'); var sqldatahaku = new sqldata;
var maileri = require('../code/mailer.js');
var passgen = require('../code/passGen')
module.exports = {

        async activate(id) {
                let password = await passgen.password();
                let query = 'UPDATE users SET Status = ? WHERE id = ?'
                let values = [1, id]
                await sqldatahaku.querySql(query, values)

                let query2 = 'UPDATE users SET password = ? WHERE id = ?'
                let values2 = [password.hashpass, id]
                await sqldatahaku.querySql(query2, values2)

                let userinfo = await sqldatahaku.querySql('SELECT * FROM users WHERE id = ?', [id])
                await maileri.mail(userinfo[0].email, password.pass)
                //console.log(userinfo[0].email+'pass '+password.pass)
        },


        async deactivate(id) {
                let query = 'UPDATE users SET Status = ? WHERE id = ?'
                let values = [0, id]
                await sqldatahaku.querySql(query, values)
        },

        async select(choice, id) {
                if (choice == 0) {
                        this.deactivate(id)
                } else if (choice == 1) {
                        this.activate(id)
                } else {
                        console.log('did not work')
                }
        }
}