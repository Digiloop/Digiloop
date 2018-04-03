import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Order1 from './Order1';

var values = {
    pickUpAddr: '',
    zipCode: '',
    city: '',
    phone: '',
    pickUpWish: '',
    organization: '',
    cat: '',
    subCat: '',
    pcs: '',
    size: '',
    desc: '',
    pic: '',
    weight: '',
    owner: ''
}

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    saveValues(value) {
        return function() {
            values: value
        }.bind(this)()
    }

    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }

    prevStep() {
        this.setState({
            step: this.state.step - 1
        })
    }

    submitOrder() {
        this.nextStep()
    }

showSteps() {
    switch (this.state.step) {
        case 1:
        return < Order1 
        values={values}
        nextStep={this.nextStep}
        prevStep={this.prevStep}
        saveValues={this.saveValues} />
        
    }
}

    render() {

        const styles = {
            borderRadius: 4, backgroundColor: '#FFFFFF', width: '10%', height: '1.5vh', margin: 5, float: 'left'
        }
        return (
            <div>
            <div className="progressBar" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="state1" style={styles}></div>
                <div className="state2" style={styles}></div>
                <div className="state3" style={styles}></div>
                <div className="state4" style={styles}></div>
            </div>
            <div className="content" >{this.showSteps()}</div>
            </div>
        );
    }
}
export default Order;