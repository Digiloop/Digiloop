import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './logo.svg';
import './App.css';
import Map from './components/ui/WasteProcessor/Map/Gmap.js';
import Login from './components/containers/Login/Login.js';
//import Map from './components/ui/Map/map.js';
import AdminFront from './components/ui/WasteProcessor/Admin/AdminFront.js';
import WasteProcessor from './components/containers/WasteProcessor/WasteProcessor.js';
import Order from './components/ui/EndUser/Order/order.js';
// Author: Spagehetti Baker Bros & co.





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      value: 'Order',
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
      //console.log('HERE!', this.contextTypes);
        //this.state.loggedIn ? <Map /> : <AdminFront />;
        this.setState({
          loggedIn: !this.state.loggedIn,
         })
        console.log(this.state.value);
      // this.context.location.transitionTo('Map');
    };

    handleChange = (value) => {
        this.setState({
          loggedIn: !this.state.loggedIn,
          value: Order,
        });
        console.log(this.state.value);
      };


  render() {
    return (
      <MuiThemeProvider>
      <div className="App"
      >
        <RaisedButton onClick={this.handleChange} label="Map" value="Map" />
        {/* <RaisedButton onClick={this.handleClick} label="Käsittelijä" /> */}
        {console.log(this.state.value)}
         {this.state.loggedIn ? <WasteProcessor /> : <this.state.value />}
      </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
