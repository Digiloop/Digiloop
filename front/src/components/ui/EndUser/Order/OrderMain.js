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
            values: [{
                pickupaddr: this.props.userInfo.address,
                zipcode: this.props.userInfo.zipcode,
                city: this.props.userInfo.city,
                phone: this.props.userInfo.phone,
                pickupInstructions: '',
                iscompany: '',
                category: '',
                subCat: '',
                pcs: '',
                size: '',
                description: '',
                pic: '',
                weight: ''
            }],
            step: 1,
            pageOneAllFilled: false,
            categoriesSelected: false,
            itemIndex: 0,


            buttonDisabled: {
                backgroundColor: "grey"
            },
            buttonActive: {
                backgroundColor: "white"
            }
        };
        this.saveValues = this.saveValues.bind(this);
        this.setCategoriesSelected = this.setCategoriesSelected.bind(this);
        this.isButtonDisabled = this.isButtonDisabled.bind(this);
    }


    saveValues(value) {

        // take current state in a var
        let valueArray = this.state.values;
        // create a new object from the saved data
        let newObject = {
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


        // save new object on the correct index
        valueArray[this.state.itemIndex] = newObject;

        this.setState({
            values: valueArray
        })

    }

    // proceed to next phase of the form
    // a safeguard against going paSt the final page is implemented, since the forward button disables too slowly
    nextStep = () => {
        if (this.state.step != 4) {
            this.setState({
                step: this.state.step + 1
            })
        }
    }


    // proceed to previous phase of the form
    // a safeguard against going back from the first page is implemented, since the forward button disables too slowly
    prevStep = () => {
        if (this.state.step != 1) {
            this.setState({
                step: this.state.step - 1
            })
        }
    }

    // begind adding another item
    // step reverts to 2 & itemIndex is increased by one
    nextItem = () => {

        let index = this.state.values.length;

        let tempArr = this.state.values;
        tempArr[this.state.values.length] = {
            'pickupaddr': "",
            'zipcode': "",
            'city': "",
            'phone': "",
            'pickupInstructions': "",
            'iscompany': "",
            'category': "",
            'subCat': "",
            'pcs': "",
            'size': "",
            'weight': "",
            'description': ""
        }

        this.setState({
            itemIndex: index,
            values: tempArr,
            step: 2
        })
    }

    editItem = (itemIndex) => {
        this.setState({
            itemIndex: itemIndex,
            step: 2
        })
    }

    setAllFilled = (allFilled) => {
        this.setState({
            pageOneAllFilled: allFilled
        })
    }

    setCategoriesSelected = (categoriesSelected) => {


        this.setState({
            categoriesSelected: categoriesSelected
        })
    }

    submitOrder = () => {
        this.nextStep()
    }

    // function for handling all the forward/backward button disable conditions
    // direction: 0=back, 1=forward. type: 0=bool , 1=style
    isButtonDisabled(arrowDirection, type) {

        switch (arrowDirection) {
            case 0:

                if (this.state.step == 1
                    || this.state.step == 2
                ) {
                    if (type == 0) {
                        return true; // disabled true
                    } else {
                        return this.state.buttonDisabled
                    }

                } else {
                    if (type == 0) {
                        return false; // disabled false; button enabled
                    } else {
                        return this.state.buttonActive
                    }
                }

            case 1:
                console.log(this.state.categoriesSelected)
                if ((this.state.step == 1 && !this.state.pageOneAllFilled)
                    || (this.state.step == 2 && !this.state.categoriesSelected)
                    || this.state.step == 3
                    || this.state.step == 4
                ) {
                    if (type == 0) {
                        return true; // disabled true
                    } else {
                        return this.state.buttonDisabled
                    }
                } else {
                    if (type == 0) {
                        return false; // disabled false; button enabled
                    } else {
                        return this.state.buttonActive
                    }
                }


        }




    }

    showSteps = () => {
        switch (this.state.step) {
            case 1:
                return < AddressFields
                    values={this.state.values[this.state.itemIndex]}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    setAllfilled={this.setAllFilled} />
            case 2:
                return < CategoriesFields
                    values={this.state.values[this.state.itemIndex]}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    setCategoriesSelected={this.setCategoriesSelected} />
            case 3:
                return < InfoFields
                    values={this.state.values[this.state.itemIndex]}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    saveButtonText={this.state.itemIndex == this.state.values.length - 1 ? "Lisää laite" : "Tallenna muutokset"} />
            case 4:
                return < Summary
                    values={this.state.values}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    nextItem={this.nextItem}
                    editItem={this.editItem} />
        }
    }

    render() {

        // **** DO NOT REMOVE ****

        // confirm you want to reload page, since data will be lost
        // pretty annoying during dev, but activate before build
        /*
        window.onbeforeunload = function ()
        {
            return "";
        };
        */

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
            }
        }
        return (



            <div className="orderWrapper">
                <div className="progressBar" style={{ maxWidth: '90vh', minWidth: '50vh', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="fab" style={this.isButtonDisabled(0, 1)} disabled={this.isButtonDisabled(0, 0)} onClick={this.prevStep}><Forward style={{ transform: "scaleX(-1)" }} /></Button>
                    <div className="state1" style={this.state.step == 1 ? styles.Active : styles.notActive}></div>
                    <div className="state2" style={this.state.step == 2 ? styles.Active : styles.notActive}></div>
                    <div className="state3" style={this.state.step == 3 ? styles.Active : styles.notActive}></div>
                    <div className="state4" style={this.state.step == 4 ? styles.Active : styles.notActive}></div>
                    <Button variant="fab" style={this.isButtonDisabled(1, 1)}
                        disabled={this.isButtonDisabled(1, 0)} onClick={this.nextStep}><Forward /></Button>
                </div>
                <div className="frontPageBox" >{this.showSteps()}</div>
            </div>
        );
    }
}
export default OrderMain;