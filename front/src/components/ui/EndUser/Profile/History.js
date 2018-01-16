import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Order from './Order.js';
import styles from '../../../../index.css';

class Profile extends Component {
constructor(props){
  super(props);
  this.state = {
    value: Order,
  };
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})

render() {
    return (
        <div className="news">
          <div className="newOrder">
          </div>
          <h1>Tilaushistoria</h1>
          <div className="newsbox">
            <p>Tilaus 1</p>
            <Divider />
            <p>Tilaus 2</p>
            <Divider />
          </div>
        </div>
    );
  }
}
export default Profile;
