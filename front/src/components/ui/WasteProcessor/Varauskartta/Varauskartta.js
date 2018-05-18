import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../../index.css';

import Gmap from './Map/Gmap.js'
import ReservationListing from './ReservationListing'
import ReservationListOptions from '../../../containers/WasteProcessor/Varauskartta/ReservationListOptions'

import { getJunkData } from '../../../../utils/fetchdata-api';
//import { getCats, getSubCats } from '../../../../utils/fetchcategories';
// fetch function


// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';
// import AppBar from 'material-ui/AppBar';


class WasteProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSO: false,
      rliFilt: [],
    }
    this.rliFiltering = this.rliFiltering.bind(this);
    this.getJunksData = this.getJunksData.bind(this);
    this.getDistance = this.getDistance.bind(this);
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  // fetch junk data
  getJunksData() {
    getJunkData().then((junks) => {
      this.rliFiltering();
    });
  }

  // Returns the distance between two coordinates in meters
  // ©Spaghetti Baker Bros.
  getDistance(userLat, userLong, targetLat, targetLong){
 
    var R = 6371e3;
    var f1 = targetLat * Math.PI / 180, l1 = targetLong * Math.PI / 180;
    var f2 = userLat * Math.PI / 180, l2 = userLong * Math.PI / 180;
    var df = f2 - f1;
    var dl = l2 - l1;
 
    var a = Math.sin(df/2) * Math.sin(df/2)
          + Math.cos(f1) * Math.cos(f2)
          * Math.sin(dl/2) * Math.sin(dl/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
 
    console.log(d);
    return d;
  }


  // the filter function, that leaves only the necessary stuff to be displayed
  rliFiltering() {
    console.clear();
    console.log(this.props.resListItems);

    let resListItemsFiltered = [];


    // loop items
    for (let i = 0; i < this.props.resListItems.length; i++) {

      // initialize pass as true, fail it if checks fail
      let pass = true;


      // categorycheck - works perfectly
      // check the option state at the current item's category spot
      if (this.props.rLOpt.categories[this.props.resListItems[i].category] != undefined) { // is initialized? ALl uninitialized are treated as true
        if (!this.props.rLOpt.categories[this.props.resListItems[i].category]) { // is false?
          pass = false;
        }
      }

      // subcategory check - works perfectly
      let subCat = this.props.resListItems[i].category + this.props.resListItems[i].subCat; // create the subcat full name
      subCat = subCat.toLowerCase(); // eliminate case-irregularities in item categories
      if (this.props.rLOpt.subCategories[subCat] != undefined) { // is initialized? ALl uninitialized are treated as true
        if (!this.props.rLOpt.subCategories[subCat]) { // is false?
          pass = false;
        }
      }
      
      // show reserved items - works perfectly
      if (this.props.resListItems[i].status == 2 && !this.props.rLOpt.showRes){
        pass = false;
      }

      // weight limiters - seems to work
      if(parseInt(this.props.rLOpt.maxWeight, 10) < this.props.resListItems[i].weight || parseInt(this.props.rLOpt.minWeight, 10) > this.props.resListItems[i].weight){
        pass = false;
      }

      // volume limiters - seems to work
      if(parseInt(this.props.rLOpt.maxSize, 10) < this.props.resListItems[i].size || parseInt(this.props.rLOpt.minSize, 10) > this.props.resListItems[i].size){
        pass = false;
      }

      // distance limiters - done initially, requires proper location fetching
      if((this.getDistance(60.984149, 25.649381, this.props.resListItems[i].latitude, this.props.resListItems[i].longitude) / 1000) > this.props.rLOpt.distance){
        pass = false;
      }

      // if passed all checks, add to items that will be printed
      if (pass) {
        resListItemsFiltered.push(this.props.resListItems[i]);
      }
    }

    // set the filtered array in state, from which it's sent as props to children
    this.setState({
      rliFilt: resListItemsFiltered
    })
  }

  componentDidMount() {
    this.getJunksData();
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


    return (
      <MuiThemeProvider>

        <div className="map">
          <div className="left">
            <h2>Kartta</h2>
            <div className="subLeft">
              <Gmap items={this.state.rliFilt} />
            </div>
          </div>
          <div className="right">
            <h2>Varausluettelo<RaisedButton label="Hakuehdot" onClick={this.showSearchOptions}
              style={{ float: 'right', backgroundColor: '#004225' }} /></h2>

            <div className="subRight">
              {this.state.showSO ? <ReservationListOptions /> : <ReservationListing items={this.state.rliFilt} />}
            </div>
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
