import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Order from '../Order/Order.js';
import styles from '../../../../index.css';

class History extends Component {
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
          <h1 className="historytitle">Tilaushistoria</h1>
          <div className="newsbox">
            <p className="history">Tilaus 1</p>
            <Divider />
            <p className="history">Tilaus 2</p>
            <Divider />
          </div>
        </div>
    );
  }
}
export default History;
