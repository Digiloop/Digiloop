import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import Back from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button'
import Forward from '@material-ui/icons/Forward';

import AddressFields from '../../../containers/EndUser/Order/AddressFields';
import CategoriesFields from '../../../containers/EndUser/Order/CategoriesFields';
import InfoFields from '../../../containers/EndUser/Order/InfoFields';
import Summary from '../../../containers/EndUser/Order/Summary';


class OrderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                pickupaddr: this.props.userInfo.address,
                zipcode: this.props.userInfo.zipcode,
                city: this.props.userInfo.city,
                phone: this.props.userInfo.phone,
                pickupInstructions: this.props.userInfo.pickupInstructions,
                iscompany: '',
                category: '',
                subCat: '',
                pcs: '',
                size: '',
                description: '',
                pic: '',
                weight: '',

                pageOneAllFilled: ""
            },
            step: 1
        };
        this.saveValues = this.saveValues.bind(this);
    }


    saveValues(value) {
        this.setState({
            values: {
                'pickupaddr': value.pickupaddr,
                'zipcode': value.zipcode,
                'city': value.city,
                'phone': value.phone,
                'pickupInstructions': value.pickupInstructions,
                'iscompany': value.iscompany,
                'category': value.category,
                'subCat': value.subCat,
                'pcs': value.pcs,
                'size': value.size,
                'weight': value.weight,
                'description': value.description
            }
        }, () => console.log(this.state.values))

    }

    nextStep = () => {
        if(this.state.step != 4){
            this.setState({
                step: this.state.step + 1
            })
        }
    }

    // proceed to next phase of the form
    // a safeguard against going paSt the final page is implemented, since the forward button disables too slowly
    prevStep = () => {
        if(this.state.step != 1){
            this.setState({
                step: this.state.step - 1
            })
        }
    }

    // proceed to previous phase of the form
    // a safeguard against going back from the first page is implemented, since the forward button disables too slowly
    nextItem = () => {
        this.setState({
            step: 2
        })
            
    }

    setAllFilled = (allFilled) => {
        this.setState({
            pageOneAllFilled: allFilled
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
                    saveValues={this.saveValues}
                    setAllfilled={this.setAllFilled} />
            case 2:
                return < CategoriesFields
                    values={this.state.values}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues} />
            case 3:
                return < InfoFields
                    values={this.state.values}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues} />
            case 4:
                return < Summary
                    values={this.state.values}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    nextItem={this.nextItem} />
        }
    }

    render() {

        // confirm you want to reload page, since data will be lost
        // pretty annoying during dev, but activate before build
        /*
        window.onbeforeunload = function ()
        {
            return "";
        };*/

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
            buttonDisabled: {
                backgroundColor: "grey"
            },
            buttonActive: {
                backgroundColor: "white"
            }
        }
        return (

            

            <div className="orderWrapper">
                <div className="progressBar" style={{ maxWidth: '90vh', minWidth: '50vh', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="fab" style={this.state.step == 1 ? styles.buttonDisabled : styles.buttonActive} disabled={this.state.step == 1} onClick={this.prevStep}><Forward style={{transform: "scaleX(-1)"}}/></Button>
                    <div className="state1" style={this.state.step == 1 ? styles.Active : styles.notActive}></div>
                    <div className="state2" style={this.state.step == 2 ? styles.Active : styles.notActive}></div>
                    <div className="state3" style={this.state.step == 3 ? styles.Active : styles.notActive}></div>
                    <div className="state4" style={this.state.step == 4 ? styles.Active : styles.notActive}></div>
                    <Button variant="fab" style={(this.state.step == 1 && !this.state.pageOneAllFilled) || this.state.step == 4 ? styles.buttonDisabled : styles.buttonActive} 
                    disabled={(this.state.step == 1 && !this.state.pageOneAllFilled) || this.state.step == 4} onClick={this.nextStep}><Forward /></Button>
                </div>
                <div className="frontPageBox" >{this.showSteps()}</div>
            </div>
        );
    }
}
export default OrderMain;