import React, { Component } from 'react';
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
  }




  render() {
    return (
      <div className="App">

        <p>testi</p>
        {this.state.loggedIn ? <Map /> : <AdminFront />}

      </div>


    );
  }
}

export default App;
