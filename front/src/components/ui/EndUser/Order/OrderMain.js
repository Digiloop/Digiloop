import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Forward from '@material-ui/icons/Forward';

import AddressFields from '../../../containers/EndUser/Order/AddressFields';
import CategoriesFields from '../../../containers/EndUser/Order/CategoriesFields';
import InfoFields from '../../../containers/EndUser/Order/InfoFields';
import Summary from '../../../containers/EndUser/Order/Summary';

import { BASE_URL, debugMode } from '../../../../settings';
import axios from 'axios';
axios.defaults.withCredentials = true;

class OrderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {

            addressData: {
                pickupaddr: this.props.userInfo.address,
                zipcode: this.props.userInfo.zipcode,
                city: this.props.userInfo.city,
                phone: this.props.userInfo.phone,
                pickupInstructions: '',
                iscompany: 0,
            },

            values: [{

                category: '',
                subCat: '',
                proxySubCat: '',

                pcs: 1,
                size: "< 5",
                weight: "< 5",

                description: '',
                pic: ''

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
        this.saveAddressData = this.saveAddressData.bind(this);
        this.removeItem = this.removeItem.bind(this)

        this.setCategoriesSelected = this.setCategoriesSelected.bind(this);
        this.isButtonDisabled = this.isButtonDisabled.bind(this);
        this.imageExists = this.imageExists.bind(this);
    }

    componentDidMount() {

        let categoryUrlsExist = [];
        let proxyCategoryUrlsExist = [];

        for (let i = 0; i < this.props.categories.length; i++) {

            categoryUrlsExist[i] = this.imageExists(BASE_URL + "/images/categories/" + this.props.categories[i].ImgReference);
        }

        for (let j = 0; j < this.props.proxyCategories.length; j++) {
            proxyCategoryUrlsExist[j] = this.imageExists(BASE_URL + "/images/subcategories/" + this.props.proxyCategories[j].imgReference);
        }

        this.setState({
            categoryUrlsExist: categoryUrlsExist,
            proxyCategoryUrlsExist: proxyCategoryUrlsExist
        })
    }

    // checks if the image actually exists on the server
    async imageExists(image_url) {
        try {
            let result = await axios.get(image_url)
            /*let result = axios(image_url, {
                method: "get",
                withCredentials: true
            })*/
            let finalres = result.status !== 404
            return finalres
        }
        catch (error) {
            console.log(error)
        }

    }

    saveValues(value) {

        // take current state in a var
        let valueArray = this.state.values;
        // create a new object from the saved data
        let newObject = {

            'categoryId': value.categoryId,
            'subCategoryId': value.subCategoryId,
            'proxyCategoryId': value.proxyCategoryId,

            'category': value.category,
            'subCat': value.subCat,
            'proxySubCat': value.proxySubCat,

            'pcs': value.pcs,
            'size': value.size,
            'weight': value.weight,
            'description': value.description,

            'picture': value.picture
        }


        // save new object on the correct index
        valueArray[this.state.itemIndex] = newObject;

        this.setState({
            values: valueArray
        })

    }

    saveAddressData(value) {

        this.setState({
            addressData: {
                'pickupaddr': value.pickupaddr,
                'zipcode': value.zipcode,
                'city': value.city,
                'phone': value.phone,
                'pickupInstructions': value.pickupInstructions,
                'iscompany': value.iscompany
            }

        })

    }



    // proceed to next phase of the form
    // a safeguard against going paSt the final page is implemented, since the forward button disables too slowly
    nextStep = () => {
        if (this.state.step !== 4) {
            this.setState({
                step: this.state.step + 1
            })
        }
    }


    // proceed to previous phase of the form
    // a safeguard against going back from the first page is implemented, since the forward button disables too slowly
    prevStep = () => {
        if (this.state.step !== 1) {
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
            'category': "",
            'subCat': "",
            'proxySubCat': "",

            'pcs': 1,
            'size': "< 5",
            'weight': "< 5",

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
    // type tells us if the called function wants to know if it's active, or if it wants the styles
    isButtonDisabled(arrowDirection, type) {

        switch (arrowDirection) {
            case 0:

                // can't go back from the first page, or from the last page if no items are in "cart"
                if (this.state.step === 1 || (this.state.step === 4 && this.state.values.length < 1 ) ) {
                    if (type === 0) {
                        return true; // disabled true
                    } else {
                        return this.state.buttonDisabled
                    }
                } else {
                    if (type === 0) {
                        return false; // disabled false; button enabled
                    } else {
                        return this.state.buttonActive
                    }
                }

            case 1:
                if ((this.state.step === 1 && !this.state.pageOneAllFilled)
                    || (this.state.step === 2 && !this.state.categoriesSelected)
                    //|| this.state.step === 3
                    || this.state.step === 4
                ) {
                    if (type === 0) {
                        return true; // disabled true
                    } else {
                        return this.state.buttonDisabled
                    }
                } else {
                    if (type === 0) {
                        return false; // disabled false; button enabled
                    } else {
                        return this.state.buttonActive
                    }
                }
        }
    }


    removeItem(item) {

        let values = this.state.values;
        let newValues = [];
        let itemPassed = false;

        for (let i = 0; i < values.length; i++) {
            if (!itemPassed) {
                if (item !== i) {
                    newValues[i] = values[i]
                } else {
                    itemPassed = true
                }
            } else {
                newValues[i - 1] = values[i]
            }
        }

        this.setState({
            values: newValues,
            itemIndex: this.state.itemIndex - 1
        })
    }

    showSteps = () => {
        switch (this.state.step) {
            case 1:
                return < AddressFields
                    values={this.state.values[this.state.itemIndex]}
                    addressData={this.state.addressData}

                    nextStep={this.nextStep}
                    saveAddressData={this.saveAddressData}
                    setAllfilled={this.setAllFilled} />
            case 2:
                return < CategoriesFields
                    values={this.state.values[this.state.itemIndex]}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    setCategoriesSelected={this.setCategoriesSelected}

                    categories={this.props.categories}
                    proxyCategories={this.props.proxyCategories}

                    categoryUrlsExist={this.state.categoryUrlsExist}
                    proxyCategoryUrlsExist={this.state.proxyCategoryUrlsExist}
                />
            case 3:
                return < InfoFields
                    values={this.state.values[this.state.itemIndex]}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    saveButtonText={this.state.itemIndex === this.state.values.length - 1 ? "Lisää laite" : "Tallenna muutokset"} />
            case 4:
                return < Summary
                    values={this.state.values}
                    addressData={this.state.addressData}

                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    nextItem={this.nextItem}
                    editItem={this.editItem}
                    removeItem={this.removeItem}

                    toggleAllahuSnackbar={this.props.toggleAllahuSnackbar} />
        }
    }

    render() {


        // confirm you want to reload page, since data will be lost
        // pretty annoying during dev, but activate before build
        if (!debugMode) {
            window.onbeforeunload = function () {
                return "";
            };
        }

        const styles = {

            notActive: {
                borderRadius: 8,
                backgroundColor: '#FFF',
                width: '14%',
                height: '1.5vh',
                margin: 'auto',
                float: 'left',
                marginLeft: 10,
                marginRight: 10
            },
            Active: {
                backgroundColor: 'rgb(166, 206, 106)',
                borderRadius: 8,
                width: '14%',
                height: '1.5vh',
                margin: 'auto',
                float: 'left',
                marginLeft: 10,
                marginRight: 10
            }
        }
        return (



            <div className="orderWrapper">
                <div className="progressBar" style={{ maxWidth: '90vh', minWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="fab" style={this.isButtonDisabled(0, 1)} disabled={this.isButtonDisabled(0, 0)} onClick={this.prevStep}><Forward style={{ transform: "scaleX(-1)", height: '40px', width: '40px', color: '004225' }} /></Button>
                    <div className="state1" style={this.state.step === 1 ? styles.Active : styles.notActive}></div>
                    <div className="state2" style={this.state.step === 2 ? styles.Active : styles.notActive}></div>
                    <div className="state3" style={this.state.step === 3 ? styles.Active : styles.notActive}></div>
                    <div className="state4" style={this.state.step === 4 ? styles.Active : styles.notActive}></div>
                    <Button variant="fab" style={this.isButtonDisabled(1, 1)}
                        disabled={this.isButtonDisabled(1, 0)} onClick={this.nextStep}><Forward style={{ height: '40px', width: '40px', color: '004225' }} /></Button>
                </div>
                <div className="frontPageBox" >{this.showSteps()}</div>
            </div>
        );
    }
}
export default OrderMain;
