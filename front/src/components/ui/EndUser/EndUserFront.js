import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, Menu, MenuItem } from 'material-ui';
import { Toolbar, IconButton, Divider } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import FrontPage from '../../containers/EndUser/FrontPage/FrontPage';
import Profile from '../../containers/EndUser/Profile/Profile.js';
import Historia from './History/History';
import styles from '../../../index.css';
import { logOut } from '../../../utils/login-api';

class EndUserFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: FrontPage,
      open: false
    }
  }

  // logout clears session with backend, empties localStorage session and sets userlevel to logged out
  logout = () => {
    logOut();
    localStorage.clear();
    this.props.onNewLogout({
      userlvl: -1
    });
  }

  handleChange = (event, value) => this.setState({ value })
  handleToggle = () => this.setState({ open: !this.state.open })
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
        <div className="frontpake">
          <AppBar showMenuIconButton={false} style={{ backgroundColor: '#004225', padding: '0', margin: '0' }}
          title='Etusivu' >
            <Toolbar style={{ backgroundColor: '#FFF', width: '100%', padding:'0' }}>
              <IconButton style={{ padding:'0' }} iconStyle={styles.largeIcon} onClick={this.handleToggle} >
                <MenuIcon color='#004225' />
              </IconButton>
              <div className="frontDrawer">
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({ open })}
                  containerStyle={{ backgroundColor: '#004225' }}>
                  <Menu value={this.state.value} onChange={this.handleChange}>{console.log(this.state.value)}
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={FrontPage}>Etusivu</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={Historia}>Tilaukset</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={Profile}>Oma profiili</MenuItem>
                    <Divider />
                    <br />
                    <MenuItem style={{ color: 'white' }} onClick={this.logout} value={'Logout'}>Kirjaudu ulos</MenuItem>
                  </Menu>
                </Drawer>
              </div>
            </Toolbar>
          </AppBar>
          {<this.state.value />}

        </div>
      </MuiThemeProvider>
    );
  }
}
export default EndUserFront;
