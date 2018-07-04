import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Order from '../Order/OrderMain';

class History extends Component {
constructor(props){
  super(props);
  this.state = {
    value: Order,
  };
 }

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
