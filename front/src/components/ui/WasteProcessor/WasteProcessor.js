import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../index.css';
import {Tabs, Tab} from 'material-ui/Tabs';


import HistoryListing from './HistoryListing'
import ReservedListing from './ReservedListing'

import Varauskartta from '../../containers/WasteProcessor/Varauskartta/Varauskartta'



class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a'
  }
 }

  handleChange = (value) => {
    this.setState({
       value: value,
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




          {/*<p>{this.state.value} </p>*/}
        </div>
      </Tab>
      <Tab className="menu" label="Varaukset" value="b">
        <div className="map">
          <h2>Varatut jätteet</h2>
          <p>Reserved listing poistettu tästä</p>
        </div>
      </Tab>
      <Tab className="menu" label="Admin" value="c">
        <div  className="map">
          <h2>Admin-näkymä</h2>
          <p>
            Täällä voi muokata tietokannan rakennetta, esim. voi lisätä jätetyyppejä.
          </p>
        </div>
      </Tab>
      <Tab className="menu" label="Varauskartta" value="d">
        <Varauskartta />
      </Tab>
    </Tabs>

      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
