// Seppo D. was here.
var fs = require('fs');
module.exports = class misc {
    isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();

        res.end();
    }

    ifUserLevel(req, res, next) {

        if (req.user.userlvl <= 1)
            return next();

        res.end();
    }

    keyToArray(vals) {
        //here we transform keys from anything to array
        let arr = [];
        for (var key in vals) {
            arr.push(vals[key]);
        }
        return arr;
    }

    spliceArray(vals) {
        let arr = []
        let a = this.keyToArray(vals)
        for (var i = 0; i < a.length; i++) {
            arr.push(a.splice(0, 14))
        }
        //splice(0,14)
        return arr;
    }
    //takes 2 arrays and concats them together,func should take sqldatahaku.querySql function that does sql query which is the last parameter.
    fuseItemArray(array1, array2, array3, func, query) {
        //so this thing here loops trough all req.body data
        array1 = this.spliceArray(array1);
        for (var i = 0; i < array1.length; i++) {
            //console.log(this.spliceArray(array1[i]))
            let datum = Date.now();
            func(query, this.keyToArray(array1[i]).concat(array2).concat(datum + '_' + array3[i].name))
            this.imageAdd(array3[i], 2, datum + '_' + array3[i].name)
            console.log(array3[i].name)

        } // change req.body to array and fuse it with data from server.
    }

    loopityLoop(array1, func) {
        for (var i = 0; i < array1.length; i++) {
            if (this.checkValidLength(array1[i]) === true) {
                func(array1[i])
            }
            else { console.log('wtf') }
        }
    }

    //checks if inputted object has certain amount of elements
    checkValidLength(value, compare) {
        for (var i = 0; i < value.length; i++) {
            if ((Object.values(value[i]).length) == compare) {
                //console.log(true)
            } else
                return false;
        }
        return true;
    }

    checkValidValues(value) {
        //let a = value[0].city
        for (var i = 0; i < value.length; i++) {
            for (var key in value[i]) {
                if (value[key] == null || value[key] == undefined) {
                    console.log(value[key] + ' null or undefined');
                }
                else {
                    return true;
                }
            }
        }
    }

    //array value that will be returned = first argument, rest of the arguments are array[first argument]
    //returns all arrays with the first arguments value
    selector() {
        let all = []
        for (var i = 0; i < arguments.length - 1; i++) {
            all.push(arguments[i + 1][arguments[0]])
        }
        return all;
    }

    dateToday() {
        let datum = new Date();
        datum.setHours(datum.getHours() + 3);
        return datum.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    isAdmin(req) {
        if (req.user.userlvl == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }

    // Add's images. On the server. To be used. In the future.
    //select = categories,subcategories or user
    imageAdd(files, select, name) {
        // categories,subcategories,users
        if (name == 'undefined') {
            console.log('undefined picture')
        } else {


            let folder = this.selector(select, [`./kuvat/categories/${name}`, `./kuvat/subcategories/${name}`, `./kuvat/items/${name}`])

            // Use the mv() method to place the file somewhere on your server
            files.mv(folder[0], function (err) {
                if (err)
                    return res.status(500).send(err);
            })

        }

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