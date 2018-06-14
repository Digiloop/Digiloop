module.exports = class itemAdd {
    constructor(body,files) {
        this.body = body
        this.bodyEntries = Object.entries(body)
        this.bodyKeys = Object.keys(body)
        this.bodyValues = Object.values(body)
        this.files = files
    }
    // let arr = Object.entries(req.body);
    //let arr2 = Object.keys(req.body)


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
        this.bodyEntries.forEach(([key, value], i = 0) => {
            i++
            if (key.includes('img')) {
                //
                missingImg.push(this.bodyEntries[i - 1].slice().concat([i - 1]))
            }
            //console.log(`${key} ${value}`); 
            
        });
        return missingImg;
    }
 
    cleanArray() {
        this.missingImage().forEach((element, i = 0) => {
            this.bodyEntries.splice(element[2] - i, 1)
            i++
        })
        return this.bodyEntries;
    }

    onlyMissingImg() {
        let onlychar = []
        this.missingImage().forEach(element => {
            onlychar.push(element[0].charAt(0))
        })
        return onlychar.filter(this.onlyUnique);
    }

    logFiles() {
        return this.files
    }

}