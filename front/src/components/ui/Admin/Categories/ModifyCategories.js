import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TextField, RaisedButton } from 'material-ui';
import { MenuItem, SelectField, Divider } from 'material-ui';
import { Table, TableBody, TableHeader } from 'material-ui/Table';
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ImageUploader from 'react-images-upload';

// fetchies
import { getCats, getSubCats, getFakeCats } from '../../../../utils/fetchcategories';
import { addNewCat, addNewSubCat, sendStatus, sendNewCatName } from '../../../../utils/sendAddCatsData';

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
            fakeCats: [],
            pictures: []
        }
        this.onDrop = this.onDrop.bind(this);
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

    handleSelectCatChange = (event, index, value) => {
        this.setState({ valueC: value });
        this.expand();
    };

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });        
    }

    // activate or deactivate category
    activate(id, status, type, y) {
        this.setState({
            id: id,
            type: type,
            status: !status
        }, function () {
            var statusData = {
                'catType': this.state.type,
                'Status': this.state.status,
                'id': this.state.id
            }
            sendStatus(statusData).then(() => { this.getCategories(), this.getSubCategories(), this.getFakeCategories() });
            this.close(y);
        });
    }

    // change name
    changeName(id, name, type, y) {
        if (this.state.newCatName === '') {
            this.setState({ newCatName: name })
        }
        this.setState({
            id: id,
            type: type,
            name: name
        }, function () {
            var renameData = {
                'catType': this.state.type,
                'name': this.state.newCatName,
                'id': this.state.id
            }
            sendNewCatName(renameData).then(() => { this.getCategories(), this.getSubCategories(), this.getFakeCategories() });
            this.setState({ newCatName: '' })
            console.log(renameData);
            this.close(y);
        });
    }

    // open row
    expand(x) {

        // close open ones
        for (let i = 0; i < this.state.rows.length; i++) {
            if (this.state.rows[i]) {
                this.state.rows[i] = false;
            }
        }

        // open new row
        this.state.rows[x] = true;
        this.setState({ rows: this.state.rows });
    }

    // close row
    close(x) {

        for (let i = 0; i < this.state.rows.length; i++) {
            if (this.state.rows[i]) {
                this.state.rows[i] = false;
            }
        }
        this.setState({ rows: this.state.rows });
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

        // loop subcategories
        for (let j = 0; j < this.state.subCats.length; j++) {
            if (this.state.rows[j]) {
                subCats.push(
                    <TableRow key={j} style={{ height: '150px' }} >
                        <TableRowColumn colSpan='3'>
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
                            {this.state.subCats[j].subName}
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='Muokkaa' />
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }

        // loop fakecategories
        for (let k = 0; k < this.state.fakeCats.length; k++) {
            if (this.state.rows[k]) {
                fakeCats.push(
                    <TableRow key={k} style={{ height: '150px' }} >
                        <TableRowColumn colSpan='3'>
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
                        </div>
                    </div>
                    <div className='pictures' style={{ float: 'left', width: '40%', marginTop: '12%' }}>

                        <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}                            
                        />
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default ModifyCategories;
