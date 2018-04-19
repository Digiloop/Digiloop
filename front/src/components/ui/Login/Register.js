import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import { sendRegData } from '../../../utils/sendRegData';
import styles from '../../../index.css';
import { Checkbox } from 'material-ui';

class Register extends React.Component {
    constructor(props) {
        super(props);

        // if more states are added, mare sure they don't clash with form submit checker
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            phone: '',
            streetAddress: '',
            zipcode: '',
            city: '',
            submitted: false,
            termsAndConditions: false
        };
    }

    handleChange(event) {
    }

    Cancel(event) {
        this.props.onNewLogin({
            userlvl: -1
        });
    }

    Submit(event) {

        let pass = true;
        for (var key in this.state) {
            if (this.state[key] === '') {
                pass = false;
            }
        }


        if (pass) {
            var regData = {
                "password": this.state.password,
                "fname": this.state.firstName,
                "lname": this.state.lastName,
                "email": this.state.email,
                "phone": this.state.phone,
                "address": this.state.streetAddress,
                "zipcode": this.state.zipcode,
                "city": this.state.city,
                "company": "99",
                "userlvl": "2",
                "Status": "0"
            }
            console.log(JSON.stringify(regData));
            sendRegData(JSON.stringify(regData));
            window.alert("Hyvin rekisteröidytty!");
            this.props.onNewLogin({
                userlvl: -1
            });
        } else {
            window.alert("Ei saa jättää lootia tyhjiksi!");
        }

    }

    render() {

        const styles = {
            width: 250, backgroundColor: '#FFFFFF', borderRadius: 0,
            borderWidth: 0.5, border: '2px solid #004225',
            borderColor: '#d6d7da'
        };

        return (
            <div className="registerWrapper">

                <AppBar style={{ backgroundColor: '#FFF' }}
                    title={<div className="app-bar-title">Rekisteröityminen</div>}
                    showMenuIconButton={false}
                />

                <div className="Container">

                    <table className="registerStructure">
                        <tbody>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Etunimi: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. Matti" style={styles}
                                        onChange={(event, newValue) => this.setState({ firstName: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Sukunimi: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. Meikäläinen" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ lastName: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Sähköposti: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. etunimi.sukunimi@lamk.fi" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ email: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Puhelinnumero: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. 044 708 1347​" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ phone: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Katuosoite: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. Ståhlberginkatu 10" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ streetAddress: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Postinumero: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. 15110" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Postitoimipaikka: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="text" hintText="esim. Lahti" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ city: newValue })} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Salasana: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="password" hintText="Valitsemasi salasana" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ password: newValue })} />

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="leftRegisterLabel">Salasana uudelleen: </label>
                                </td>
                                <td>
                                    <TextField className="rightRegisterField"
                                        type="password" hintText="Valitsemasi salasana uudelleen" style={styles}
                                        style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                                        onChange={(event, newValue) => this.setState({ password2: newValue })} />

                                </td>
                            </tr>
                            <tr>
                                <td>

                                </td>
                                <td>
                                    <Checkbox
                                    label= "Vakuutan, että edellä antamani tiedot ovat oikein."
                                    disabled={true}
                                    />

                                </td>
                            </tr>
                            <tr>
                                <td>

                                </td>
                                <td>
                                    <FlatButton className="cancelButton"
                                        label="Peruuta"
                                        backgroundColor="#FFFFFF"
                                        style={{
                                            borderRadius: '0',
                                            textAlign: 'center',
                                            backgroundColor: 'white',
                                            border: '2px solid #004225',
                                            fontFamily: 'kanit',
                                            borderRadius: '0',
                                            fontSize: '18px',
                                            color: '#004225',

                                        }}
                                        onClick={(event) => this.Cancel(event)} />
                                    <FlatButton className="registerButton"
                                        label="Rekisteröidy"
                                        backgroundColor="#FFFFFF"
                                        style={{
                                            borderRadius: '0',
                                            textAlign: 'center',
                                            backgroundColor: 'white',
                                            border: '2px solid #004225',
                                            fontFamily: 'kanit',
                                            borderRadius: '0',
                                            fontSize: '18px',
                                            color: '#004225',

                                        }}
                                        onClick={(event) => this.Submit(event)} />

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div >
            </div >
        );
    }
}

export default Register;