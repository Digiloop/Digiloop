import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppBar, Drawer, Menu } from 'material-ui';
import { Toolbar, Tabs, Tab } from 'material-ui';
import { TextField, FlatButton } from 'material-ui';
import { getCats, getSubCats, getFakeCats } from '../../../../utils/fetchcategories';
import { addNewCat, addNewSubCat } from '../../../../utils/sendAddCatsData';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { MenuItem, DropDownMenu, SelectField } from 'material-ui';
import { Table, TableBody, TableHeader } from 'material-ui/Table';
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class ModifyCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueC: 'cats',
            cat: '',
            cats: [],
            subCats: [],
            fakeCats: []
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

    handleCatFieldChange = event => {
        this.setState({
            addCat: event.target.value
        })
    };

    handleSelectCatChange = (event, index, value) => {
        this.setState({ valueC: value });
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
                <div className='Items' key={i}>
                    {this.state.cats[i].CatName} </div>
            )
        }

        /* for (let i = 0; i < this.state.cats.length; i++) {
            showCats.push(
                <table value={this.state.cats[i].CatName} >
                    <tbody><tr onClick={() =>
                        this.getCat(this.state.cats[i].CatId, this.state.cats[i].CatName)}>
                        <td key={i}>{this.state.cats[i].CatName}</td></tr></tbody></table>
            )
        } */


        for (let j = 0; j < this.state.subCats.length; j++) {
            subCats.push(
                <div key={j} >
                    {this.state.subCats[j].subName}
                </div>
            )
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
                        <div className='cats' style={{ float: 'left', width: '30%', marginRight: '5%', marginLeft: '2%' }}>
                            <div className='modifyStatus' >
                                <h2>Poista kategoria käytöstä</h2>
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
                            <Table className='Cat' style={{ float: 'left', width: '100%' }} onCellClick={rowNumber => this.expand(rowNumber)}>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.valueC === 'cats' ? <div>{cats}</div> : <div></div>}
                                    {this.state.valueC === 'subCats' ? <div>{subCats}</div> : <div></div>}
                                    {this.state.valueC === 'fakeCats' ? <div>{fakeCats}</div> : <div></div>}
                                </TableBody>
                            </Table>
                            <div className='subCat' style={{ float: 'left', width: '30%' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default ModifyCategories;
