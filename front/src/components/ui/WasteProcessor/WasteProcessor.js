import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, Menu, MenuItem } from 'material-ui';
import { Toolbar, IconButton, Divider, Tabs, Tab } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import { logOut } from '../../../utils/login';
import Snackbar from 'material-ui/Snackbar'

// Sub-pages
import ProfileMain from './Profile/ProfileMain'
import HistoryListing from '../../containers/WasteProcessor/HistoryListing'
import ReservedListing from '../../containers/WasteProcessor/ReservedListing'
import Varauskartta from '../../containers/WasteProcessor/Varauskartta/Varauskartta'
import Notification from '../../containers/Admin/Notification'
import Feedback from './Feedback'


class WasteProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      open: false,
      openSnackBar: false
    }
  }

  // changes the tabs
  handleChange = (value) => {
    this.setState({
      index: value
    });
  };

  // returns to frontpage, snackValue is value from profile page (true/false)
  handleUpdate = (snackValue) => {
    this.setState({
      index: 0,
      openSnackBar: snackValue
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

  // drawer selector
  handleDrawerChange = (event, value) => this.setState({ index: value })
  // opens and closes drawer
  handleToggle = (event) => this.setState({ open: !this.state.open })
  handleClose = () => this.setState({ open: false })

  handleSnackBarClose = () => this.setState({ openSnackBar: false })

  render() {

    const styles = {
      largeIcon: {
        height: 60,
        width: 60
      },
      tabActive: {
        borderBottom: '3px solid #AFD43F',
        color: 'rgba(255, 255, 255, 0.7)'
      },
      tabNotActive: {
        borderBottom: '3px solid #004225',
        color: 'rgba(255, 255, 255, 0.7)'
      }
    }

    const snack = [];
    snack.push(
      <Snackbar
        open={this.state.openSnackBar}
        autoHideDuration={2500}
        onRequestClose={this.handleSnackBarClose}
        message={<span id="message-id">Tiedot päivitetty!</span>}
      />
    )

    return (
      <MuiThemeProvider>
        <div>
          {snack}
          <AppBar showMenuIconButton={false} style={{ backgroundColor: '#004225', padding: '0', margin: '0' }} >
            <Toolbar style={{ backgroundColor: '#004225', width: '80%', marginLeft: '8%', marginRight: 'auto', position: 'absolute' }}>
              <IconButton onClick={this.handleToggle} iconStyle={styles.largeIcon}
                style={{ padding: '0', marginRight: '20px', height: '60px', width: '60px' }}>
                <MenuIcon color='#FFF' />
              </IconButton>
              <Tabs index={this.state.index} onChange={this.handleChange} style={{ width: '100%', float: 'left' }}
                inkBarStyle={{ display: 'none' }}>
                <Tab style={this.state.index === 0 ? styles.tabActive : styles.tabNotActive} label="Historia" className="menu" value={0} />
                <Tab style={this.state.index === 1 ? styles.tabActive : styles.tabNotActive} label="Varaukset" className="menu" value={1} />
                <Tab style={this.state.index === 2 ? styles.tabActive : styles.tabNotActive} label="Varauskartta" className="menu" value={2} />
                <Tab style={this.state.index === 3 ? styles.tabActive : styles.tabNotActive} label="Ilmoitukset" className="menu" value={3} />
              </Tabs>
              <div className="frontDrawer">
                <Drawer docked={false} width={220} open={this.state.open} onRequestChange={(open) => this.setState({ open })}
                  containerStyle={{ backgroundColor: '#004225' }}>
                  <Menu value={this.state.value} onChange={this.handleDrawerChange}>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={0}>Etusivu</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={4}>Profiili</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={3}>Ilmoitukset</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={6}>Anna palautetta</MenuItem>

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
          {this.state.index === 2 && <Varauskartta />}
          {this.state.index === 3 && <Notification />}

          {this.state.index === 6 && <Feedback onUpdate={this.handleUpdate} />}
          {this.state.index === 4 && <ProfileMain onUpdate={this.handleUpdate} />}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
