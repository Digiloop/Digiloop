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
    //takes 2 arrays and concats them together,func should take sqldatahaku.querySql function that does sql query which is the last parameter.
    fuseItemArray(array1, array2, func, query) {
        if (this.checkValidLength(array1, 14) === true) {
            //so this thing here loops trough all req.body data
            for (var i = 0; i < array1.length; i++) {
                func(query, this.keyToArray(array1[i]).concat(array2))
            } // change req.body to array and fuse it with data from server.
        }
        else { console.log('noup') }
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


    selectorThing(selector, arr1, arr2, arr3) {
        let ars1 = arr1[selector]
        let ars2 = arr2[selector]
        let ars3 = arr3[selector]
        return [ars1, ars2, ars3]
    }

    dateThing() {
        let datum = new Date();
        datum.setHours(datum.getHours() + 3);
        return datum.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    // Add's images. On the server. To be used. In the future.
    //select = categories,subcategories or user
    imageAdd(files, select) {
        // categories,subcategories,users
        folder = this.selectorThing(select, [`./kuvat/categories/${files.name}`, `./kuvat/subcategories/${files.name}`, `./kuvat/users/${files.name}`])
        console.log(files);
        /*var userfolder = `./kuvat/users/' + ${req.user.username}`;
        let categories = `./kuvat/categories/${files.name}`;
        let subcategories = `./kuvat/subcategories/${files.name}`;
        let users = `./kuvat/users/${files.name}`;
        let choice = [categories, subcategories, users]
        */
        console.log(folder[0]);
        /*
        if (!fs.existsSync(userfolder)) {

            fs.mkdirSync(userfolder);

        }
*/

        // Use the mv() method to place the file somewhere on your server
        files.mv(folder[0], function (err) {
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