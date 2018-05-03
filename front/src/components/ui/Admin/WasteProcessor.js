import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import styles from '../../../index.css';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from 'material-ui/Divider';
import { logOut } from '../../../utils/login-api';

import SvgIcon from 'material-ui/SvgIcon';

import HistoryListing from '../../containers/Admin/HistoryListing'
import ReservedListing from '../../containers/Admin/ReservedListing'

import Varauskartta from '../../containers/Admin/Varauskartta/Varauskartta'
import Admin from '../../containers/Admin/Admin'

import Notification from '../../containers/Admin/Notification'
import { black } from 'material-ui/styles/colors';



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

  logout = () => {
    logOut();
    localStorage.clear();
    this.props.onNewLogout({
      userlvl: -1
    });
  }

  handleAppbarChange = (event, value) => this.setState({ value })
  handleToggle = (event) => this.setState({ open: !this.state.open })
  handleClose = () => this.setState({ open: false })

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <AppBar showMenuIconButton={false} style={{backgroundColor: '#004225', padding: '0', margin: '0'}} >
            <Toolbar style={{ backgroundColor: '#004225', width: '100%' }}>
              <IconButton onClick={this.handleToggle} >
                <MenuIcon />
              </IconButton>
              <Tabs index={this.state.index} onChange={this.handleChange} style={{ width: '100%' }} inkBarStyle={{ background: '#AFD43F', height: '3px' }}>
                <Tab label="Historia" className="menu" value={0} />
                <Tab label="Varaukset" className="menu" value={1} />
                <Tab label="Admin" className="menu" value={2} />
                <Tab label="Varauskartta" className="menu" value={3} />
                <Tab label="Ilmoitukset" className="menu" value={4} />
              </Tabs>
              <div className="frontDrawer">
            <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})} containerStyle={{ backgroundColor: '#004225' }}>
              <Menu value={this.state.value} onChange={this.handleAppbarChange}>{console.log(this.state.value)}
                <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={'FrontPage'}>Etusivu</MenuItem>
                <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={'Profile'}>Oma profiili</MenuItem>
                <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={'News'}>Ilmoitukset</MenuItem>
                <Divider />
                <br />
                <MenuItem style={{ color: 'white' }} onClick={this.logout} value={'Logout'}>Kirjaudu ulos</MenuItem>
              </Menu>
            </Drawer>
          </div>
            </Toolbar>
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
