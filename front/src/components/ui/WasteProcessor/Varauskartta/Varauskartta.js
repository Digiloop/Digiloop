import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../../index.css';

import Gmap from './Map/Gmap.js'
import ReservationListing from './ReservationListing'
import ReservationListOptions from '../../../containers/WasteProcessor/Varauskartta/ReservationListOptions'

import { getJunkData } from '../../../../utils/fetchdata-api';
import { getCats, getSubCats } from '../../../../utils/fetchcategories';
// fetch function


// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';
// import AppBar from 'material-ui/AppBar';


class WasteProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      showSO: false,
      rliFilt: [],
      categories: ["SER", "Akut", "Tietoturva"],
      subCategories: []
    }
    this.rliFiltering = this.rliFiltering.bind(this);
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  // fetch junk data
  getJunksData() {

    getJunkData().then((junks) => {
      console.log(junks);
      this.props.itemsToStore(junks.category);
    });
  }

  getCategories() {
    getCats().then((cats) => {
      this.setState({
        cats: cats.category
      })
    })
  }
  getSubCategories(){
    getSubCats().then((subCats) => {
      this.setState({
        subCats: subCats.category
      })
    })
  }

  // the filter function, that leaves only the necessary stuff to be displayed
  rliFiltering() {

    console.log(this.state.cats);
    console.log(this.state.subCats);

    //var dynVar;

    let resListItemsFiltered = [];
    let j = 0;

    const p = this.props;
    const o = this.props.rLOpt;
    let pi;

    let pass = true;

    for (let i = 0; i < this.props.resListItems.length; i++) {

      pi = p.resListItems[i];

      pass = true;

      // Main categories
      if (o.ser == false && pi.category == "SER") {
        pass = false;
      }
      if (o.batteries == false && pi.category == "Akut") {
        pass = false;
      }
      if (o.infoSecurity == false && pi.category == "Tietoturva") {
        pass = false;
      }

      /*
      for (var i = 0; i < this.state.cats.length; i++){

        if ( o.serSmallSer && pi.category == this.state.cats[i].CatName){
          pass = false;
        }
      }
      */

      if (pass) {
        resListItemsFiltered[j] = this.props.resListItems[i];
        j++;
      }
    }

    // set the filtered array in state, from which it's sent as props to children
    this.setState({
      rliFilt: resListItemsFiltered
    })
  }

  componentDidMount() {
    this.getJunksData();
    this.getCategories();
    this.getSubCategories();
    this.rliFiltering();
  }

  componentWillReceiveProps() {
    this.rliFiltering();
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
