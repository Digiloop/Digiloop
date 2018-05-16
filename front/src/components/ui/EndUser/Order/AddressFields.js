import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import { sendRegData } from '../../../../utils/sendRegData';
import styles from '../../../../index.css';


class AddressFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };
    }

    handleChange(event) {
    }

    nextStep(event) {

        var data = {
            'address': this.state.address,
            'zipcode': this.state.zipcode,
            'city': this.state.city,
            'phone': this.state.phone,
            'pickup': this.state.pickup
        }
        console.log(this.state.data);
        // this.props.saveValues(data);

        this.props.nextStep()
    }

    render() {

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
            },
            images: {
                borderRadius: 4,
                border: '6px solid white',
                marginLeft: '10%',
                textAlign: 'center',
                width: '100%'
            }
        };

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td style={styles.tdStyle} ><label className="leftOrderLabel">Hakuosoite:</label></td>
                            <td>   <TextField className="rightOrderField"
                                type="text" hintText="esim. Ståhlberginkatu 10"
                                style={styles} defaultValue={this.props.address}
                                onChange={(event, newValue) => this.setState({ address: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Postinumero:</label></td>
                            <td>  <TextField className="rightOrderField"
                                type="text" hintText="esim. 15110" style={styles}
                                defaultValue={this.props.userInfo.zipcode}
                                onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Postitoimipaikka:</label></td>
                            <td> <TextField className="rightOrderField"
                                type="text" hintText="esim. Lahti" style={styles}
                                defaultValue={this.props.userInfo.city}
                                onChange={(event, newValue) => this.setState({ city: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Puhelinnumero:</label></td>
                            <td>   <TextField className="rightOrderField"
                                type="text" hintText="esim. 044 708 1347​" style={styles}
                                defaultValue={this.props.userInfo.phone}
                                onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Nouto-ohjeet:</label></td>
                            <td>    <TextField className="rightOrderField"
                                type="text" hintText="esim. Perjantai 30.4 klo 16:30. Käynti pääovesta. " style={styles}
                                rows={3} rowsMax={7}
                                onChange={(event, newValue) => this.setState({ pickup: newValue })} /><br /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={require('../Materials/OrderPics/home2.gif')}
                                    style={styles.images}
                                    className="image-btn btn"
                                    alt="Special button"
                                    onClick={(event) => this.nextStep(event)}
                                />
                            </td>
                            <td >
                                <img
                                    src={require('../Materials/OrderPics/organization2.gif')}
                                    style={{
                                        borderRadius: 4, border: '6px solid white', marginLeft: '20%',
                                        textAlign: 'center', width: '65%'
                                    }}
                                    className="image-btn btn"
                                    alt="Special button"
                                    onClick={this.nextStep}
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
