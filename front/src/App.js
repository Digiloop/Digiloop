import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/ui/Login/Login.js';
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
  }




  render() {
    return (
      <div className="App">

        {this.state.loggedIn ? <AdminFront /> : <Login />}
      </div>


    );
  }
}

export default App;
