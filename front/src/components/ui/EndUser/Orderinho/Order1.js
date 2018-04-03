import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import Checkbox from 'material-ui/Checkbox';

import { getCats } from '../../../../utils/fetchcategories';

class Order extends Component {
constructor(props){
  super(props);
  this.state = {value: ''};
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
 getCats().then((junks) => {
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



    return (
<div className="Container">
  <p> * merkityt kentät ovat pakollisia</p>

        <form onSubmit={this.handleSubmit}>
        <div>
        <table name="tilaus">
        <tbody>


        <tr>
          <td>Hakuosoite*</td>
          <td><TextField name="address"  style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Postinumero*</td>
          <td><TextField name="zipcode" style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Postitoimipaikka*</td>
          <td><TextField name="city" style={dropmenu}/></td>
        </tr>
        <tr>
          <td>Puhelinnumero</td>
          <td><TextField name="phone"  style={dropmenu}/></td>
        </tr>
        </tbody>
        </table>

        <Checkbox
          label="Hyväksyn käyttöehdot ja vakuutan tiedot oikeiksi"
          checked={this.state.checked}
          onCheck={this.updateCheck.bind(this)}
        />

          <TextField
  disabled={true}
  defaultValue="Luovutan omaisuuteni tikituuballe ja menetän sieluni saatanalle.
  Käyttöehtoja voidaan muokata mielivaltaisesti hyväksymisen jälkeen."
  multiLine={true}
  rows={4}
  rowsMax={4}
/>
<table id="buttons">
<tbody>
<td>
        <IconButton tooltip="Edellinen" >
          <Back />
        </IconButton>

</td>
<td id="next">
        <IconButton type="Submit" value="Submit" disabled={!this.state.checked} tooltip="Seuraava">
          <Forward />
        </IconButton>
</td>
</tbody>
</table>
        </div>
        </form>
        </div>
    );
  }
}
export default Order;
