import React from 'react';
import TextField from 'material-ui/TextField';



class AddressFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allFilled: false,
            isCompany: null
        };
        this.checkFill = this.checkFill.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    // Updates the input fields, used by onChange -events of each field
    updateField(fieldName, newValue) {
        this.setState({ [fieldName]: newValue }, function () {
            this.checkFill(); // check's if all the fields are filled
        })
    }

    // check that all fields are filled
    // if so, give OrderMain the order to enable the forward arrow
    checkFill() {

        let pass = true;
        for (var key in this.state) {
            if (this.state[key] === '' || this.state[key] === undefined || this.state[key] === null) {
                if (this.state[key] === this.state.pickupInstructions) continue;
                pass = false;
            }
        }

        // setting state is probably deprecated now, originally used to prevent infinite loops via calling checkfill()
        // in ComponentDidMount(). Maybe better to leave it, as it prevents unnecessary state updates, even if it
        // is not infinite anymore
        // Also updates allFilled -state in OrderMain.js if necessary
        if (pass && !this.state.allFilled) {
            this.setState({ allFilled: true })
            this.props.setAllfilled(true);
        } else if (!pass && this.state.allFilled) {
            this.setState({ allFilled: false })
            this.props.setAllfilled(false);
        }

        // save the data in OrderMain.js' state
        // it shouldn't matter if it's incomplete, since it will save after each edit to fields and
        // since the checkfill won't let forward unless all fields are good to go
        var data = {
            pickupaddr: this.state.pickupaddr,
            zipcode: this.state.zipcode,
            city: this.state.city,
            phone: this.state.phone,
            pickupInstructions: this.state.pickupInstructions,
            iscompany: this.state.isCompany
        }
        this.props.saveValues(data);


    }

    // Initialize the data from user's profile
    componentDidMount() {
        this.setState({
            'pickupaddr': this.props.values.pickupaddr,
            'zipcode': this.props.values.zipcode,
            'city': this.props.values.city,
            'phone': this.props.values.phone
        })
    }


    render() {

        // not used?
        const styles = {
            width: '98%',
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da',

            tdStyle: {
                width: '40%'
            },
            trStyle: {
                display: 'block',
                width: '98%',
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                marginTop: '10vh'
            }
        };

        // styles for active/inactive company selector
        const isCompanyStyle = {
            borderRadius: 4,
            border: '6px solid white',
            marginLeft: '10%',
            textAlign: 'center',
            maxWidth: '80%',
            minWidth: '45%'
        }
        const isCompanyStyleActive = {
            borderRadius: 4,
            border: '6px solid red',
            marginLeft: '5%',
            textAlign: 'center',
            maxWidth: '80%',
            minWidth: '45%'
        }


        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td style={styles.tdStyle} ><label className="leftOrderLabel">Hakuosoite:</label></td>
                            <td>   <TextField className="rightOrderField"
                                type="text" hintText="Ståhlberginkatu 10"
                                style={styles} defaultValue={this.props.values.pickupaddr}
                                onChange={(event, newValue) => this.updateField("pickupaddr", newValue)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Postinumero:</label></td>
                            <td>  <TextField className="rightOrderField"
                                type="text" hintText="15110" style={styles}
                                defaultValue={this.props.values.zipcode}
                                onChange={(event, newValue) => this.updateField("zipcode", newValue)} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Postitoimipaikka:</label></td>
                            <td> <TextField className="rightOrderField"
                                type="text" hintText="Lahti" style={styles}
                                defaultValue={this.props.values.city}
                                onChange={(event, newValue) => this.updateField("city", newValue)} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Puhelinnumero:</label></td>
                            <td>   <TextField className="rightOrderField"
                                type="text" hintText="044 708 1347​" style={styles}
                                defaultValue={this.props.values.phone}
                                onChange={(event, newValue) => this.updateField("phone", newValue)} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Nouto-ohjeet:</label></td>
                            <td>    <TextField className="rightOrderField"
                                type="text" hintText="Perjantai 30.4 klo 16:30. Käynti pääovesta. " style={styles}
                                multiLine={true} rows={3} rowsMax={7} defaultValue={this.props.values.pickupInstructions}
                                onChange={(event, newValue) => this.updateField("pickupInstructions", newValue)} /><br /><br />
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '50%'}}>
                                <img
                                    src={require('../Materials/OrderPics/home2.gif')}
                                    style={this.state.isCompany === 0 ? isCompanyStyleActive : isCompanyStyle}
                                    className="image-btn btn"
                                    alt="Kotitalous"
                                    onClick={(e) => this.updateField("isCompany", 0)}
                                />
                            </td>
                            <td style={{width: '50%'}}>
                                <img
                                    src={require('../Materials/OrderPics/organization2.gif')}
                                    style={this.state.isCompany === 1 ? isCompanyStyleActive : isCompanyStyle}
                                    className="image-btn btn"
                                    alt="Organisaatio"
                                    onClick={(e) => this.updateField("isCompany", 1)}
                                />
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div >
        );
    }
}

export default AddressFields;
