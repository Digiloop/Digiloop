import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        const styles = {
            borderRadius: 4, backgroundColor: '#FFFFFF', width: '10%', height: '1.5vh', margin: 5, float: 'left'
        }
        return (
            <div className="progressBar" style={{display: 'flex',justifyContent: 'center'}}>
                <div className="state1" style={styles}></div>
                <div className="state2" style={styles}></div>
                <div className="state3" style={styles}></div>
                <div className="state4" style={styles}></div>
            </div>
        );
    }
}
export default Order;