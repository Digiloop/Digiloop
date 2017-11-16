import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './logo.svg';
import './App.css';
import Map from './components/ui/Map/Gmap.js';
import Login from './components/containers/Login/Login.js';
//import Map from './components/ui/Map/map.js';
import AdminFront from './components/ui/Admin/AdminFront.js';
import WasteProcessor from './components/ui/WasteProcessor/WasteProcessor.js';
// Author: Spagehetti Baker Bros & co.





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,

    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
      //console.log('HERE!', this.contextTypes);
        //this.state.loggedIn ? <Map /> : <AdminFront />;
        this.setState({loggedIn: !this.state.loggedIn })
        console.log(this.value);
      // this.context.location.transitionTo('Map');
    };



  render() {
    return (
      <MuiThemeProvider>
      <div className="App">

        <p>testi</p>
        <RaisedButton onClick={this.handleClick} label="Map" />
        {/* <RaisedButton onClick={this.handleClick} label="Käsittelijä" /> */}
         {this.state.loggedIn ? <WasteProcessor /> : <Map />}
      </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
