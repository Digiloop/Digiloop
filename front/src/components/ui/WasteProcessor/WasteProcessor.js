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
    value: 'a'
  }
 }

  handleChange = (value) => {
    this.setState({
       value: value
    });
  };

render() {

    // fetch
    const { junks } = this.state;

    return (
      <MuiThemeProvider>
      <Tabs className="map" inkBarStyle={{background: '#AFD43F', height: '3px'}}
      value={this.state.value}
      onChange={this.handleChange}
    >
      <Tab className="menu" label="Historia" value="a">
        <div  className="map">
          <h2>Käsitellyt jätteet</h2>
          <p>Historylisting poistettu tästä</p>
          <HistoryListing />
          {/*<p>{this.state.value} </p>*/}
        </div>
      </Tab>
      <Tab className="menu" label="Varaukset" value="b">
        <div className="map">
          <h2>Varatut jätteet</h2>
          <p>Reserved listing poistettu tästä</p>
          <ReservedListing />
        </div>
      </Tab>
      <Tab className="menu" label="Admin" value="c">
        <Admin />
      </Tab>
      <Tab className="menu" label="Varauskartta" value="d">
        <Varauskartta />
      </Tab>
      <Tab className="menu" label="Ilmoitukset" value="e">
        <div className="map">
          <h2>Ilmoitukset-näkymä</h2>
          <p>
            Täällä voi tehdä ilmoituksia
          </p>
        </div>
      </Tab>
    </Tabs>

      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
