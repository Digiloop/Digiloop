import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import styles from './FrontPage.css';

class FrontPage extends Component {
constructor(props){
  super(props);
  this.state = {value: '', open: false};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

handleChange = (event, index, value) => this.setState({value});
handleSubmit(event) {
  event.preventDefault();
  console.log({Jäte:this.state.value });
  alert('Jätteen tyyppi: ' + this.state.value);
}

handleToggle = () => this.setState({open: !this.state.open});

render() {
    return (
      <MuiThemeProvider>
      <div className="frontpake">
        <div>
        <AppBar style={{backgroundColor: '#004225'}} title="Etusivu"
          onClick={this.handleToggle} >
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </AppBar>
        </div>
        <div className="news">
          <h1>Ilmoitukset</h1>
          <div className="newsbox">
            <p>Lava tulloo, ootteko valmiita</p>
          </div>
        </div>
          <div className="footer">
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default FrontPage;
