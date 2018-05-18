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

// tee dropdownmenu

class InfoFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    nextStep(event) {
        event.preventDefault();
        console.log("nextStep");
        var data = {
            address: this.state.address,
            zipcode: this.state.zipcode,
            city: this.state.city,
            phone: this.state.phone,
            pickup: this.state.pickup
        }
        console.log(data);
        console.log(this.props);
        //console.log(this.props.values);
        this.props.saveValues(data);
        this.props.nextStep()

    }

    componentDidMount() {
        this.setState({
            'address': this.props.values.address,
            'zipcode': this.props.values.zipcode,
            'city': this.props.values.city,
            'phone': this.props.values.phone,
            'pickup': this.props.values.pickup
        })
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
            }
        };

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td style={styles.tdStyle} ><label className="leftOrderLabel">Hakuosoite:</label></td>
                            <td>   <TextField className="rightOrderField"
                                type="text" hintText="Ståhlberginkatu 10"
                                style={styles} defaultValue={this.props.values.address}
                                onChange={(event, newValue) => this.setState({ address: newValue })}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Postinumero:</label></td>
                            <td>  <TextField className="rightOrderField"
                                type="text" hintText="15110" style={styles}
                                defaultValue={this.props.values.zipcode}
                                onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Postitoimipaikka:</label></td>
                            <td> <TextField className="rightOrderField"
                                type="text" hintText="Lahti" style={styles}
                                defaultValue={this.props.values.city}
                                onChange={(event, newValue) => this.setState({ city: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Puhelinnumero:</label></td>
                            <td>   <TextField className="rightOrderField"
                                type="text" hintText="044 708 1347​" style={styles}
                                defaultValue={this.props.values.phone}
                                onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="leftOrderLabel">Lisätietoja</label></td>
                            <td>    <TextField className="rightOrderField"
                                type="text" hintText='Televisio 32" tai liesi 60cm' style={styles}
                                rows={3} rowsMax={7} defaultValue={this.props.values.desc}
                                onChange={(event, newValue) => this.setState({ pickup: newValue })} /><br /><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

export default InfoFields;
