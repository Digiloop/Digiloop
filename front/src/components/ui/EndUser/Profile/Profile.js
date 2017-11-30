import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import './Profile.css';

class Profile extends Component {
constructor(props){
  super(props);
  this.state = {value: '',
                open: false};
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})
handleToggle = () => this.setState({open: !this.state.open})

render() {
    return (
      <MuiThemeProvider>
      <div className="frontpake">
        <div>
        <AppBar style={{backgroundColor: '#004225'}} title="Oma profiili"
          onClick={this.handleToggle} >
          <div className="frontDrawer">
            <Drawer open={this.state.open} containerStyle={{backgroundColor: '#004225'}}>
              <Menu value={this.state.value} onChange={this.handleChange}>{console.log(this.state.value)}
                <MenuItem style={{color: 'white'}} value={'FrontPage'}>Etusivu</MenuItem>
                <MenuItem style={{color: 'white'}} value={'News'}>Uutiset</MenuItem>
              </Menu>
            </Drawer>
          </div>
        </AppBar>
        </div>
        <div className="news">
          <h1>Ilmoitukset</h1>
          <div className="newsbox">
            <p>Lava tulloo, ootteko valmiita</p>
          </div>
        </div>
          <div className="footter">
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default Profile;
