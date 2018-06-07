import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../../index.css';

import Gmap from './Map/Gmap.js'
import ReservationListing from './ReservationListing'
import ReservationListOptions from '../../../containers/Admin/Varauskartta/ReservationListOptions'

import { getJunkData } from '../../../../utils/fetchItems';
//import { getCats, getSubCats } from '../../../../utils/fetchCategories';
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
      categories: ["SER", "Akut", "Tietoturva"],
      subCategories: []
    }
    this.rliFiltering = this.rliFiltering.bind(this);
    this.getJunksData = this.getJunksData.bind(this);
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  // fetch junk data
  getJunksData() {

    getJunkData().then((junks) => {
      this.props.itemsToStore(junks);
      this.rliFiltering();
    });
  }


  // the filter function, that leaves only the necessary stuff to be displayed
  rliFiltering() {


    //var dynVar;

    let resListItemsFiltered = [];
    let j = 0;


    // Abbreviations for props, reservelist options, catoptions & subcatoptions
    const p = this.props;
    const o = this.props.rLOpt;

    
    let pi;
    let pass = true;


    // move optioned cats and subcats to array for easier usage
    let catOptions = [];
    for (let key in o.categories) {
      if (o.categories.hasOwnProperty(key)) {
        catOptions = [...catOptions, o.categories[key]]
      }
    }


    for (let i = 0; i < this.props.resListItems.length; i++) {

      pi = p.resListItems[i];
      pass = true;

      for (let j = 0; j < this.props.cats.length; j++) {
        if (catOptions[j] === false && pi.category === this.props.cats[j].CatName) {
          pass = false;
        }
      }

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
    //this.rliFiltering();
  }

  componentWillReceiveProps() {
    //this.rliFiltering();
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
