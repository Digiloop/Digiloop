import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TextField, RaisedButton } from 'material-ui';
import { MenuItem, SelectField, Divider } from 'material-ui';
import { Table, TableBody, TableHeader } from 'material-ui/Table';
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

// fetchies
import { getCats, getSubCats, getFakeCats } from '../../../../utils/fetchcategories';
import { addNewCat, addNewSubCat } from '../../../../utils/sendAddCatsData';

class ModifyCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueC: 'cats',
            cat: '',
            newCatName: '',
            newName: '',
            row: 0,
            rows: [],
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
        this.expand();
    };

    // activate or deactivate category
    activate(id, status) {
        this.setState({
            id: id,
            status: status
        });
        console.log(this.state.id + ' ' + this.state.status);

        if (this.state.status === 1) {

        } else {

        }

    }

    updateField(fieldName, newValue) {
        this.setState({
            [fieldName]: newValue
        }, function () {
            console.log(this.state.fieldName);
        })
    }

    changeName(id, name) {
        this.setState({
            id: id,
            name: name
        }, function() {
            this.expand()
        });
        console.log(this.state.id + ' ' + this.state.name);
    }

    // opening items
    expand(x) {
        // create a temp array, because it's easier to edit than the state one
        let newArray = this.state.rows;

        // opening another means first closing the open one
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i]) {
                newArray[i] = false; // close the open one
            }
        }
        newArray[x] = true; // open the new row

        // set the edited version as the new state
        this.setState({ rows: newArray });
        console.log(this.state.rows);
        

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
        console.log(this.state.cats);
        console.log(this.state.subCats);
        console.log(this.state.fakeCats);

        for (let i = 0; i < this.state.cats.length; i++) {
            if (this.state.rows[i]) {
                cats.push(
                    <TableRow key={i} style={{ height: '200px' }} >
                        <TableRowColumn colSpan='2'>
                            <TextField
                                className="ChangeFakeCatName"
                                hintText="Kategorian nimi"
                                defaultValue={this.state.cats[i].CatName}
                                onChange={(event, newValue) => this.setState({ newCatName: newValue })}
                            />
                        </TableRowColumn>
                        <TableRowColumn colSpan='2'>
                            <RaisedButton label="Tallenna"
                                onClick={event => this.changeName(this.state.cats[i].CatId, this.state.cats[i].CatName)} />
                            <RaisedButton label={this.state.cats[i].Status ? 'Deaktivoi' : 'Aktivoi'}
                                onClick={event => this.activate(this.state.cats[i].CatId, this.state.cats[i].Status)} />
                        </TableRowColumn>
                    </TableRow>
                )
            } else {
                cats.push(
                    <TableRow key={i} >
                        <TableRowColumn colSpan='3'>
                            {this.state.cats[i].CatName}
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='Muokkaa' />
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }

        /*for (let i = 0; i < this.state.cats.length; i++) {
            cats.push(
                <TableRow key={i} >
                    <TableRowColumn colSpan='2'>
                        <TextField
                            className="ChangeCatName"
                            hintText="Kategorian nimi"
                            defaultValue={this.state.cats[i].CatName}
                            onChange={(event, newValue) => this.setState({ newName: newValue })}
                        />
                    </TableRowColumn>
                    <TableRowColumn colSpan='2'>
                        <RaisedButton label="Tallenna"
                            onClick={event => this.changeName(this.state.cats[i].CatId, this.state.cats[i].CatName)} />
                        <RaisedButton label={this.state.cats[i].Status ? 'Deaktivoi' : 'Aktivoi'}
                            onClick={event => this.activate(this.state.cats[i].CatId, this.state.cats[i].Status)} />
                    </TableRowColumn>
                </TableRow>
            )
        } */

        for (let j = 0; j < this.state.subCats.length; j++) {
            subCats.push(
                <TableRow key={j} >
                    <TableRowColumn colSpan='2'>
                        <TextField
                            className="ChangeSubCatName"
                            hintText="Kategorian nimi"
                            defaultValue={this.state.subCats[j].subName}
                            onChange={(event, newValue) => this.setState({ newName: newValue })}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="Tallenna"
                            onClick={event => this.changeName(this.state.subCats[j].subId, this.state.subCats[j].subName)} />
                        <RaisedButton label={this.state.subCats[j].Status ? 'Deaktivoi' : 'Aktivoi'}
                            onClick={event => this.activate(this.state.subCats[j].subId, this.state.subCats[j].Status)} />
                    </TableRowColumn>
                </TableRow>
            )
        }

        for (let k = 0; k < this.state.fakeCats.length; k++) {
            if (this.state.rows[k]) {
                fakeCats.push(
                    <TableRow key={k} style={{ height: '200px' }} >
                        <TableRowColumn colSpan='2'>
                            <TextField
                                className="ChangeFakeCatName"
                                hintText="Kategorian nimi"
                                defaultValue={this.state.fakeCats[k].name}
                                onChange={(event, newValue) => this.setState({ newName: newValue })}
                            />
                        </TableRowColumn>
                        <TableRowColumn colSpan='2'>
                            <RaisedButton label="Tallenna"
                                onClick={event => this.changeName(this.state.fakeCats[k].Id, this.state.fakeCats[k].name)} />
                            <RaisedButton label={this.state.fakeCats[k].Status ? 'Deaktivoi' : 'Aktivoi'}
                                onClick={event => this.activate(this.state.fakeCats[k].Id, this.state.subCats[k].Status)} />
                        </TableRowColumn>
                    </TableRow>
                )
            } else {
                fakeCats.push(
                    <TableRow key={k} >
                        <TableRowColumn colSpan='3'>
                            {this.state.fakeCats[k].name}
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='Muokkaa' />
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }


        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div className='categories'>
                        <div className='cats' style={{ float: 'left', width: '46%', marginRight: '2%', marginLeft: '2%' }}>
                            <div className='modifyStatus' >
                                <h2>Aktivoi/Deaktivoi kategoria</h2>
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
                            <Table className='Cat' style={{ float: 'left', width: '100%' }} onCellClick={rowNumber => this.expand(rowNumber)} >
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
