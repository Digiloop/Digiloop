import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { getCats, getSubCats } from '../../../utils/fetchCategories';
import { addNewCat, addNewSubCat } from '../../../utils/editCategories';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cat: '',
      cats: [],
      subCats: [],
      addCat: '',
      addSubCat: [],
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
      // console.log(subCategories);
      this.setState({ subCats: (subCategories) });
      // this.props.catsToStore(categories.category);
    });
  }

  // value = Category CatId, cat = Category name
  getCat = (value, cat) => {
    this.setState({
      value: value,
      cat: cat
    });
    // console.log(this.state.cat);
  }

  // Add Category name
  addCategory() {
    var addCatName = {
      'catname': this.state.addCat
    }
    addNewCat(JSON.stringify(addCatName)).then(() => {this.getCategories()});
  }

  // Add SubCategory name
  addSubCategory() {
    var addSubCatName = {
      'catid': this.state.value,
      'subcatname': this.state.addSubCat,
    }
    addNewSubCat(JSON.stringify(addSubCatName)).then(() => {this.getSubCategories()});
  }

  componentDidMount() {
    this.getCategories();
    this.getSubCategories();
  }



  render() {

    const cats = [];
    const subCats = [];
    // console.log(this.state.cats);
    // console.log(this.state.cats.length);
    // console.log(this.state.subCats.length);
    // console.log(this.state.subCats);

    for (let i = 0; i < this.state.cats.length; i++) {
      cats.push(
        <div value={this.state.cats[i].CatName} onClick={() =>
          this.getCat(this.state.cats[i].CatId, this.state.cats[i].CatName)} key={i} >
          <h3>{this.state.cats[i].CatName}</h3>


          {/*<RaisedButton label="Muokkaa" />*/}
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
            <div className='cats' style={{ float: 'left', width: '50%' }}>
              <h1>Kategoriat</h1>{cats}
              <div className='addCategory' >
                <p className='addCatLabel'>Lisää kategoria</p>
                <TextField className='addCatField'
                  underlineShow={false}
                  style={{ backgroundColor: 'white', border: '2px solid #004225' }}
                  hintText='Uusi kategoria'
                  onChange={(event, newValue) => this.setState({ addCat: newValue })}
                />
                <RaisedButton label='Lisää' onClick={() => this.addCategory()} />
              </div>
            </div>
            <div className='subCat' style={{ float: 'right', width: '50%' }}>
              {subCats.length !== 0 ? <div className='addSubCategory' >
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
              </div> : <div></div>}
            </div>
          </div>
        </div>
      </MuiThemeProvider>

    );
  }
}
export default Admin;
