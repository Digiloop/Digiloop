import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Back from '@material-ui/icons/ArrowBack';
import Forward from '@material-ui/icons/ArrowForward';
import AddressFields from '../../../containers/EndUser/Order/AddressFields';
import CategoriesFields from '../../../containers/EndUser/Order/CategoriesFields';
import assign from "object-assign";


class OrderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.userInfo.address,
            values: {
                zipcode: "",
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
                status: '',
                latitude: '',
                longitude: ''
            },
            step: 1
        };
        this.saveValues = this.saveValues.bind(this);
    }

    saveValues(value) {
        console.log("haa");
        this.setState({
            values: {
                'address': value.address,
                'zipcode': value.zipcode,
                'city': value.city,
                'phone': value.phone,
                'pickUpWish': value.pickup
            }
        }, () => console.log(this.state.values))
        console.log("hoo");

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
                    saveValues={this.saveValues} />
            case 2:
                return < CategoriesFields
                    values={this.state.values}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues} />

        }
    }

    render() {

        const styles = {

            notActive: {
                borderRadius: 8,
                backgroundColor: '#FFF',
                width: '14%',
                height: '.8vh',
                margin: 'auto',
                float: 'left',
                marginLeft: 10
            },
            Active: {
                backgroundColor: 'rgb(166, 206, 106)',
                borderRadius: 8,
                width: '14%',
                height: '.8vh',
                margin: 'auto',
                float: 'left',
                marginLeft: 10
            },
            backArrow: {
                color: '#FFF',
                height: 60,
                width: 60,
                margin: '0 15 0 20'
            },
            backArrowHidden: {
                color: '#FFF',
                height: 60,
                width: 60,
                margin: '0 15 0 20',
                visibility: 'hidden'
            },
            forwardArrow: {
                color: '#FFF',
                height: 60,
                width: 60,
                margin: '0 20'
            },
            forwardArrowHidden: {
                visibility: 'hidden',
                color: '#FFF',
                height: 60,
                width: 60,
                margin: '0 20'

            }
        }
        return (
            <div className="orderWrapper">
                <div className="progressBar" style={{ maxWidth: '90vh', minWidth: '50vh', display: 'flex', justifyContent: 'center' }}>
                    <Back style={this.state.step == 1 ? styles.backArrowHidden : styles.backArrow} onClick={this.prevStep} />
                    <div className="state1" style={this.state.step == 1 ? styles.Active : styles.notActive}></div>
                    <div className="state2" style={this.state.step == 2 ? styles.Active : styles.notActive}></div>
                    <div className="state3" style={this.state.step == 3 ? styles.Active : styles.notActive}></div>
                    <div className="state4" style={this.state.step == 4 ? styles.Active : styles.notActive}></div>
                    <Forward style={this.state.step == 4 || this.state.step == 1 ? styles.forwardArrowHidden : styles.forwardArrow} onClick={this.nextStep} />
                </div>
                <div className="frontPageBox" >{this.showSteps()}</div>
            </div>
        );
    }
}
export default OrderMain;