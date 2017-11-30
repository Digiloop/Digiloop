import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import './FrontPage.css';
import Profile from '../Profile/Profile.js';

class FrontPage extends Component {
constructor(props){
  super(props);
  this.state = {
  }
 }

render() {
    return (
        <div className="news">
          <h1>Ilmoitukset</h1>
          <div className="newsbox">
            <p>Lava tulloo, ootteko valmiita</p>            
            <Divider style={{backgroundColor: '#004225'}}/>
          </div>
        </div>
    );
  }
}
export default FrontPage;
