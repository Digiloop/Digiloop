import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../index.css';
import {Tabs, Tab} from 'material-ui/Tabs';


import HistoryListing from '../../containers/WasteProcessor/HistoryListing'
import ReservedListing from '../../containers/WasteProcessor/ReservedListing'

import Varauskartta from '../../containers/WasteProcessor/Varauskartta/Varauskartta'
import Admin from '../../containers/WasteProcessor/Admin/Admin'



class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a',
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
      <Tabs index={this.state.index} onChange={this.handleChange}>
        <Tab label="Historia" value={0} />
        <Tab label="Varaukset" value={1} />
        <Tab label="Admin" value={2} />
        <Tab label="Varauskartta" value={3} />
        <Tab label="Ilmoitukset" value={4} />
      </Tabs>
      {this.state.index === 0 && <HistoryListing />}
      {this.state.index === 1 && <ReservedListing />}
      {this.state.index === 2 && <Admin />}
      {this.state.index === 3 && <Varauskartta />}
      {this.state.index === 4 && <div>{'Ilmoitukset'}</div>}
      </div>


      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
