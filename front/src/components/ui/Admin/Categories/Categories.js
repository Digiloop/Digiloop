import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Table, TableBody } from 'material-ui/Table';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { TextField, FlatButton } from 'material-ui';
import { getCats, getSubCats } from '../../../../utils/fetchCategories';
import { addNewCat, addNewSubCat } from '../../../../utils/editCategories';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { MenuItem, SelectField } from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueR: 'catname',
            valueC: '',
            cat: '',
            cats: [],
            subCats: [],
            allCats: [],
            addCat: '',
            addSubCat: [],
            catError: false,
            catNameError: false
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

    // value = Category CatId, cat = Category name
    getCat = (value, cat) => {
        this.setState({
            value: value,
            cat: cat
        });
    }

    // Add Cat or SubCat checker
    addCats() {
        if (this.state.addCat === '' || this.state.addCat === null || this.state.addCat === undefined) {
            this.setState({ catNameError: true });
        } else {
            if (this.state.valueR === 'subcatname') {
                if (this.state.valueC === '') {
                    this.setState({ catError: true });
                } else {
                    this.addSubCategory();
                    this.setState({ addCat: '' })
                }
            } else {
                this.addCategory();
                this.setState({ addCat: '' })
            }
        }
    }

    // Add Category name
    addCategory() {
        var addCatName = {
            'catname': this.state.addCat
        }
        addNewCat(JSON.stringify(addCatName)).then(() => { this.getCategories() });
    }

    // Add SubCategory name
    addSubCategory() {
        var addSubCatName = {
            'catid': this.state.value,
            'subcatname': this.state.addCat,
        }
        addNewSubCat(JSON.stringify(addSubCatName)).then(() => { this.getSubCategories() });
    }

    handleCatFieldChange = event => {
        this.setState({
            addCat: event.target.value,
            catNameError: false
        })
    };

    // handles radiobutton
    handleChange = event => {
        this.setState({ valueR: event.target.value });

    };

    handleCatChange = (event, index, value) => {
        this.setState({ valueC: value, catError: false });
    };


    componentDidMount() {
        this.getCategories();
        this.getSubCategories();
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
            radio: {
                marginLeft: '2%',
                backgroundColor: 'white',
                width: '100%'
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
        const showCats = [];
        const subCats = [];

        for (let i = 0; i < this.state.cats.length; i++) {
            cats.push(
                <MenuItem className='menuItems' onClick={() =>
                    this.getCat(this.state.cats[i].CatId, this.state.cats[i].CatName)}
                    key={i} value={this.state.cats[i].CatName}
                    primaryText={this.state.cats[i].CatName} />
            )
        }

        for (let k = 0; k < this.state.cats.length; k++) {
            showCats.push(
                <TableRow key={k} value={this.state.cats[k].CatName} >
                    <TableRowColumn>
                        {this.state.cats[k].CatName}
                    </TableRowColumn>
                </TableRow>
            )
        }


        for (let j = 0; j < this.state.subCats.length; j++) {
            if (this.state.subCats[j].CatId === this.state.value) {
                subCats.push(
                    <TableRow key={j} >
                        <TableRowColumn>
                            {this.state.subCats[j].subName}
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }


        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ width: '100%', marginTop: '2%' }}>
                    <div className='cats' style={{ float: 'left', width: '30%', marginRight: '5%', marginLeft: '2%' }}>
                        <div className='addCategory' >
                            <div>
                                {this.state.catNameError ?
                                    <p style={styles.errorStyle}>
                                        <ActionInfo color={'white'} />
                                        <b>Kategorian nimi ei saa olla tyhjä!</b> <br />
                                    </p>
                                    : <p></p>
                                }
                                <p className='addCatLabel'>Lisää kategoria:</p>
                                <TextField className='addCatField'
                                    underlineShow={false}
                                    style={styles.textField}
                                    hintText='Uusi kategoria'
                                    value={this.state.addCat}
                                    onChange={this.handleCatFieldChange}
                                />
                            </div>
                            <RadioGroup
                                value={this.state.valueR}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel style={styles.radio} value='catname'
                                    control={<Radio style={{ color: '#004225' }} />} label='Yläkategoria' />
                                <FormControlLabel style={styles.radio} value='subcatname'
                                    control={<Radio style={{ color: '#004225' }} />} label='Alakategoria' />
                            </RadioGroup>
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
                                </SelectField></div>
                        </div>
                        <FlatButton
                            label='Lisää'
                            style={styles.button}
                            backgroundColor={'#FFF'}
                            onClick={() => this.addCats()}
                        />
                    </div>
                    <Table className='Cat' style={{ width: '20%', position: 'absolute', marginTop: '3%' }}
                        onCellClick={(r) => this.getCat(this.state.cats[r].CatId, this.state.cats[r].CatName)} >
                        <TableBody displayRowCheckbox={false}>
                            {showCats}
                        </TableBody>
                    </Table>
                    <Table className='subCat' style={{ width: '30%', marginTop: '2.5%', marginLeft: '40%' }}>
                        <TableBody displayRowCheckbox={false}>
                            {subCats}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default Categories;
