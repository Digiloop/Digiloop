exports.catquery = function (req, res, next) {
// database query {
     res.locals.test = "queryResult";
     next();
// }
}
