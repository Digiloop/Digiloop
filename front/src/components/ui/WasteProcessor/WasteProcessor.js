import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../index.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import Gmap from './Map/Gmap.js'
import ReservationListing from './ReservationListing'
import ReservationListOptions from '../../containers/WasteProcessor/ReservationListOptions'
import HistoryListing from './HistoryListing'
import ReservedListing from './ReservedListing'

// fetch function
import { getJunkData } from '../../../utils/fetchdata-api';

// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';
// import AppBar from 'material-ui/AppBar';



class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a',
    showSO: false,
    rliFilt: []
  }
  this.rliFiltering = this.rliFiltering.bind(this);
 }

 handleChange = (value) => {
    this.setState({
       value: value,
    });
  };

   // fetch junk data
  getJunksData() {
    getJunkData().then((junks) => {
      console.log(junks);
      this.props.itemsToStore(junks.category);
      this.rliFiltering();
    });
  }



   // the filter function, that leaves only the necessary stuff to be displayed
  rliFiltering() {
    let resListItemsFiltered = [];
    let j = 0;

    // TODO add filtering
    //console.log(this.props);
    //console.log(this.props.resListItems);
    console.log(this.props.resListItems);
    console.log(this.props.resListItems.length);


    for(let i = 0; i < this.props.resListItems.length; i++){

      resListItemsFiltered[j] = this.props.resListItems[i];
      j++;
    }

    // set the filtered array in state, from which it's sent as props to children
    this.setState({
      rliFilt: resListItemsFiltered
    })
  }

  componentDidMount(){
    this.getJunksData();
      //
      // fetch data from backend
    // TODO somehow wait for datafetch before attempting filtering
     // filter data
  }

showSearchOptions = () => {
  // TODO instead of updating when returning from options page,
  // update when options are saved.
  this.rliFiltering();

  this.setState({
    showSO: !this.state.showSO,
  })
 }



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
          <p>
            Tähän tulee tiedot käsitellyistä jätteistä.
          </p>
          <HistoryListing items={this.state.rliFilt}/>




          {/*<p>{this.state.value} </p>*/}
        </div>
      </Tab>
      <Tab className="menu" label="Varaukset" value="b">
        <div className="map">
          <h2>Varatut jätteet</h2>
          <p>
            Tässä näkyy varatut jätteet
          </p>
          <ReservedListing items={this.state.rliFilt}/>
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
