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

    nextStep = (e) => {
        e.preventDefault();

        // this.props.saveValues(data);
        this.props.nextStep()
    }

    render() {

        const styles = {
            width: 250,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da'
        };

        const progress = {
            borderRadius: 4, backgroundColor: 'rgb(166, 206, 106)', width: '10%', height: '1.5vh', margin: 5, float: 'left'
        }
        return (
                <div className="Container">
                    <table className="orderStructure">
                        <tbody>
                            <tr>
                                <td><label className="leftOrderLabel">Hakuosoite:</label></td>
                                <td>   <TextField className="rightOrderField"
                                    type="text" hintText="esim. Ståhlberginkatu 10"
                                     style={styles}
                                    onChange={(event, newValue) => this.setState({ address: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="leftOrderLabel">Postinumero:</label></td>
                                <td>  <TextField className="rightOrderField"
                                    type="text" hintText="esim. 15110" style={styles}
                                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="leftOrderLabel">Postitoimipaikka:</label></td>
                                <td> <TextField className="rightOrderField"
                                    type="text" hintText="esim. Lahti" style={styles}
                                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="leftOrderLabel">Puhelinnumero:</label></td>
                                <td>   <TextField className="rightOrderField"
                                    type="text" hintText="esim. 044 708 1347​" style={styles}
                                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="leftOrderLabel">Nouto-ohjeet:</label></td>
                                <td>    <TextField className="rightOrderField"
                                    type="text" hintText="esim. Perjantai 30.4 klo 16:30. Käynti pääovesta. " style={styles}
                                    rows={3} rowsMax={7}
                                    onChange={(event, newValue) => this.setState({ pickup: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img
                                        src={require('../Materials/OrderPics/home2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={this.nextStep}
                                    />
                                </td>
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img
                                        src={require('../Materials/OrderPics/organization2.gif')}
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
