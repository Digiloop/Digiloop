module.exports = class misc {
isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.end();
}

keyToArray(vals) {
    //here we transform keys from req.body to array
    let arr = [];
    for (var key in vals) {
       arr.push(vals[key]);
    }
    return arr;
    }

fuseItemArray(array1,array2,func,query) {
    let arr = [];
    //so this thing here loops trough all req.body data
    for (var i = 0; i < array1.length; i++) {
        func(query,this.keyToArray(array1[i]).concat(array2)) // change req.body to array and fuse it with data from back
    }
}

};

