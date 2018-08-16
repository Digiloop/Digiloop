// Seppo D. was here.
var fs = require('fs');
module.exports = class misc {
    keyToArray(vals) {
        //here we transform keys from anything to array
        let arr = [];
        for (var key in vals) {
            arr.push(vals[key]);
        }
        return arr;
    }

    async spliceArray(vals, length) {
        let arr = []
        let result
        //let a = this.keyToArray(vals)
        for (var i = 0; i < vals.length; i++) {
            arr.push( await vals.splice(0, length))
        }
        //splice(0,14)
        result = await arr;

        return result
    }

    async createArray(array1, array2, array3, func, query, missing) {
        try {
            let arr = []
            let a = []

            /* jos ei toimi pistä takaisin päälle
            if (array3 == null) { 
                console.log('Ny on nullia täällä')
                array3 = await { name: 'tikituubailut' }
            } else {
                array3 = await array3
            }
            */


            //console.log(array3[Object.keys(array3)[0]].name)
            //console.log(Object.keys(array3))
            //console.log(array1)
            //console.log(array1)
            //await console.log(missing)
            await console.log('array1 ' + array1)
            await console.log('array2 ' + array2)
            await console.log('array3 ' + array3)
            //console.log(array2)
            //await console.log('missing ' + missing)
            // console.log(array2)
            //console.log(array1[0][0][0].charAt(0))
            //array3[Object.keys(array3)]
            //let missus = await missing.includes(array1[0][0][0].charAt(0))
            //console.log(missus + ' missus')
            //await console.log(typeof array1[0][0][0].charAt(0))
            //let keys = await Object.keys(array3).length

            //console.log(keys + ' keys')
            //console.log(array3[Object.keys(array3)[0]].name)
            //console.log(array3.name)
            //elikkäs kuvat ei menekkään oikein tulee sama kuva enemmän kuin yhtee
            for (let i = 0, j = 0; i < array1.length; i++) {
                if (await missing.includes(array1[i][0][0].charAt(0))) {
                    //console.log('if ' + i)
                    //console.log(array1.length)
                    a = await array1[i].concat(array2).concat([['pic', 'no pictoor']])
                    console.log(a)
                }
                else {
                    //await console.log('else ' + j)
                    let imgNames = await Date.now() + ' ' + j + ' ' + array3[Object.keys(array3)[j]].name
                    let filu = await array3[Object.keys(array3)[j]]
                    //array3[Object.keys(array3)[j]].name
                    //await console.log(filu) + console.log('itemadin filut')
                    await this.imageAdd(filu, 2, imgNames)
                    a = await array1[i].concat(array2).concat([['pic', imgNames]])
                    //a = await array1[i].concat(array2).concat([['pic','pictoor']])
                    j++
                }

                //await console.log(a)
                //console.log(a[4][1])
                //console.log(array1[i][1])


                for (let k = 0; k < a.length; k++) {
                    //console.log(a[j][1]+' -------'+j)
                    await arr.push(a[k][1])//.concat(array2))
                }

                //await console.log('if not done')
                //console.log(a)
            }
            //await console.log('if done')


            //return await this.spliceArray(arr,18)

            let finalArr = await this.spliceArray(arr, 19) // 20+ picturen kanssa 18 ilman

            for (let u = 0; u < array1.length; u++) {
                await func(query, finalArr[u])  //toimii
            }

            //return await arr

            await console.log(finalArr)


        } catch (error) {
            console.log(error)
        }
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

    // Add's images. On the server. To be used. In the future.
    //select = categories,subcategories or user
    async imageAdd(files, select, name) {
        // categories,subcategories,users
        if (await name == 'undefined') {
            console.log('undefined picture')
        } else {
            let folder = await this.selector(select, [`./kuvat/categories/${name}`, `./kuvat/subcategories/${name}`, `./kuvat/items/${name}`])
            //console.log(files);
            /*var userfolder = `./kuvat/users/' + ${req.user.username}`;
            let categories = `./kuvat/categories/${files.name}`;
            let subcategories = `./kuvat/subcategories/${files.name}`;
            let users = `./kuvat/users/${files.name}`;
            let choice = [categories, subcategories, users]
            */
            //console.log(folder[0]);
            /*
            if (!fs.existsSync(userfolder)) {

                fs.mkdirSync(userfolder);

            }
    */
            await console.log(files) //console.log('imageadin filut')
            // Use the mv() method to place the file somewhere on your server
            await files.mv(folder[0], function (err) {
                if (err)
                    return res.status(500).send(err);
            })

        }

    }

};
