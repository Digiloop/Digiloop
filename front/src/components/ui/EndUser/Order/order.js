import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from './order.css';

class Order extends Component {
constructor(props){
  super(props);
  this.state = {value: ''};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

handleChange = (event, index, value) => this.setState({value});
handleSubmit(event) {
  event.preventDefault();
  console.log({Jäte:this.state.value });
  alert('Jätteen tyyppi: ' + this.state.value);
}

render() {

  let s1 = {width: 150};  //tekstikenttien leveys
  let s2 = {backgroundColor: '#FFFFF'}; //appbar tausta
  let s3 = {color: '#004225'}; //dropdownmenu otsikot
  let s4 = {color: '#004225'}; //^^



    return (
      <MuiThemeProvider>

        <div>
          <AppBar style={s2} title="Tilauslomake" />
        </div>

<div className="Container">
  <p> * merkityt kentät ovat paskaa pakollisia</p>

        <form onSubmit={this.handleSubmit}>
        <div>
        <table name="tilaus">
        <tbody>
<tr>
<td style={s1}>Jätteen tyyppi*</td>
<td>
        <DropDownMenu style={s1} value={this.state.value} onChange={this.handleChange}>
          <p style={s3}>SER-jäte</p>
          <MenuItem style={s4} name="Lamppu" value={"Lamppu"} primaryText="Lamppu" />
          <MenuItem style={s4} name="Akku" value={"Akku"} primaryText="Akku" />
          <MenuItem style={s4} name="MuuSER" value={"Muu SER"} primaryText="Muu" />
          <p style={s3}>Muu</p>
          <MenuItem style={s4} name="Kupari" value={"Kupari"} primaryText="Kupari" />
          <MenuItem style={s4} name="Alumiini" value={"Alumiini"} primaryText="Alumiini" />
          <MenuItem style={s4} name="Muu" value={"Muu"} primaryText="Muu" />
        </DropDownMenu>
        </td>
        </tr>
        <tr>
          <td>Kappalemäärä*</td>
          <td><TextField name="pcs" value={this.state.pcs} style={s1}/></td>
        </tr>
        <tr>
          <td>Nouto-osoite*</td>
          <td><TextField name="address" style={s1}/></td>
        </tr>
        <tr>
          <td>Kuvaus*</td>
          <td><TextField name="description" rows={3} rowsMax={7} style={s1}/></td>
        </tr>
        <tr>
          <td>Mitat*</td>
          <td><TextField hintText="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m³" name="measurements"  style={s1}/></td>
        </tr>
          <tr>
          <td>Paino</td>
          <td><TextField hintText="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kg" name="weight" style={s1}/></td>
        </tr>
        <tr>
          <td>Kuva</td>
          <td>
          <RaisedButton
          containerElement='label' // <-- Just add me!
          label='Valitse kuva'>
          <input type="file" style={{ display: 'none' }} />
          </RaisedButton>
        </td>
        </tr>
        </tbody>
        </table>

<table id="buttons">
<tbody>
<td>
        <IconButton tooltip="Edellinen">
          <Back />
        </IconButton>

</td>
<td id="next">
        <IconButton type="Submit" value="Submit" tooltip="Seuraava">
          <Forward />
        </IconButton>
</td>
</tbody>
</table>
        </div>
        </form>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Order;
