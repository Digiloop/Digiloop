import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import Login from './components/ui/Login/Login.js';
import Map from './components/ui/Map/Map.js';
=======
import Login from './components/containers/Login/Login.js';
//import Map from './components/ui/Map/map.js';
>>>>>>> 3e7591c05f35947541b8549b16b5838ec8c9ae74
import AdminFront from './components/ui/Admin/AdminFront.js';
// Author: Spagehetti Baker Bros & co.





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,

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
