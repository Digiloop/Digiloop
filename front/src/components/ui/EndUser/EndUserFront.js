import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import FrontPage from './FrontPage/FrontPage.js';
import Profile from './Profile/Profile.js';
import Order from './Order/order.js';
import styles from '../../../index.css';

class EndUserFront extends Component {
constructor(props){
  super(props);
  this.state = {
    value: FrontPage,
    open: false,
  };
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})
handleToggle = () => this.setState({open: !this.state.open})

render() {
    return (
      <MuiThemeProvider>
      <div className="frontpake">
        <div>
        <AppBar style={{backgroundColor: '#FFF'}} title={<div className="app-bar-title">Etusivu</div>}
          onClick={this.handleToggle} >
          <div className="frontDrawer">
            <Drawer open={this.state.open} containerStyle={{backgroundColor: '#004225', marginTop: '50px'}}>
              <Menu value={this.state.value} onChange={this.handleChange}>{console.log(this.state.value)}
                <MenuItem style={{color: 'white'}} value={FrontPage}>Etusivu</MenuItem>
                <MenuItem style={{color: 'white'}} value={Profile}>Oma profiili</MenuItem>
                <MenuItem style={{color: 'white'}} value={'News'}>Ilmoitukset</MenuItem>
                <Divider />
                <br />
                <MenuItem style={{color: 'white'}} value={'LogOut'}>Kirjaudu ulos</MenuItem>
              </Menu>
            </Drawer>
          </div>
        </AppBar>
        </div>
          {<this.state.value />}
          <div className="footter">
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default EndUserFront;
