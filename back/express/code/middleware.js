module.exports = {
    isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();

        res.end();
    },

    ifUserLevel(req, res, next) {

        if (req.user.userlvl <= 1)
            return next();

        res.end();
    },

    isAdmin(req, res, next) {
        if (req.user.userlvl == 0)
            return next();

        res.end()
    },

    logIp(req, res, next) {
        let ip = req.ip;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        console.log('ip ' + ip);
        return next()
    }


}