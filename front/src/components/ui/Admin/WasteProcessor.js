import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, Menu, MenuItem } from 'material-ui';
import { Toolbar, IconButton, Divider, Tabs, Tab } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import { logOut } from '../../../utils/login';
import ProfileMain from './Profile/ProfileMain'
import Snackbar from 'material-ui/Snackbar'

import HistoryListing from '../../containers/Admin/HistoryListing'
import ReservedListing from '../../containers/Admin/ReservedListing'
import CategoriesMain from '../../containers/Admin/Categories/CategoriesMain'
import Varauskartta from '../../containers/Admin/Varauskartta/Varauskartta'
import Admin from '../../containers/Admin/Admin'
import Notification from '../../containers/Admin/Notification'
import Feedback from './Feedback'

// fetches
import { getOwnJunkData, getJunkOwnerData } from '../../../utils/fetchItems';

class AdminWasteProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      open: false,
      openSnackBar: false
    };
    this.refreshItems = this.refreshItems.bind(this);
  }

  // fetch junk data
  getJunksData() {
    getOwnJunkData().then((junks) => {
      this.props.itemsToStore(junks);
      this.createNewList();
    });
  }

  createNewList() {
    let newObject = [];
    let j = 0;

    for (let i = 0; i < this.props.items.length; i++) {

      if (this.props.items[i].status === 2 || this.props.items[i].status === 3) {

        getJunkOwnerData(this.props.items[i].owner).then((junkOwner) => {
          newObject[j] = Object.assign({ junkOwner }, this.props.items[i])
          j++
        })
      }
    }
    this.props.junksToStore(newObject);
  }

  refreshItems() {
    this.getJunksData();
  }

  componentDidMount() {
    this.getJunksData();
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
  handleUpdate = (value) => {
    this.setState({
      index: 0,
      openSnackBar: value
    });
  }

  // opens and closes drawer
  handleToggle = (event) => this.setState({ open: !this.state.open })
  handleClose = () => this.setState({ open: false })

  // closes snackbar
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
            <Toolbar style={{ backgroundColor: '#004225', width: '100%' }}>
              <IconButton onClick={this.handleToggle} iconStyle={styles.largeIcon}
                style={{ padding: '0', marginRight: '20px', height: '60px', width: '60px' }} >
                <MenuIcon color='#FFF' />
              </IconButton>
              <Tabs index={this.state.index} onChange={this.handleChange} style={{ width: '100%', float: 'left' }}
                inkBarStyle={{ display: 'none' }} >
                <Tab style={this.state.index === 0 ? styles.tabActive : styles.tabNotActive} label="Kategoriat" className="menu" value={0} />
                <Tab style={this.state.index === 1 ? styles.tabActive : styles.tabNotActive} label="Varaukset" className="menu" value={1} />
                <Tab style={this.state.index === 6 ? styles.tabActive : styles.tabNotActive} label="Historia" className="menu" value={6} />
                <Tab style={this.state.index === 2 ? styles.tabActive : styles.tabNotActive} label="Admin" className="menu" value={2} />
                <Tab style={this.state.index === 3 ? styles.tabActive : styles.tabNotActive} label="Varauskartta" className="menu" value={3} />
                <Tab style={this.state.index === 4 ? styles.tabActive : styles.tabNotActive} label="Ilmoitukset" className="menu" value={4} />
              </Tabs>
              <div className="frontDrawer">
                <Drawer docked={false} width={220} open={this.state.open} onRequestChange={(open) => this.setState({ open })}
                  containerStyle={{ backgroundColor: '#004225' }} >
                  <Menu value={this.state.value} onChange={this.handleDrawerChange}>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={0}>Etusivu</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={5}>Profiili</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={4}>Ilmoitukset</MenuItem>
                    <MenuItem onClick={this.handleClose} style={{ color: 'white' }} value={7}>Anna palautetta</MenuItem>
                    <Divider />
                    <br />
                    <MenuItem style={{ color: 'white' }} onClick={this.logout} value={'Logout'}>Kirjaudu ulos</MenuItem>
                  </Menu>
                </Drawer>
              </div>
            </Toolbar>
          </AppBar>
          {this.state.index === 0 && <CategoriesMain />}
          {this.state.index === 1 && <ReservedListing refreshItem={this.refreshItems} />}
          {this.state.index === 2 && <Admin />}
          {this.state.index === 3 && <Varauskartta refreshItem={this.refreshItems} />}
          {this.state.index === 4 && <Notification />}
          {this.state.index === 6 && <HistoryListing refreshItem={this.refreshItems} />}

          {this.state.index === 7 && <Feedback onUpdate={this.handleUpdate} />}
          {this.state.index === 5 && <ProfileMain onUpdate={this.handleUpdate} />}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default AdminWasteProcessor;
