import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../index.css';
import { Tabs, Tab } from 'material-ui/Tabs';
import { logOut } from '../../../utils/login-api';

// Sub-pages
import HistoryListing from '../../containers/WasteProcessor/HistoryListing'
import ReservedListing from '../../containers/WasteProcessor/ReservedListing'
import Varauskartta from '../../containers/WasteProcessor/Varauskartta/Varauskartta'
import Notification from '../../containers/WasteProcessor/Notification'



class WasteProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  // changes the tabs
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

  render() {


    return (
      <MuiThemeProvider>
        <div>
          <Tabs index={this.state.index} onChange={this.handleChange} inkBarStyle={{ background: '#AFD43F', height: '3px' }}>
            <Tab label="Historia" className="menu" value={0} />
            <Tab label="Varaukset" className="menu" value={1} />
            <Tab label="Varauskartta" className="menu" value={2} />
            <Tab label="Ilmoitukset" className="menu" value={3} />
            <Tab label="Kirjaudu ulos" className="menu" value={4} />
          </Tabs>
          {this.state.index === 0 && <HistoryListing />}
          {this.state.index === 1 && <ReservedListing />}
          {this.state.index === 2 && <Varauskartta />}
          {this.state.index === 3 && <Notification />}
          {this.state.index === 4 &&  this.logout() }
        </div>


      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
