import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';
import './WasteProcessor.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import Gmap from '.././Map/Gmap.js'
// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';
import ReservationListing from './ReservationListing'
import ReservationListOptions from './ReservationListOptions'

class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a',
    showSO: false
  }
 }

 handleChange = (value) => {
     this.setState({
       value: value,
     });
   };


showSearchOptions = () => {
  console.log(this.state.showSO)
   this.setState({
     showSO: !this.state.showSO,
   })
 }


render() {
    return (
      <MuiThemeProvider>
      <Tabs className="map" inkBarStyle={{background: '#AFD43F', height: '3px'}}
      value={this.state.value}
      onChange={this.handleChange}
    >
      <Tab className="menu" label="Historia" value="a">
        <div  className="map">
          <h2>Käsitellyt jätteet</h2>
          <p>
            Tähän tulee tiedot käsitellyistä jätteistä.
          </p>
          {/*<p>{this.state.value} </p>*/}
        </div>
      </Tab>
      <Tab className="menu" label="Varaukset" value="b">
        <div className="map">
          <h2>Varatut jätteet</h2>
          <p>
            Tässä näkyy varatut jätteet
          </p>
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
        <div className="map">
          <div className="left">
            <h2>Kartta</h2>
              <div className="subLeft">
              <Gmap />
              </div>
          </div>
          <div className="right">
            <h2>Varausluettelo<RaisedButton label="Hakuehdot" onClick={this.showSearchOptions} style={{float: 'right', marginRight: '10px'}} /></h2>
            <div className="subRight">
              {this.state.showSO ? <ReservationListOptions /> : <ReservationListing />}
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>

      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
