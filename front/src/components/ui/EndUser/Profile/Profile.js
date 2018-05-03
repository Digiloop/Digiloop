import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Order from '../Order/Order';
import History from './History.js';
import styles from '../../../../index.css';

class Profile extends Component {
constructor(props){
  super(props);
  this.state = {
    value: History,
  };

  this.isHidden = () => {
    this.setState = ({
      hidden: false,
    })
  }
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})

render() {
    return (
      <div>
        <History />
      </div>
    );
  }
}
export default Profile;
