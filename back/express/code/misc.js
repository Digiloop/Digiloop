// Seppo D. was here.
var fs = require('fs');
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
    //takes 2 arrays and concats them together,func should take sqldatahaku.querySql function that does sql query which is the last parameter query.
    fuseItemArray(array1, array2, func, query) {
        let arr = [];
        //so this thing here loops trough all req.body data
        for (var i = 0; i < array1.length; i++) {
            func(query, this.keyToArray(array1[i]).concat(array2)) // change req.body to array and fuse it with data from server.
        }
    }

    // Add's images. On the server. To be used. In the future.
    //select = categories,subcategories or user
    imageAdd(files, select) {

            console.log(files);
            //var userfolder = `./kuvat/users/' + ${req.user.username}`;
            let categories = `./kuvat/categories/${files.name}`;
            console.log(categories);
            /*
            if (!fs.existsSync(userfolder)) {

                fs.mkdirSync(userfolder);

            }
*/

            // Use the mv() method to place the file somewhere on your server
            console.log(categories);
            files.mv(categories, function (err) {
                if (err)
                    return res.status(500).send(err);
            })

 

    }

};





// this code has been commented out, because it probably did not work. <-- it was commented out because it works but is not used here.
/*       if (req.files) {

    var picture = req.files.picture;
    var userfolder = `./kuvat/users/' + ${req.user.username}`;

    if (!fs.existsSync(userfolder)) {

        fs.mkdirSync(userfolder);

    }

    var filepath = './kuvat/' + req.user.username + '/' + Date.now() + '.' + picture.name.split('.').pop();

    // Use the mv() method to place the file somewhere on your server

    picture.mv(filepath, function (err) {
        if (err)
            return res.status(500).send(err);
    })

};

*/