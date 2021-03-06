import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TextField, FlatButton } from 'material-ui';
import { getCats, getSubCats, getFakeCats } from '../../../../utils/fetchCategories';
import { addNewFakeCat } from '../../../../utils/editCategories';
import { MenuItem, SelectField } from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';

import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
// import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

class FakeCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueC: '',
            valueSub: '',
            cat: '',
            cats: [],
            subCats: [],
            fakeCats: [],
            newCat: [],
            addFakeCat: '',
            addSubCat: [],
            rows: [],
            catError: false,
            catNameError: false,
            subCatError: false
        }
    }
    // fetch junk data
    getCategories() {
        getCats().then((categories) => {
            this.setState({ cats: (categories) });
        });
    }

    getSubCategories() {
        getSubCats().then((subCategories) => {
            this.setState({ subCats: (subCategories) });
        });
    }

    getFakeCategories() {
        getFakeCats().then((fakeCategories) => {
            this.setState({ fakeCats: (fakeCategories) });
        });
    }

    // value = Category CatId, cat = Category name
    getCat = (value, cat) => {
        this.setState({
            value: value,
            cat: cat
        });
    }

    // CatId = subCategory CatId, subCat = subCategory name
    getSubCat = (subCatId, subCatName) => {
        this.setState({
            subCatId: subCatId,
            subCatName: subCatName
        });
    }

    getSubCatName = (event) => {
    }

    // Add fakeCat
    addCats() {
        if (this.state.addFakeCat === '' || this.state.addFakeCat === null || this.state.addFakeCat === undefined) {
            this.setState({ catNameError: true });
        } else {
            if (this.state.valueC === '') {
                this.setState({ catError: true });
            }
            if (this.state.valueSub === '' || this.state.valueSub === undefined) {
                this.setState({ subCatError: true });
            } else {
                this.addFakeCategory();
                this.setState({ addFakeCat: '' })
            }
        }
    }

    // add fakecategory name and subCatId
    addFakeCategory() {
        var addFakeCatName = {
            'subCatId': this.state.subCatId,
            'name': this.state.addFakeCat,
        }
        addNewFakeCat(JSON.stringify(addFakeCatName)).then(() => { this.getFakeCategories() });
    }

    handleFakeCatFieldChange = event => {
        this.setState({
            addFakeCat: event.target.value,
            catNameError: false
        })
    };

    handleCatChange = (event, index, value) => {
        this.setState({ valueC: value, catError: false });
    };

    handleSubCatChange = (event, index, value) => {
        this.setState({ valueSub: value, subCatError: false });
    };

    // opening items
    expand(x) {
        // create a temp array, because it's easier to edit than the state one
        let newArray = this.state.rows;

        if (newArray[x]) { // closing the open item
            newArray[x] = false;
        } else { // opening another means first closing the open one
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i]) {
                    newArray[i] = false; // close the open one
                }
            }
            newArray[x] = true; // open the new row
        }
        // set the edited version as the new state
        this.setState({ rows: newArray });
    }

    handleClick = (event, data) => {
        console.log(data)
    };

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
                marginLeft: '2%',
                borderRadius: '5px'
            },
            button: {
                borderRadius: 25,
                marginTop: '10%',
                width: '50%'
            }
        };

        const muiTheme = getMuiTheme({}, {
            palette: {
                accent1Color: '#004225',
            },
        });

        const cats = [];
        const subCats = [];
        const fakeCats = [];

        // function for dynamic sorting
        /*function compareValues(key, order = 'asc') {
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
                    (order === 'desc') ? (comparison * -1) : comparison
                );
            };
        } */


        for (let i = 0; i < this.state.cats.length; i++) {
            cats.push(
                <MenuItem className='menuItems' onClick={() =>
                    this.getCat(this.state.cats[i].CatId, this.state.cats[i].CatName)}
                    key={i} value={this.state.cats[i].CatName}
                    primaryText={this.state.cats[i].CatName} />
            )
        }

        for (let i = 0; i < this.state.subCats.length; i++) {
            if (this.state.subCats[i].CatId === this.state.value) {
                subCats.push(
                    <MenuItem className='menuItems' onClick={() =>
                        this.getSubCat(this.state.subCats[i].subId, this.state.subCats[i].subName)} key={i}
                        value={this.state.subCats[i].subName}
                        primaryText={this.state.subCats[i].subName} />
                )
            }
        }

        for (let i = 0; i < this.state.fakeCats.length; i++) {
            // get category and subcategory names
            let tmp = [];
            let tmp1 = [];
            for (let j = 0; j < this.state.subCats.length; j++) {
                if (this.state.subCats[j].subId === this.state.fakeCats[i].subCatId) {
                    tmp = Object.assign(this.state.subCats[j], this.state.fakeCats[i])
                    // tmp.push(this.state.subCats[j].subName)

                    for (let k = 0; k < this.state.cats.length; k++) {
                        if (this.state.cats[k].CatId === this.state.subCats[j].CatId) {
                            tmp1 = Object.assign(tmp, this.state.cats[k])
                            // tmp1.push(this.state.cats[k].CatName)
                        }                        
                    }
                }
            }
            if (this.state.rows[i]) {
                fakeCats.push(
                    <TableRow key={i} style={{ height: '150px', backgroundColor: '#CCC' }}>
                        <TableCell colSpan='4'>
                            Pääkategoria:<br />
                            Alakategoria:<br />
                            Feikkikategoria:
                        </TableCell>
                        <TableCell colSpan='4'>
                            {tmp1.CatName}<br />
                            {tmp1.subName}<br />
                            {tmp1.name}
                        </TableCell>
                    </TableRow>
                )
            } else {
                fakeCats.push(
                    <TableRow key={i}
                        style={{ backgroundColor: '#FFF' }}
                        hover
                        onClick={() => this.expand(i)}                        >
                        <TableCell colSpan='8'>
                            {tmp1.CatName}  / {tmp1.name}
                        </TableCell>
                    </TableRow>
                )
            }
        }        

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div className='categories'>
                        <div className='cats' style={{ float: 'left', width: '30%', marginLeft: '2%' }}>
                            <div className='addFakeCategory' >
                                <div>
                                    {this.state.catNameError ?
                                        <p style={styles.errorStyle}>
                                            <ActionInfo color={'white'} />
                                            <b>Kategorian nimi ei saa olla tyhjä!</b> <br />
                                        </p>
                                        : <p></p>
                                    }
                                    <p className='addCatLabel'>Lisää feikkikategoria:</p>
                                    <TextField className='addFakeCatField'
                                        underlineShow={false}
                                        style={styles.textField}
                                        hintText='Uusi feikkikategoria'
                                        value={this.state.addFakeCat}
                                        onChange={this.handleFakeCatFieldChange}
                                    />
                                </div>
                                <div>
                                    {this.state.catError ?
                                        <p style={styles.errorStyle}>
                                            <ActionInfo color={'white'} />
                                            <b>Valitse kategoria.</b> <br />
                                        </p>
                                        : <p></p>
                                    }
                                    <SelectField
                                        hintText='Valitse kategoria'
                                        value={this.state.valueC}
                                        onChange={this.handleCatChange}
                                        style={styles.selectField}
                                        iconStyle={{ fill: '#004225' }}
                                    >
                                        {cats}
                                    </SelectField>
                                </div>
                                <div>
                                    {this.state.subCatError ?
                                        <p style={styles.errorStyle}>
                                            <ActionInfo color={'white'} />
                                            <b>Valitse alakategoria.</b> <br />
                                        </p>
                                        : <p></p>
                                    }
                                    <SelectField
                                        hintText='Valitse alakategoria'
                                        value={this.state.valueSub}
                                        onChange={this.handleSubCatChange}
                                        style={styles.selectField}
                                        iconStyle={{ fill: '#004225' }}
                                    >
                                        {subCats}
                                    </SelectField>
                                </div>
                            </div>
                            <FlatButton
                                label='Lisää'
                                style={styles.button}
                                backgroundColor={'#FFF'}
                                onClick={() => this.addCats()}
                            />
                        </div>
                        <Table className='subCat' style={{ float: 'left', width: '60%', marginLeft: '5%' }} >
                            <TableBody>
                                {fakeCats}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default FakeCategories;
