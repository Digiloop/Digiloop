import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, FlatButton } from 'material-ui';
import { getCats, getSubCats } from '../../../utils/fetchcategories';
import { addNewCat, addNewSubCat } from '../../../utils/sendAddCatsData';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueR: 'catname',
            cat: '',
            cats: [],
            subCats: [],
            addCat: '',
            addSubCat: []
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
            'subcatname': this.state.addSubCat,
        }
        addNewSubCat(JSON.stringify(addSubCatName)).then(() => { this.getSubCategories() });
    }

    handleChange = event => {
        this.setState({ valueR: event.target.value });
        // console.log(event.target.value);

    };

    handleCatChange = event => {
        this.setState({ [event.target.cat]: event.target.value });
        console.log(event.target.cat);

    };

    componentDidMount() {
        this.getCategories();
        this.getSubCategories();
    }



    render() {
        const styles = theme => ({
            root: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            formControl: {
              margin: theme.spacing.unit,
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing.unit * 2,
            },
          });

        const cats = [];
        const subCats = [];
        console.log(this.state.cats);
        console.log(this.state.cats.length);
        console.log(this.state.subCats.length);
        console.log(this.state.subCats);

        for (let i = 0; i < this.state.cats.length; i++) {
            cats.push(
                <div value={this.state.cats[i].CatName} onClick={() =>
                    this.getCat(this.state.cats[i].CatId, this.state.cats[i].CatName)} key={i} >
                    <h3>{this.state.cats[i].CatName}</h3>
                </div>
            )
        }

        for (let j = 0; j < this.state.subCats.length; j++) {
            if (this.state.subCats[j].CatId === this.state.value) {
                subCats.push(
                    <div key={j} >
                        {this.state.subCats[j].subName}
                    </div>
                )
            }
        }

        return (
            <MuiThemeProvider>
                <div>
                    <div className='categories'>
                        <div className='cats' style={{ float: 'left', width: '50%', marginLeft: '2%' }}>
                            <div className='addCategory' >
                                <p className='addCatLabel'>Lisää kategoria</p>
                                <TextField className='addCatField'
                                    underlineShow={false}
                                    style={{ backgroundColor: 'white', border: '2px solid #004225' }}
                                    hintText='Uusi kategoria'
                                    onChange={(event, newValue) => this.setState({ addCat: newValue })}
                                />
                                <RadioGroup value={this.state.valueR} onChange={this.handleChange} >
                                    <FormControlLabel style={{ backgroundColor: 'white' }} value='catname'
                                        control={<Radio style={{ color: '#004225' }} />} label='Yläkategoria' />
                                    <FormControlLabel style={{ backgroundColor: 'white' }} value='subcatname'
                                        control={<Radio style={{ color: '#004225' }} />} label='Alakategoria' />
                                </RadioGroup>
                                <FormControl style={ styles.formControl }>
                                    <Select native style={{ width: '200px' }} value={this.state.value} onChange={this.handleCatChange} >
                                        <MenuItem value='Tieturva' >Tieturva</MenuItem>
                                        <MenuItem value='Turva' >Turva</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {/*<h1>Kategoriat</h1>{cats}*/}
                            <FlatButton
                                label='Lisää'
                                style={{ borderRadius: 25, marginTop: '10%' }}
                                backgroundColor={'#FFF'}
                                onClick={() => this.addCategory()}
                            />
                        </div>
                        <div className='subCat' style={{ float: 'right', width: '50%' }}>
                            {/*subCats.length !== 0 ? <div className='addSubCategory' >
                                <h1>{this.state.cat}-kategorian alakategoriat:</h1>
                                {subCats}{console.log(subCats.length)} <br />
                                <p className='addSubCatLabel'>Lisää alakategoria</p>
                                <TextField className='addSubCatField'
                                    underlineShow={false}
                                    style={{ backgroundColor: 'white', border: '2px solid #004225' }}
                                    hintText='Uusi alakategoria'
                                    onChange={(event, newValue) => this.setState({ addSubCat: newValue })}
                                />
                                <RaisedButton label='Lisää' onClick={() => this.addSubCategory()} />
        </div> : <div></div>*/}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default Categories;
