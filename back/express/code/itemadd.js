module.exports = class itemAdd {
    constructor(body, files) {
        this.body = body
        this.bodyEntries = Object.entries(body)
        this.bodyKeys = Object.keys(body)
        this.bodyValues = Object.values(body)
        this.files = files
    }
    // let arr = Object.entries(req.body);
    //let arr2 = Object.keys(req.body)
    //sd

    //unique filter
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    //Amount of arrays received ---------------------------------------------
    numberOfItems() {
        let onlychar = []
        this.bodyKeys.forEach(element => {
            onlychar.push(element.charAt(0))
        })
        return onlychar.filter(this.onlyUnique);
    }

    //Arrays that miss image --------------------------------- imgval,undef,indexi
    missingImage() {

        let missingImg = []
        let result
        this.bodyEntries.forEach(([key, value], i = 0) => {
            i++
            if (key.includes('img')) {
                //
                missingImg.push(this.bodyEntries[i - 1].slice().concat([i - 1]))
            }
            //console.log(`${key} ${value}`); 

        });
        result = missingImg
        return result;
    }

    cleanArray() {

        let result
        let missing = this.missingImage()
        missing.forEach((element, i = 0) => {
            this.bodyEntries.splice(element[2] - i, 1)
            i++
        })
        result = this.bodyEntries
        return result;
    }

    onlyMissingImg() {
        let onlychar = []
        let result
        this.missingImage().forEach(element => {
            onlychar.push(element[0].charAt(0))
        })
        result = onlychar.filter(this.onlyUnique);
        return result
    }

    logFiles() {
        return this.files
    }

}