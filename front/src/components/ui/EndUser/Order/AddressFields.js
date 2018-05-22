import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from '../../../../index.css';


class AddressFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            allFilled: false
        };
        this.checkFill = this.checkFill.bind(this);
    }

    nextStep = (Organisaatio) => (e) => {
        this.checkFill();
        e.preventDefault();
        if (!this.state.allFilled) {
            window.alert("kaik täytyy täyttää");
        } else {
            console.log("nextStep");
            var data = {
                address: this.state.address,
                zipcode: this.state.zipcode,
                city: this.state.city,
                phone: this.state.phone,
                pickup: this.state.pickup,
                organization: Organisaatio
            }
            console.log(data);
            console.log(this.props);
            //console.log(this.props.values);
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    checkFill() {
        let pass = true;
        for (var key in this.state) {
            if (this.state[key] === '' || this.state[key] === undefined || this.state[key] === null) {
                if (this.state[key] === this.state.pickup) continue;
                pass = false;
            }
        }
        if (pass && !this.state.allFilled) {
            this.setState({ allFilled: true })
        } else if (!pass && this.state.allFilled) {
            this.setState({ allFilled: false })
        }
    }

    componentDidUpdate() {
        this.checkFill();
    }

    componentDidMount() {
        this.checkFill();
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
                            <td><label className="leftOrderLabel">Nouto-ohjeet:</label></td>
                            <td>    <TextField className="rightOrderField"
                                type="text" hintText="Perjantai 30.4 klo 16:30. Käynti pääovesta. " style={styles}
                                rows={3} rowsMax={7} defaultValue={this.props.values.pickup}
                                onChange={(event, newValue) => this.setState({ pickup: newValue })} /><br /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={require('../Materials/OrderPics/home2.gif')}
                                    style={styles.images}
                                    className="image-btn btn"
                                    alt="Kotitalous"
                                    onClick={this.nextStep('Kotitalous')}
                                />
                            </td>
                            <td >
                                <img
                                    src={require('../Materials/OrderPics/organization2.gif')}
                                    style={{
                                        borderRadius: 4, border: '6px solid white', marginLeft: '20%',
                                        textAlign: 'center', width: '70%'
                                    }}
                                    className="image-btn btn"
                                    alt="Organisaatio"
                                    onClick={this.nextStep('Organisaatio')}
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
