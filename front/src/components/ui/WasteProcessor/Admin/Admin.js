import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { getCats } from '../../../../utils/fetchcategories';
import { getSubCats } from '../../../../utils/fetchcategories';

class Admin extends Component {
constructor(props){
  super(props);
  this.state={
    value: '',
    cats: [],
    subCats: [],
    addCat: ''
  }
 }

 // fetch junk data
getCategories() {
  getCats().then((categories) => {
    // console.log(categories);
    this.setState({cats: (categories.category)});
    // this.props.catsToStore(categories.category);
  });
}

getSubCategories() {
  getSubCats().then((subCategories) => {
    // console.log(subCategories);
    this.setState({subCats: (subCategories.category)});
    // this.props.catsToStore(categories.category);
  });
}

getCat = (value) => {
  this.setState({
    value: value
  });
  console.log(this.state.value);
}

addCategory() {
  console.log(this.state.addCat);
}

componentDidMount() {
  this.getCategories();
  this.getSubCategories();
}



render() {

  const cats = [];
  const subCats = [];
  console.log(this.state.cats);
  console.log(this.state.cats.length);
  console.log(this.state.subCats.length);
  console.log(this.state.subCats);

  for(let i = 0; i < this.state.cats.length; i++){
    cats.push(
      <div value={this.state.cats[i].CatName} onClick={() =>
        this.getCat(this.state.cats[i].CatId)} key={i} >
        <h3>{this.state.cats[i].CatName}</h3>


        {/*<RaisedButton label="Muokkaa" />*/}
      </div>
    )
  }

  for(let j = 0; j < this.state.subCats.length; j++){
    if(this.state.subCats[j].CatId === this.state.value){
    subCats.push(
       <p key={j} >
        {this.state.subCats[j].subName}
      </p>
    )
    }
  }

    return (
      <MuiThemeProvider>
      <div>
        <div className='categories'>
          <h1>Nykyiset Kategoriat</h1>
            {cats} {subCats}
        </div>
        <div className='addCategory'>
          <p className='addCatLabel'>Lisää kategoria</p>
          <TextField className='addCatField'
          underlineShow={false}
          style={{ backgroundColor: 'white', border: '2px solid #004225'}}
          hintText='Uusi kategoria'
          onChange = {(event, newValue) => this.setState({addCat: newValue})}
        />
        <p>{this.state.addCat}</p>
        <RaisedButton label='Lisää' onClick={() => this.addCategory()} />
        </div>
      </div>
      </MuiThemeProvider>

    );
  }
}
export default Admin;
