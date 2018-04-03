import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../index.css';
import {Tabs, Tab} from 'material-ui/Tabs';


import HistoryListing from '../../containers/Admin/HistoryListing'
import ReservedListing from '../../containers/Admin/ReservedListing'

import Varauskartta from '../../containers/Admin/Varauskartta/Varauskartta'
import Admin from '../../containers/Admin/Admin/Admin'

import Notification from '../../containers/Admin/Notification'



class AdminWasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    index: 0
  }
 }

handleChange = (value) => {
  this.setState({
    index: value
  });
};

render() {


    return (
      <MuiThemeProvider>
      <div>
      <Tabs index={this.state.index} onChange={this.handleChange} inkBarStyle={{background: '#AFD43F', height: '3px'}}>
        <Tab label="Historia" className="menu" value={0} />
        <Tab label="Varaukset" className="menu" value={1} />
        <Tab label="Admin" className="menu" value={2} />
        <Tab label="Varauskartta" className="menu" value={3} />
        <Tab label="Ilmoitukset" className="menu" value={4} />
      </Tabs>
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
