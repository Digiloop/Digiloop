import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';
import './WasteProcessor.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import Gmap from './Map/Gmap.js'
// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';
import ReservationListing from './ReservationListing'
import ReservationListOptions from '../../containers/WasteProcessor/ReservationListOptions'

//TODO take options from store, get list items from backend, filter and send to list & map

class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a',
    showSO: false,
    rliFilt: [
      {
      "cat": "SER",
      "subCat": "Data",
      "amount": 12,
      "size": 0.59,
      "weight": 4.2,
      "date": "27-10-2017",
      "status": "free"
      },
      {
      "cat": "SER",
      "subCat": "Data",
      "amount": 12,
      "size": 0.59,
      "weight": 4.2,
      "date": "27-10-2017",
      "status": "reserv"
      }
    ]
  }
  this.rliFiltering = this.rliFiltering.bind(this);
 }

 handleChange = (value) => {
     this.setState({
       value: value,
     });
   };


   // the filter function, that leaves only the necessary stuff to be displayed
  rliFiltering() {
    let resListItemsFiltered = [];
    let j = 0;

    for(let i = 0; i < this.props.resListItems.length; i++){
      //console.log(i);
      console.log(this.props.resListItems[i]);

      resListItemsFiltered[j] = this.props.resListItems[i];

      j++;
    }

    console.log("ennen setstatee")
    this.setState({
      rliFilt: resListItemsFiltered
    })
    console.log("setstaten jälkee")
  }


showSearchOptions = () => {
  //console.log(this.state.showSO)
  //console.log(this.props.rLOpt)
  //console.log(this.props.resListItems)
  console.log(this.state.rliFilt);
  // TODO instead of updating when returning from options page,
  // update when options are saved.
  this.rliFiltering();
  console.log(this.state.rliFilt);

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
              <Gmap items={this.state.rliFilt}/>
              </div>
          </div>
          <div className="right">
            <h2>Varausluettelo<RaisedButton label="Hakuehdot" onClick={this.showSearchOptions}
            style={{float: 'right', backgroundColor: '#004225'}} /></h2>
            <div className="subRight">
              {this.state.showSO ? <ReservationListOptions /> : <ReservationListing items={this.state.rliFilt}/>}
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
