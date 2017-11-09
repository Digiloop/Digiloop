/* eslint-disable no-undef */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import  MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
import PropTypes from 'prop-types'
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"



const MapComp = compose(
 withProps({
   googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAN0SNyI8W4PSk8x6kbS0XRcXGLODokzBw",
   loadingElement: <div style={{ height: `100%` }} />,
   containerElement: <div style={{ height: `400px` }} />,
   mapElement: <div style={{ height: `100%` }} />,
   visible: false,
   center: {  lat: 60.986466, lng: 25.643688 },
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
)((props) =>
 <GoogleMap
   defaultZoom={8}
   defaultCenter={{ lat: 60.986466, lng: 25.643688 }}
 >


<Marker
  position={{ lat: 60.986466, lng: 25.643688 }}
  onClick={props.onToggleOpen}
>
  {props.isOpen && <InfoBox
    onCloseClick={props.onToggleOpen}
    options={{ closeBoxURL: ``, enableEventPropagation: true }}
  >
    <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
      <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
        Kikki Hiiri was here!
      </div>
    </div>
  </InfoBox>}
</Marker>
   {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
 </GoogleMap>
);


class Map extends Component {




constructor(props){
  super(props);

  this.state={
      visible: false,
      center: {
          lat: 33.6890603,
          lng: -78.8866943
          },
          markers: [],
          true: true
  }
  this.pressed = this.pressed.bind(this);
 }

pressed(){
  if (this.visible) {
    this.visible=false;
  }
  else{
    this.visible=true;
  }
  console.log("Hiiohoi");
}

 debug(){
   console.log("Hiiohoi");
 }



render() {
    return (
      <div>
        <h3>My Google Maps Demo</h3>


          <MapComp />

          <input id="address" type="textbox" defaultValue="Sydney, NSW"></input>
          <input type="button" defaultValue="Geocode" onClick={this.pressed}></input>


      </div>
    );
  }

}
export default Map;
