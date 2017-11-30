exports.catquery = function (req, res, next) {
//ei vittu database query {
     res.locals.test = "queryResult";
     next();
// }
}
