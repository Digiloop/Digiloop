import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, Menu, MenuItem } from 'material-ui';
import { Toolbar, IconButton, Divider, Tabs, Tab } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import { logOut } from '../../../utils/login';
import Profile from '../../containers/Admin/Profile/Profile'

import HistoryListing from '../../containers/Admin/HistoryListing'
import ReservedListing from '../../containers/Admin/ReservedListing'
import CategoriesMain from '../../containers/Admin/Categories/CategoriesMain'
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
  }

  // tabs handler
  handleChange = (value) => {
    this.setState({
      index: value
    });
  };

  // drawer selector
  handleDrawerChange = (event, value) => {
    this.setState({
      index: value
    });
  }

  // logout function
  logout = () => {
    logOut();
    localStorage.removeItem("loginData")
    //localStorage.clear();
    this.props.onNewLogout({
      userlvl: -1
    });
  }

  // returns to frontpage
  handleUpdate = (e, value) => {
    this.setState({
      index: 0
    });
  }

// opens and closes drawer
  handleToggle = (event) => this.setState({ open: !this.state.open })
  handleClose = () => this.setState({ open: false })

  render() {

    const styles = {
      largeIcon: {
        height: 60,
        width: 60
      },
    }

    return (
      <MuiThemeProvider>
        <div>
          <AppBar showMenuIconButton={false} style={{ backgroundColor: '#004225', padding: '0', margin: '0' }} >
            <Toolbar style={{ backgroundColor: '#004225', width: '100%' }}>
              <IconButton onClick={this.handleToggle} iconStyle={styles.largeIcon} style={{ padding: '0', marginRight: '20px' }}>
                <MenuIcon color='#FFF' />
              </IconButton>
              <Tabs index={this.state.index} onChange={this.handleChange} style={{ width: '100%', float: 'left' }} 
              inkBarStyle={{ background: '#AFD43F', height: '3px' }}>
                <Tab label="Kategoriat" className="menu" value={0} />
                <Tab label="Varaukset" className="menu" value={1} />
                <Tab label="Admin" className="menu" value={2} />
                <Tab label="Varauskartta" className="menu" value={3} />
                <Tab label="Ilmoitukset" className="menu" value={4} />
              </Tabs>
              <div className="frontDrawer">
                <Drawer docked={false} width={220} open={this.state.open} onRequestChange={(open) => this.setState({ open })}
                  containerStyle={{ backgroundColor: '#004225' }}>
                  <Menu value={this.state.value} onChange={this.handleDrawerChange}>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={0}>Etusivu</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={5}>Oma profiili</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={4}>Ilmoitukset</MenuItem>
                    <Divider />
                    <br />
                    <MenuItem style={{ color: 'white' }} onClick={this.logout} value={'Logout'}>Kirjaudu ulos</MenuItem>
                  </Menu>
                </Drawer>
              </div>
            </Toolbar>
          </AppBar>
          {this.state.index === 0 && <CategoriesMain />}
          {this.state.index === 1 && <ReservedListing />}
          {this.state.index === 2 && <Admin />}
          {this.state.index === 3 && <Varauskartta />}
          {this.state.index === 4 && <Notification />}

          {this.state.index === 5 && <Profile onUpdate={this.handleUpdate} />}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default AdminWasteProcessor;
