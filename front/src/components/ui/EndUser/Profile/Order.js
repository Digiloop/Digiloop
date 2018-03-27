import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import History from './History.js'
import Checkbox from 'material-ui/Checkbox';
import Organization from './Organization.js'



import { getJunkCatData } from '../../../../utils/fetchcategories';

class Order extends Component {


constructor(props){
  super(props);
  //this.state = {value: ''};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.onChange = this.onChange.bind(this);

 }


handleChange = (event, index, value) => this.setState({value});
handleSubmit(event) {
  event.preventDefault();
  console.log({Jäte:this.state.value });
  alert('Jätteen tyyppi: ' + this.state.value);
}


handleChange(e) {
  this.setState({check: e.target.value})
}

// fetch junk data
getJunksData() {
 getJunkCatData().then((junks) => {
   console.log(junks);
//   this.props.itemsToStore(junks.category);

  // this.setState({ junks });


 });

 //console.log(typeof junks);
}

// the filter function, that leaves only the necessary stuff to be displayed

componentDidMount(){
 this.getJunksData(); // fetch data from backend
 // TODO somehow wait for datafetch before attempting filtering

}

onChange(e) {
  this.setState({ value: e.target.value });
}

updateCheck() {
  this.setState((oldState) => {
    return {
      checked: !oldState.checked,
    };
  });
}

render() {


const dropmenu = {width: 150, backgroundColor: '#FFFFFF', borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'};  // dropdownmenu leveys väri yms

const box = {    paddingTop:20,
    paddingBottom:20,
    color:'#fff',
    textAlign:'center',
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'};

    return (
<div className="Container">

        <form onSubmit={this.handleSubmit}>
        <div>
        <table name="tilaus">
        <tbody>


        <tr>
          <td>Hakuosoite</td>
          <td><TextField name="address"  style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Postinumero</td>
          <td><TextField name="zipcode" style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Postitoimipaikka</td>
          <td><TextField name="city" style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Puhelinnumero</td>
          <td><TextField name="phone" style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Nouto-ohje</td>
          <td><TextField name="pickup" rows={3} rowsMax={7} style={dropmenu}/></td>
        </tr>

        <tr>
          <td style={box}>Kotitalous</td>
          <td style={box}>Organisaatio</td>
        </tr>

        </tbody>
        </table>

        </div>
        </form>
        </div>
    );
  }
}
export default Order;
