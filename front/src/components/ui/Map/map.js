import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
class Map extends Component {
constructor(props){
  super(props);
  this.state={

  }
 }


 homo(){console.log("hiiohoi");}
 initMap() {
   var Lahti = {lat: 60.986466, lng: 25.643688};
   geocoder = new google.maps.Geocoder();
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 4,
     center: Lahti
   });

   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var labelIndex = 1;
   var items = 8;
   var itemsArray = [];
   var geocoder;

 var iconBase = './icons/';
   var icons = {
     parking: {
       icon: {
         url: iconBase + 'icon.png',
         //size: new google.maps.Size(20, 32),
         size: new google.maps.Size(20, 20)
         //origin: new google.maps.Point(0,0), // origin
         //anchor: new google.maps.Point(0, 0) // anchor
       }
     },
     library: {
       icon: {
         url: iconBase + 'iconL.png',
         //size: new google.maps.Size(20, 32),
         size: new google.maps.Size(30, 30)
         //origin: new google.maps.Point(0,0), // origin
         //anchor: new google.maps.Point(0, 0) // anchor
         }
     }/*,
     info: {
       icon: iconBase + 'info-i_maps.png'
     }*/
   };

   var features = [
     {
       position: new google.maps.LatLng(60.786466, 25.653688),
       type: 'parking'
     }, {
       position: new google.maps.LatLng(Lahti),
       type: 'library'
     }, {
       position: new google.maps.LatLng(-33.91747, 151.22912),
       type: 'parking'
     }];

     for (i=1; i <= items; i++){
         itemsArray[i] = i;
         console.log(itemsArray[i]);
     }

     // Create markers.
   features.forEach(function(feature) {
     console.log(itemsArray);
     var marker = new google.maps.Marker({
       position: feature.position,
       icon: icons[feature.type].icon,
       //label: labels[labelIndex++ % labels.length],
       label: " " +itemsArray[labelIndex++],
       map: map
     });
   });

   function codeAddress() {
   var address = document.getElementById('address').value;
   geocoder.geocode( { 'address': address}, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
   map.setCenter(results[0].geometry.location);
   var marker = new google.maps.Marker({
       map: map,
       position: results[0].geometry.location
   });
 } else {
   alert('Geocode was not successful for the following reason: ' + status);
 }
});}


 /*var marker = new google.maps.Marker({
   scaledSize: new google.maps.Size(10, 10),
   position: Lahti,
   map: map
 });*/
}



render() {
    return (
      <div>
        <h3>My Google Maps Demo</h3>
        <div id="map"></div>
          <input id="address" type="textbox" value="Sydney, NSW"></input>
          <input type="button" value="Geocode" onClick="codeAddress()"></input>

      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Map;
