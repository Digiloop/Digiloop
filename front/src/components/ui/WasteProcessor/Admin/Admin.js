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
import { getJunkCatData } from '../../../../utils/fetchcategories';

class Admin extends Component {
constructor(props){
  super(props);
  this.state={
    value: '',
    cats: [],
    addCat: ''
  }
 }

 // fetch junk data
getCategories() {
  getJunkCatData().then((categories) => {
    console.log(categories);
    this.setState({cats: (categories.category)});
    // this.props.catsToStore(categories.category);
  });
}

getCat = (value) => {
  this.setState({
    value: value
  });
  console.log(this.state.value);
}

addCategory(event) {
  console.log(this.state.addCat);
}

componentDidMount() {
  this.getCategories();
}



render() {

  const cats = [];
  console.log(this.state.cats);
  console.log(this.state.cats.length);

  for(let i = 0; i < this.state.cats.length; i++){
    cats.push(
      <p value={this.state.cats[i].CatName} onClick={() =>
        this.getCat(this.state.cats[i].CatName)} key={i} >
        {this.state.cats[i].CatName}
        {/*<RaisedButton label="Muokkaa" />*/}
      </p>
    )
  }

    return (
      <MuiThemeProvider>
        <div className='categories'>
          <h1>Nykyiset Kategoriat</h1>
            {cats}
        </div>
        <div className='addCategory'>
          <p className='addCatLabel'>Lisää kategoria</p>
          <TextField className='addCatField'
          underlineShow={false}
          style={{ backgroundColor: 'white', border: '2px solid #004225'}}
          hintText='Uusi kategoria'
          /*onChange = {(event, newValue) => this.setState({addCat: newValue})}*/
        />
        <p>{this.state.addCat}</p>
        <RaisedButton label='Lisää' onClick={() => this.addCategory()} />
        </div>
      </MuiThemeProvider>

    );
  }
}
export default Admin;
