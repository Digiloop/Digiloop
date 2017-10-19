import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/ui/Login/Login.js';
import AdminFront from './components/ui/Admin/AdminFront.js';
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
        {this.state.loggedIn ? <AdminFront /> : <Login />}
      </div>


    );
  }
}

export default App;
