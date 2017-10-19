import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
class AdminFront extends Component {
constructor(props){
  super(props);
  this.state={

  }
 }



render() {
    return (
      <div>

        <h1 style={{color: 'red'}}>IMPORTANT ANNOUNCEMENT!</h1>
        <p>On Mikki nyt merelle hukkunut</p>
      </div>
    );
  }
}
export default AdminFront;
