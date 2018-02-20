import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import styles from '../../../../index.css';
import Profile from '../Profile/Profile.js';
import Order from '../Profile/Order.js';
import Notification from '../Profile/Notification.js';
import RaisedButton from 'material-ui/RaisedButton';

class FrontPage extends Component {
constructor(props){
  super(props);
  this.state = {
    value: Notification
  }
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})



render() {
    return (
      <div>
      <RaisedButton label="Uusi Tilaus" onClick={this.handleChange}  />
      {this.state.value ? <Notification /> : <Order />}
      </div>

    );
  }
}
export default FrontPage;
