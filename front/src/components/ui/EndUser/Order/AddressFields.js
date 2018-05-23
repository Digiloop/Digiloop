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
            allFilled: false,
            isCompany: null
        };
        this.checkFill = this.checkFill.bind(this);
    }


    nextStep = () => (e) => {
        this.checkFill();
        e.preventDefault();
        if (!this.state.allFilled) {
            window.alert("kaik täytyyp täyttää");
        } else {
            console.log("nextStep");
            var data = {
                pickupaddr: this.state.pickupaddr,
                zipcode: this.state.zipcode,
                city: this.state.city,
                phone: this.state.phone,
                pickupInstructions: this.state.pickupInstructions,
                iscompany: this.state.isCompany
            }
            console.log(this.state.isCompany);
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    checkFill() {
        console.log("state:")
        console.log(this.state);
        let pass = true;
        for (var key in this.state) {
            if (this.state[key] === '' || this.state[key] === undefined || this.state[key] === null) {
                if (this.state[key] === this.state.pickupInstructions) continue;
                pass = false;
            }
        }
        if (pass && !this.state.allFilled) {
            this.setState({ allFilled: true })
            this.props.setAllfilled(true);
        } else if (!pass && this.state.allFilled) {
            this.setState({ allFilled: false })
            this.props.setAllfilled(false);
        }
    }

    componentDidUpdate() {
        this.checkFill();
    }

    componentDidMount() {
        this.checkFill();
        this.setState({
            'pickupaddr': this.props.values.pickupaddr,
            'zipcode': this.props.values.zipcode,
            'city': this.props.values.city,
            'phone': this.props.values.phone,
            'pickupInstructions': this.props.values.pickupInstructions
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
                                style={styles} defaultValue={this.props.values.pickupaddr}
                                onChange={(event, newValue) => this.setState({ pickupaddr: newValue })}
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
                                multiLine={true} rows={3} rowsMax={7} defaultValue={this.props.values.pickupInstructions}
                                onChange={(event, newValue) => this.setState({ pickupInstructions: newValue })} /><br /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={require('../Materials/OrderPics/home2.gif')}
                                    style={styles.images}
                                    className="image-btn btn"
                                    alt="Kotitalous"
                                    onClick={() => this.setState({isCompany: 0})}
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
                                    onClick={() => this.setState({isCompany: 1})}
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
