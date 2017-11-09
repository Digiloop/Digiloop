import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from './order.css';

class Order extends Component {
constructor(props){
  super(props);
  this.state={

  };
 }

handleChange = (event, index, value) => this.setState({value});

render() {

  let s1 = {width: 150};  //tekstikenttien leveys
  let s2 = {backgroundColor: '#004225'}; //appbar tausta
  let s3 = {color: '#004225'}; //dropdownmenu otsikot
  let s4 = {color: '#004225'}; //^^ kategoriat


    return (
      <MuiThemeProvider>
        <div>
          <AppBar style={s2} title="Tilauslomake" />
          <p> * merkityt kentät ovat pakollisia</p>
        </div>

        <div>
        <table id="tilaus">
<tr>
<th style={s1}>Jätteen tyyppi*</th>
<th>
        <DropDownMenu style={s1} value={this.state.value} onChange={this.handleChange}>
          <p style={s3}>SER-jäte</p>
          <MenuItem style={s4} value={1} primaryText="Lamppu" />
          <MenuItem style={s4} value={2} primaryText="Akku" />
          <MenuItem style={s4} value={3} primaryText="Muu" />
          <p style={s3}>Muu</p>
          <MenuItem style={s4} value={4} primaryText="Kupari" />
          <MenuItem style={s4} value={5} primaryText="Alumiini" />
          <MenuItem style={s4} value={6} primaryText="Muu" />
        </DropDownMenu>
        </th>
        </tr>
        <tr>
          <th>Kappalemäärä*</th>
          <th><TextField id="pcs" style={s1}/></th>
        </tr>
        <tr>
          <th>Nouto-osoite*</th>
          <th><TextField id="address" style={s1}/></th>
        </tr>
        <tr>
          <th>Kuvaus*</th>
          <th><TextField id="description" rows={3} rowsMax={7} style={s1}/></th>
        </tr>
        <tr>
          <th>Mitat*</th>
          <th><TextField hintText="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m³" id="measurements" style={s1}/></th>
        </tr>
          <tr>
          <th>Paino</th>
          <th><TextField hintText="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kg" type id="weight" style={s1}/></th>
        </tr>
        <tr>
          <th>Kuva</th>
          <th>
          <RaisedButton
          containerElement='label' // <-- Just add me!
          label='Valitse kuva'>
          <input type="file" style={{ display: 'none' }} />
          </RaisedButton>
        </th>
        </tr>
        </table>

<table id="buttons">
<th>
        <IconButton tooltip="Edellinen">
          <Back />
        </IconButton>
        
</th>
<th id="next">
        <IconButton tooltip="Seuraava">
          <Forward />
        </IconButton>
</th>
</table>
        </div>
        <div class="footer">
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Order;
