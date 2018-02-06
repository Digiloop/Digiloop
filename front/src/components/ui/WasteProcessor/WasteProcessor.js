import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';
import styles from '../../../index.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import Gmap from './Map/Gmap.js'
// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';
import ReservationListing from './ReservationListing'
import ReservationListOptions from '../../containers/WasteProcessor/ReservationListOptions'

// fetch function
import { getJunkData } from '../../../utils/fetchdata-api';

//TODO take options from store, get list items from backend, filter and send to list & map

class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a',
    showSO: false,
    rliFilt: [],
    junks: {category: []}
  }
  this.rliFiltering = this.rliFiltering.bind(this);
 }

 handleChange = (value) => {
     this.setState({
       value: value,
     });
   };

   // fetch
  getJunksData() {
    getJunkData().then((junks) => {
      this.setState({ junks });
    });

    console.log(typeof junks);
  }

   // the filter function, that leaves only the necessary stuff to be displayed
  rliFiltering() {
    let resListItemsFiltered = [];
    let j = 0;

    // TODO add filtering
    for(let i = 0; i < this.props.resListItems.length; i++){

      resListItemsFiltered[j] = this.props.resListItems[i];
      j++;
    }

    // set the filtered array in state, from which it's sent as props
    this.setState({
      rliFilt: resListItemsFiltered
    })
  }

  componentDidMount(){
    this.rliFiltering();
    //fetch
    this.getJunksData();
  }

showSearchOptions = () => {
  // TODO instead of updating when returning from options page,
  // update when options are saved.
  this.rliFiltering();
  console.log(this.state.rliFilt);

  this.setState({
    showSO: !this.state.showSO,
  })
 }



render() {

    // fetch
    const { junks } = this.state;
    console.log("junkit: "+junks);
    console.log(junks.category);

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

          // fetch
        { junks.category.map((romu, index) => (
          <div className="testi" key={index}>
            <p> { romu.category } </p>
            <p> { romu.ID } </p>
          </div>
        ))}
        
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
            <button onClick={this.props.onGetItems()}>Fetcher</button>
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
