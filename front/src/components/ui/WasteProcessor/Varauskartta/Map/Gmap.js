/* eslint-disable no-undef */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
import PropTypes from 'prop-types'
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

class Map extends Component {
  componentWillMount() {
    this.setState({
      test: []
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      center: {
        lat: 33.6890603,
        lng: -78.8866943
      },
      true: true,
      markers: [],
      address: ["Kouvola", "Lahti", "Berlin"],
      rows: [],
      needClearing: true,
      test: ["Kikki", "Hiiri"]

    }
  }



  clear() {
    //console.log(this.state.cleared);
    if (this.state.needClearing) {
      this.setState({
        rows: [],
        needClearing: false,
        test: ["Dolan"]
      });
      //console.log("Cleared!");
    }
    else {
      this.setState({
        needClearing: true
      });
    }
  }

  clearTEST() {
    this.setState({
      test: []
    });

  }


  render() {
    for (let i = 0; i < this.props.items.length; i++) {
      console.log("Lat: " + this.props.items[i].latitude + " Long: " + this.props.items[i].longitude)
      this.state.rows[i] = <Marker
        key={i}
        position={{ lat: parseFloat(this.props.items[i].latitude), lng: parseFloat(this.props.items[i].longitude) }} />
    }


    const MapComp = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAN0SNyI8W4PSk8x6kbS0XRcXGLODokzBw",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        visible: false,
        center: { lat: 60.986466, lng: 25.643688 },
      }),
      withStateHandlers(() => ({
        isOpen: false,
      }), {
          onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
          })
        }),
      withScriptjs,
      withGoogleMap
    )
    ((props) =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 60.986466, lng: 25.643688 }}>
        {this.state.rows}
      </GoogleMap>
    );

    return (
      <div>
        <MapComp />

      </div>
    );
  }

}
export default Map;
