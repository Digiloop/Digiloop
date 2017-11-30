/* eslint-disable no-undef */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import  MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
import PropTypes from 'prop-types'
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"
import Geocoder from 'react-native-geocoding';
// Pakotan commitin
Geocoder.setApiKey('AIzaSyAMGoVUz1iQ1dDQRgK31rV3U2M_8vCFzE4');

  // Toimiva paske, Geocoding hoidetaan kun tallennetaan DBhen. On nyt demoamis vaiheessa tässä käytössä
  /*
  var markers = [{"lat": 60.986466, "lng": 25.643688, "text": "Kikki Hiiri was here EBIN!"},
  {"lat": 61.986466, "lng": 26.643688, "text": "Kikki Hiiri was here too!"}];

  const rows = [];

  for(let i =0; i<markers.length; i++ ){
    rows.push(<Marker
      key={i}
      position={{ lat:markers[i].lat, lng:markers[i].lng }} /> )
  }*/

class Map extends Component {
componentWillMount(){
  this.setState({
      test:[]
    })
}

constructor(props){
  super(props);

  this.state={
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

/*componentDidUpdate(prevProps, prevState){

if(this.state.test !== prevState.test){
this.setState({
    test:[]

  })
}
}*/


clear(){
  console.log(this.state.cleared);
  if(this.state.needClearing){
  this.setState({
    rows: [],
    needClearing: false,
    test:["Dolan"]
  });
  console.log("Cleared!");
}
else{
  this.setState({
    needClearing:true
  });
}
}

clearTEST(){
  this.setState({
    test: []
  });
  console.log("Cleared!TEST");

}

/*pressed(){
  if (this.visible) {
    this.visible=false;
  }
  else{
    this.visible=true;
  }
  var markers = [{"lat": 60.986466, "lng": 25.643688, "text": "Kikki Hiiri was here!"},
  {"lat": 61.986466, "lng": 26.643688, "text": "Kikki Hiiri was here too!"}];
  console.log("Hiiohoi");
  console.log(markers[0].text);
}*/

 debug(){
   console.log("Hiiohoi");
 }

render() {
  console.log(this.state.rows[0]);
  console.log(this.state.test[0]);

    for ( let i = 0; i < this.state.address.length; i++ ){
    Geocoder.getFromLocation(this.state.address[i]).then(

          json => {
            var location = json.results[0].geometry.location;
              this.state.rows[i] = <Marker
                key= {i}
                position={{ lat:location.lat, lng:location.lng }} />
          }

        )
          console.log(this.state.rows[0]);
          console.log("Marker added");
      }


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
  {this.state.rows}
   </GoogleMap>
  );

    return (
      <div>
          <MapComp />
          <button onClick={this.clear.bind(this)}>DEBUG</button>
      </div>
    );
  }

}
export default Map;
