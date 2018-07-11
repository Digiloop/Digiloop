import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, Menu, MenuItem, ToolbarTitle } from 'material-ui';
import { Toolbar, IconButton, Divider } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import FrontPageRedirect from './FrontPage/FrontPageRedirect';
import FrontPage from '../../containers/EndUser/FrontPage/FrontPage';
import Profile from '../../containers/EndUser/Profile/Profile';
import Historia from './History/History';
import { logOut } from '../../../utils/login';

import /*Allahu*/ Snackbar from 'material-ui/Snackbar';

class EndUserFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1,
      open: false,
      value: false,
      frontPageNeedsReset: false, // junk added snackbar
      allahuSnackbarOpen: false, // junk added snackbar
      openSnackBar: false, // profile updated snackbar
    };
    this.handleChange = this.handleChange.bind(this);
    this.getPageName = this.getPageName.bind(this);

    this.handleClose = this.handleClose.bind(this);

    // junk added snackbar
    this.toggleAllahuSnackbar = this.toggleAllahuSnackbar.bind(this)
    this.hideAllahuSnackbar = this.hideAllahuSnackbar.bind(this)
  }

  // logout clears session with backend, empties localStorage session and sets userlevel to logged out
  logout = () => {
    logOut();
    localStorage.removeItem("loginData")
    //localStorage.clear();
    this.props.onNewLogout({
      userlvl: -1
    });
  }

  // uses index to open right page
  handleChange = (e, value) => {


    this.setState({
      index: value
    }, function () {
      this.getPageName();
    });
  }

  handleUpdate = (value) => {
    this.setState({
      index: 0,
      openSnackBar: value
    }, function () {
      this.getPageName();
    });
  }

  // handles drawer open and close
  handleToggle = () => this.setState({ open: !this.state.open })



  handleClose() {
    this.setState({
      open: false
    })
  }

  // Name to toolbartitle
  getPageName() {
    switch (this.state.index) {
      case 0:
        return this.props.setNewPageName('Etusivu');
      case 1:
        return this.props.setNewPageName('Historia');
      case 2:
        return this.props.setNewPageName('Profiili');
      default:
        return this.props.setNewPageName('Etusivu');
    }
  }

  // handles junk added snackbar
  toggleAllahuSnackbar() {
    this.setState({
      allahuSnackbarOpen: true,
      index: -1
    })
  }

  hideAllahuSnackbar() {
    this.setState({ allahuSnackbarOpen: false })
  }

  // closes profile updated snackbar
  handleSnackBarClose = () => this.setState({ openSnackBar: false })

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
          <Snackbar // profile updated snackbar
            open={this.state.openSnackBar}
            autoHideDuration={2500}
            onRequestClose={this.handleSnackBarClose}
            message={<span id="message-id-userUpdate">Tiedot päivitetty!</span>}
          />
          <AppBar showMenuIconButton={false} style={{ backgroundColor: '#004225', padding: '0', margin: '0' }} >
            <Toolbar style={{ backgroundColor: '#FFF', width: '100%', padding: '0' }} >
              <IconButton style={{ padding: '0' }} iconStyle={styles.largeIcon} onClick={this.handleToggle} >
                <MenuIcon color='#004225' />
              </IconButton>
              <ToolbarTitle className='ToolBarTitle' text={this.props.pageName} style={{ width: '100%', color: '#004225', fontSize: '30px' }} />
              <div className="frontDrawer">
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({ open })}
                  containerStyle={{ backgroundColor: '#004225' }}>
                  <Menu index={this.state.index} onChange={this.handleChange}>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={-1}>Etusivu</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={1}>Tilaukset</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={2}>Oma profiili</MenuItem>
                    <Divider />
                    <br />
                    <MenuItem style={{ color: 'white' }} onClick={this.logout} value={'Logout'}>Kirjaudu ulos</MenuItem>
                  </Menu>
                </Drawer>
              </div>
            </Toolbar>
          </AppBar>
          {this.state.index === -1 && <FrontPageRedirect onUpdate={this.handleUpdate} />}
          {this.state.index === 0 && <FrontPage toggleAllahuSnackbar={this.toggleAllahuSnackbar} />}
          {this.state.index === 1 && <Historia />}
          {this.state.index === 2 && <Profile onUpdate={this.handleUpdate} />}
          <Snackbar // junk added
            open={this.state.allahuSnackbarOpen}
            autoHideDuration={2500}
            onRequestClose={this.hideAllahuSnackbar}
            message={<span id="message-id">Jäte syötetty!</span>}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
export default EndUserFront;
