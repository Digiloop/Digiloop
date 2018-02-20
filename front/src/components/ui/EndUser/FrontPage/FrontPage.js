import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import styles from '../../../../index.css';
import Profile from '../Profile/Profile.js';
import Order from '../Profile/Order.js';
import RaisedButton from 'material-ui/RaisedButton';

class FrontPage extends Component {
constructor(props){
  super(props);
  this.state = {
  }
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})



render() {
    return (
        <div className="news">
        <div>
        <RaisedButton label="Uusi Tilaus" onClick={this.handleChange}  />

        </div>
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
