import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { MenuItem, SelectField } from 'material-ui';
import { Table, TableBody } from 'material-ui/Table';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import ImageUploader from 'react-images-upload';
import Divider from 'material-ui/Divider';

// fetchies
import { getCats, getSubCats, getFakeCats } from '../../../../utils/fetchCategories';
import { sendStatus, sendNewCatName, sendImage } from '../../../../utils/editCategories';
import { BASE_URL } from '../../../../settings';

class ModifyCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueC: 'cats', // current category selected

            cat: '',
            newCatName: '',
            newName: '',
            row: 0,

            categoryId: '',
            pictureAddress: '',
            categoryFolder: '',

            rows: [], // each row's open/close boolean as an array
            cats: [],
            subCats: [],
            fakeCats: [],
            pictures: null
        }
        this.onDrop = this.onDrop.bind(this);
        this.imageExists = this.imageExists.bind(this);
    }

    // fetch categories data
    // since categories are the default to be shown, initialize rows for them
    getCategories() {
        getCats().then((categories) => {

            let emptyRows = [];
            for (let i = 0; i < categories.length; i++) {
                emptyRows[i] = false;
            }
            this.setState({
                cats: categories,
                rows: emptyRows
            });

            //this.setState({ cats: (categories) });
        });
    }

    // fetch subcategories data
    getSubCategories() {
        getSubCats().then((subCategories) => {
            this.setState({ subCats: (subCategories) });
        });
    }

    // fetch fakecategories data
    getFakeCategories() {
        getFakeCats().then((fakeCategories) => {
            this.setState({ fakeCats: (fakeCategories) });
        });
    }

    // select category categoryType
    handleSelectCatChange = (event, index, value) => {

        // reset the rows to false and set it's length as the active cat categoryType's length
        let emptyRows = [];
        for (let i = 0; i < this.state[value].length; i++) {
            emptyRows[i] = false;
        }

        this.setState({
            valueC: value,
            pictureAddress: null,
            categoryId: null,
            rows: emptyRows
        });
        //this.close();
    };

    // picture
    onDrop(picture) {
        this.setState({
            pictures: picture[picture.length -1]
        });
    }

    // add image to category
    saveImage() {
        sendImage(this.state.pictures, this.state.categoryType, this.state.categoryId)
            .then(() => {
                this.getCategories();
                this.getFakeCategories()
            });
    }

    // delete picture
    deleteImage() {
        this.setState({
            pictures: null,
            pictureAddress: null
        })
        sendImage(this.state.pictureAddress, this.state.categoryType, this.state.categoryId, 1)
            .then(() => {
                this.getCategories();
                this.getFakeCategories()
            });
    }

    imageExists(image_url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status !== 404;
    }

    // Category id, pictureAddress address, rownumber, categoryType: 0=category 1=fakecategory
    getCat = (categoryId, pictureAddress, rownumber, categoryType) => {
        if (categoryType === 0) {
            this.setState({ categoryFolder: '/images/categories/' });
        } else {
            this.setState({ categoryFolder: '/images/subcategories/' });
        }
        this.setState({
            categoryId: categoryId,
            pictureAddress: pictureAddress,
            categoryType: categoryType
        }, function () {
            this.expand(rownumber);
        });
    }

    // activate or deactivate category
    activate(id, status, categoryType, rownumber) {
        this.setState({
            id: id,
            categoryType: categoryType,
            status: !status
        }, function () {
            let statusData = {
                'catType': this.state.categoryType,
                'Status': this.state.status,
                'id': this.state.id
            }

            sendStatus(statusData).then(() => { this.getCategories(); this.getSubCategories(); this.getFakeCategories() });
            this.expand(rownumber);
        });
    }

    // change name
    changeName(id, name, categoryType, rownumber) {
        if (this.state.newCatName === '') {
            this.setState({ newCatName: name })
        }
        this.setState({
            id: id,
            categoryType: categoryType,
            name: name
        }, function () {
            var renameData = {
                'catType': this.state.categoryType,
                'name': this.state.newCatName,
                'id': this.state.id
            }
            sendNewCatName(renameData)
                .then(() => {
                    this.getCategories();
                    this.getSubCategories();
                    this.getFakeCategories()
                });
            this.setState({ newCatName: '' })
            this.expand(rownumber);
        });
    }

    // open row
    expand(rownumber) {
        let updatedRows = this.state.rows;
        let prevState = this.state.rows[rownumber];

        // close open ones
        for (let i = 0; i < this.state.rows.length; i++) {
            if (this.state.rows[i]) {
                updatedRows[i] = false;
            }
        }
        // set the selected row to reverse
        updatedRows[rownumber] = !prevState;
        this.setState({ 
            rows: updatedRows,
            pictures: null
        });
    }



    componentDidMount() {
        this.getCategories();
        this.getSubCategories();
        this.getFakeCategories();
    }



    render() {
        const styles = {

            errorStyle: {
                marginTop: '1vh',
                padding: '1vh',
                fontWeight: 400,
                fontSize: '20px',
                color: 'white'
            },
            textField: {
                marginLeft: '2%',
                marginBottom: '10%',
                width: '100%',
                backgroundColor: 'white',
                border: '2px solid #004225',
                borderRadius: '10px'
            },
            selectField: {
                width: '100%',
                backgroundColor: 'white',
                fontFamily: 'kanit',
                textAlign: 'left',
                borderRadius: '5px'
            },
            button: {
                borderRadius: 25,
                marginTop: '10%',
                width: '30%',
                padding: 0
            },
            image: {
                height: '400px',
                width: '400px',
                objectFit: 'contain',
                border: '1px solid white'
            }
        };

        const muiTheme = getMuiTheme({}, {
            palette: {
                accent1Color: '#004225',
            }
        });

        const cats = [];
        const subCats = [];
        const fakeCats = [];


        // loop categories
        for (let i = 0; i < this.state.cats.length; i++) {
            if (this.state.rows[i]) {
                cats.push(
                    <TableRow key={i} style={{ height: '150px' }} >
                        <TableRowColumn colSpan='3'>
                            <TextField
                                className="ChangeCatName"
                                hintText="Kategorian nimi"
                                defaultValue={this.state.cats[i].CatName}
                                onChange={(event, newValue) => this.setState({ newCatName: newValue })}
                            /><br /><br />
                            <h3>Aktivoi / Deaktivoi kategoria:</h3>
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="Tallenna"
                                onClick={event => this.changeName(this.state.cats[i].CatId, this.state.cats[i].CatName, 0, i)} /><br /><br />
                            <RaisedButton label={this.state.cats[i].Status ? 'Deaktivoi' : 'Aktivoi'}
                                onClick={event => this.activate(this.state.cats[i].CatId, this.state.cats[i].Status, 0, i)} />
                        </TableRowColumn>
                    </TableRow>
                )
            } else {
                cats.push(
                    <TableRow key={i} >
                        <TableRowColumn colSpan='3' >
                            {this.state.cats[i].CatName}
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='Muokkaa' onClick={() => this.getCat(this.state.cats[i].CatId,
                                this.state.cats[i].ImgReference, i, 0)} />
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }

        // loop subcategories
        for (let j = 0; j < this.state.subCats.length; j++) {
            const tmp = [];
            for (let l = 0; l < this.state.cats.length; l++) {
                if (this.state.cats[l].CatId === this.state.subCats[j].CatId) {
                    tmp.push(this.state.cats[l].CatName)
                }
            }
            if (this.state.rows[j]) {
                subCats.push(
                    <TableRow key={j} style={{ height: '150px' }} >
                        <TableRowColumn colSpan='3'>
                            {tmp}<br />
                            <TextField
                                className="ChangeCatName"
                                hintText="Kategorian nimi"
                                defaultValue={this.state.subCats[j].subName}
                                onChange={(event, newValue) => this.setState({ newCatName: newValue })}
                            /><br /><br />
                            <h3>Aktivoi / Deaktivoi kategoria:</h3>
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="Tallenna"
                                onClick={event => this.changeName(this.state.subCats[j].subId, this.state.subCats[j].subName, 1, j)} /><br /><br />
                            <RaisedButton label={this.state.subCats[j].Status ? 'Deaktivoi' : 'Aktivoi'}
                                onClick={event => this.activate(this.state.subCats[j].subId, this.state.subCats[j].Status, 1, j)} />
                        </TableRowColumn>
                    </TableRow>
                )
            } else {
                subCats.push(
                    <TableRow key={j} >
                        <TableRowColumn colSpan='3'>
                            {tmp + ': ' + this.state.subCats[j].subName}
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='Muokkaa' onClick={() => this.getCat(this.state.subCats[j].subId, null, j, null)} />
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }

        // loop fakecategories
        for (let k = 0; k < this.state.fakeCats.length; k++) {
            // get category and subcategory names
            const tmp = [];
            const tmp1 = [];
            for (let j = 0; j < this.state.subCats.length; j++) {
                if (this.state.subCats[j].subId === this.state.fakeCats[k].subCatId) {
                    tmp.push(this.state.subCats[j].subName)

                    for (let l = 0; l < this.state.cats.length; l++) {
                        if (this.state.cats[l].CatId === this.state.subCats[j].CatId) {
                            tmp1.push(this.state.cats[l].CatName)
                        }
                    }
                }
            }

            if (this.state.rows[k]) {
                fakeCats.push(
                    <TableRow key={k} style={{ height: '150px', borderBottom: '1px solid black' }} >
                        <TableRowColumn colSpan='3'>
                            {tmp1 + ' / ' + tmp}<br />
                            <TextField
                                className="ChangeCatName"
                                hintText="Kategorian nimi"
                                defaultValue={this.state.fakeCats[k].name}
                                onChange={(event, newValue) => this.setState({ newCatName: newValue })}
                            /><br /><br />
                            <h3>Aktivoi / Deaktivoi kategoria:</h3>
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="Tallenna"
                                onClick={event => this.changeName(this.state.fakeCats[k].Id, this.state.fakeCats[k].name, 2, k)} /><br /><br />
                            <RaisedButton label={this.state.fakeCats[k].Status ? 'Deaktivoi' : 'Aktivoi'}
                                onClick={event => this.activate(this.state.fakeCats[k].Id, this.state.fakeCats[k].Status, 2, k)} />
                        </TableRowColumn>
                    </TableRow>
                )
            } else {
                fakeCats.push(
                    <TableRow key={k} >
                        <TableRowColumn colSpan='3'>
                            {tmp1 + ': '}{this.state.fakeCats[k].name}
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='Muokkaa' onClick={() => this.getCat(this.state.fakeCats[k].Id,
                                this.state.fakeCats[k].imgReference, k, 1)} />
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }


        // function for dynamic sorting
        function compareValues(key, order = 'asc') {
            return function (a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0;
                }

                const varA = (typeof a[key] === 'string') ?
                    a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ?
                    b[key].toUpperCase() : b[key];

                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                return (
                    (order == 'desc') ? (comparison * -1) : comparison
                );
            };
        }

        this.state.subCats.sort(compareValues('CatId'));
        // fakeCats.sort(compareValues('subCatId'));


        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div className='categories'>
                        <div className='cats' style={{ float: 'left', width: '36%', marginRight: '5%', marginLeft: '2%' }}>
                            <div className='modifyStatus' >
                                <h2>Muokkaa kategorioita</h2>
                                <p className='selectCatType'>Valitse kategoriatyyppi:</p>
                                <SelectField
                                    hintText='Valitse kategoriatyyppi'
                                    value={this.state.valueC}
                                    onChange={this.handleSelectCatChange}
                                    style={styles.selectField}
                                    iconStyle={{ fill: '#004225' }}
                                >
                                    <MenuItem value={'cats'} primaryText="Pääkategoriat" />
                                    <MenuItem value={'subCats'} primaryText="Alakategoriat" />
                                    <MenuItem value={'fakeCats'} primaryText="Feikkikategoriat" />
                                </SelectField>
                            </div>
                            <Table className='Cat' style={{ float: 'left', width: '100%' }}>
                                <TableBody displayRowCheckbox={false}>
                                    {
                                        (() => {
                                            switch (this.state.valueC) {
                                                case 'cats':
                                                    return cats;
                                                case 'subCats':
                                                    return subCats;
                                                case 'fakeCats':
                                                    return fakeCats;
                                                default:
                                                    return cats;
                                            }
                                        })()
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className='pictures' style={{ float: 'left', width: '40%', marginTop: '8%' }}>
                        {this.state.valueC !== 'subCats' && this.state.categoryId ?
                            <div>


                                <div>
                                    <h2>Lisää kuva</h2>

                                    <div>
                                        

                                        {this.state.pictures != null ? 
                                            <img src={URL.createObjectURL(this.state.pictures)} />
                                            : (this.imageExists(BASE_URL + this.state.categoryFolder + this.state.pictureAddress) ? 
                                                <img style={styles.image} src={BASE_URL + this.state.categoryFolder + this.state.pictureAddress} /> 
                                                : <p style={{width: '90px'}}>Ei valittua kuvaa</p>)
                                        }

                                        

                                    </div>

                                </div>

                                <div>
                                    <FlatButton
                                        label='Poista kuva'
                                        style={styles.button}
                                        backgroundColor={'#FFF'}
                                        onClick={() => this.deleteImage()}
                                    />

                                    <ImageUploader
                                        withIcon={false}
                                        withLabel={false}
                                        withPreview={false}
                                        buttonText='Valitse kuva'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                    <FlatButton
                                        label='Tallenna'
                                        style={styles.button}
                                        backgroundColor={'#FFF'}
                                        onClick={() => this.saveImage()}
                                    />
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default ModifyCategories;
