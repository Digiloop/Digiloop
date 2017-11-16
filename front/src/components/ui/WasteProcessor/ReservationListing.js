import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Panel from 'muicss/lib/react/panel';

class ReservationListing extends Component {
constructor(props){
  super(props);
  this.state={
    itemCount: 3,
    items: [
      {
      cat: 'SER',
      amount: 12,
      size: 0.59,
      weight: 4.2,
      date: 27-10-2017,
      status: 'free'
      }
    ] // items array end
  }
 }



render() {

  const items = [];

  for(let i = 0; i < this.state.itemCount; i++){
    items.push(
      <panel>
        Hoo
      </panel>
    )
  }

    return (
      <MuiThemeProvider>
      {items}
      </MuiThemeProvider>
    );
  }
}
export default ReservationListing;
