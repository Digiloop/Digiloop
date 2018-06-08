import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TextField, FlatButton } from 'material-ui';
import { getCats, getSubCats, getFakeCats } from '../../../../utils/fetchCategories';
import { addNewFakeCat } from '../../../../utils/editCategories';
import { MenuItem, SelectField } from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

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
        // this.setState({ subCatId: subCatId })
        console.log(event.target.value);
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
            if (this.state.rows[i]) {
                const tmp = [];
                const tmp1 = [];
                for (let j = 0; j < this.state.subCats.length; j++) {
                    if (this.state.subCats[j].subId === this.state.fakeCats[i].subCatId) {
                        tmp.push(this.state.subCats[j].subName)

                        for (let k = 0; k < this.state.cats.length; k++) {
                            if (this.state.cats[k].CatId === this.state.subCats[j].CatId) {
                                tmp1.push(this.state.cats[k].CatName)

                            }
                        }
                    }
                }
                fakeCats.push(
                    <TableRow key={i} style={{ height: '150px' }}>
                        <TableRowColumn colSpan='4'>
                            Pääkategoria:<br />
                            Alakategoria:<br />
                            Feikkikategoria:
                        </TableRowColumn>
                        <TableRowColumn colSpan='4'>
                            {tmp1}<br />
                            {tmp}<br />
                            {this.state.fakeCats[i].name}
                        </TableRowColumn>
                    </TableRow>
                )
            } else {
                fakeCats.push(
                    <TableRow key={i} >
                        <TableRowColumn colSpan='8'>
                            {this.state.fakeCats[i].name}
                        </TableRowColumn>
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
                        <Table className='subCat' style={{ float: 'left', width: '60%', marginLeft: '5%' }} onCellClick={rowNumber => this.expand(rowNumber)}>
                            <TableBody displayRowCheckbox={false}>
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
