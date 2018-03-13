import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';
import Login from './components/containers/Login/Login.js';
import Admin from './components/ui/WasteProcessor/Admin/Admin.js';

import WasteProcessor from './components/containers/WasteProcessor/WasteProcessor.js';

import Order from './components/ui/EndUser/Order/order.js';
import Front from './components/ui/EndUser/EndUserFront.js';
import FrontPage from './components/ui/EndUser/FrontPage/FrontPage.js';
import Profile from './components/ui/EndUser/Profile/Profile.js';
// Author: Spagehetti Baker Bros & co.
//Testikommentti





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      value: 'Front',
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
          value: Front,
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
