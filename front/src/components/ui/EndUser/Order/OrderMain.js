import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AddressFields from './AddressFields';
import CategoriesFields from './CategoriesFields';


class OrderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
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
            },
            step: 1
        };
        this.saveValues = this.saveValues.bind(this);
    }

    saveValues = (value) => {
        return function () {
            values: value
        }
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }

    submitOrder = () => {
        this.nextStep()
    }

    showSteps = () => {
        switch (this.state.step) {
            case 1:
                return < AddressFields
                    values={this.state.values}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    saveValues={this.saveValues} />
            case 2:
                return < CategoriesFields
                    values={this.state.values}
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
            <div className="OrderContent">
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
export default OrderMain;