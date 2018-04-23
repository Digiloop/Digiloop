import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../index.css';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import HistoryListing from '../../containers/Admin/HistoryListing'
import ReservedListing from '../../containers/Admin/ReservedListing'

import Varauskartta from '../../containers/Admin/Varauskartta/Varauskartta'
import Admin from '../../containers/Admin/Admin'

import Notification from '../../containers/Admin/Notification'



class AdminWasteProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      open: false
    };
    this.handleAppbarChange = this.handleAppbarChange.bind(this);
  }

  handleChange = (value) => {
    this.setState({
      index: value
    });
  };

  handleAppbarChange = (event, value) => this.setState({ value })
  // handleToggle = () => this.setState({ open: !this.state.open })

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <AppBar style={{ backgroundColor: '#004225' }}
            onClick={this.handleToggle} title={
            <Tabs index={this.state.index} onChange={this.handleChange} style={{ width: '100%' }} inkBarStyle={{ background: '#AFD43F', height: '3px' }}>
              <Tab label="Historia" className="menu" value={0} />
              <Tab label="Varaukset" className="menu" value={1} />
              <Tab label="Admin" className="menu" value={2} />
              <Tab label="Varauskartta" className="menu" value={3} />
              <Tab label="Ilmoitukset" className="menu" value={4} />
            </Tabs> } >
            <div className="frontDrawer">
              <Drawer open={this.state.open} containerStyle={{ backgroundColor: '#004225', marginTop: '50px' }}>
                <Menu value={this.state.value} onChange={this.handleAppbarChange}>{console.log(this.state.value)}
                  <MenuItem style={{ color: 'white' }} value={'FrontPage'}>Etusivu</MenuItem>
                  <MenuItem style={{ color: 'white' }} value={'Profile'}>Oma profiili</MenuItem>
                  <MenuItem style={{ color: 'white' }} value={'News'}>Ilmoitukset</MenuItem>
                  <Divider />
                  <br />
                  <MenuItem style={{ color: 'white' }} onClick={this.logout} value={'Logout'}>Kirjaudu ulos</MenuItem>
                </Menu>
              </Drawer>
            </div>
          </AppBar>
          {this.state.index === 0 && <HistoryListing />}
          {this.state.index === 1 && <ReservedListing />}
          {this.state.index === 2 && <Admin />}
          {this.state.index === 3 && <Varauskartta />}
          {this.state.index === 4 && <Notification />}
        </div>


      </MuiThemeProvider>
    );
  }
}
export default AdminWasteProcessor;
