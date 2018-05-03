import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { sendRegData } from '../../../utils/sendRegData';
import styles from '../../../index.css';
import { Checkbox } from 'material-ui';

class Register extends React.Component {
    constructor(props) {
        super(props);

        // if more states are added, make sure they don't clash with form submit checker
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            password2: '',
            phone: '',
            streetAddress: '',
            zipcode: '',
            city: '',

            submitted: false,
            termsAndConditions: false,
            allFilled: false,

            emailValid: false,
            phoneNumberValid: false
        };
        this.checkFill = this.checkFill.bind(this);
        this.emailCheck = this.emailCheck.bind(this);
        this.emailChange = this.emailChange.bind(this);
    }

    componentDidUpdate() {
        this.checkFill();
    }

    updateCheckConfirm() {
        this.setState((oldState) => {
            return {
                termsAndConditions: !oldState.termsAndConditions,
            };
        });
    }

    Cancel(event) {
        this.props.onNewLogin({
            userlvl: -1
        });
    }



    // function, that checks if all fields are filled, and updates allFilled -state accordingly
    checkFill() {
        let pass = true;
        for (var key in this.state) {
            if (this.state[key] === '') {
                pass = false;
            }
        }
        if (pass && !this.state.allFilled && this.state.emailValid) {
            this.setState({ allFilled: true })
        } else if ((!pass || !this.state.emailValid) && this.state.allFilled) {
            this.setState({ termsAndConditions: false, allFilled: false })
        }
    }

    emailChange(newValue){
        
        this.setState({ email: newValue});
        this.emailCheck();
        return this.state.email;
    }

    emailCheck(){
        let email = this.state.email;
        let pass;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        pass = re.test(String(email).toLowerCase());

        if(this.state.emailValid != pass){
            this.setState({ emailValid: pass})
        }
        
    }


    Submit(event) {


        if (this.state.allFilled) {
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

        const registerInactive = {
            borderRadius: '0',
            textAlign: 'center',
            backgroundColor: "grey",
            //border: '2px solid #004225',
            margin: '15px'

        };

        const registerActive = {
            borderRadius: '0',
            textAlign: 'center',
            backgroundColor: "#004225",
            border: '0px solid #004225',
            margin: '15px'


        };

        const styles = {
            /*
            width: 250, backgroundColor: '#FFFFFF', borderRadius: 0,
            borderWidth: 0.5, border: '2px solid #004225',
            borderColor: '#d6d7da'
            */
            borderRadius: '0',
            backgroundColor: 'white',
            border: '2px solid #004225'
        };

        return (
            <div className="registerWrapper">

                <AppBar style={{ backgroundColor: '#FFF' }}
                    title={<div className="app-bar-title">Rekisteröityminen</div>}
                    showMenuIconButton={false}
                />



                <table className="registerStructure">
                    <tbody>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Etunimi*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. Matti" style={styles}
                                    onChange={(event, newValue) => this.setState({ firstName: newValue })} />

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Sukunimi*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. Meikäläinen" style={styles}
                                    onChange={(event, newValue) => this.setState({ lastName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Sähköposti*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. etunimi.sukunimi@lamk.fi" style={styles}
                                    onChange={ (event, newValue) => this.emailChange(newValue ) } />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Puhelinnumero*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. 044 708 1347​" style={styles}
                                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Katuosoite*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. Ståhlberginkatu 10" style={styles}
                                    onChange={(event, newValue) => this.setState({ streetAddress: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Postinumero*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. 15110" style={styles}
                                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Postitoimipaikka*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="esim. Lahti" style={styles}
                                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Salasana*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="password" hintText="Valitsemasi salasana" style={styles}
                                    onChange={(event, newValue) => this.setState({ password: newValue })} />

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Salasana uudelleen*: </label>
                            </td>
                            <td>
                                <TextField className="rightRegisterField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="password" hintText="Valitsemasi salasana uudelleen" style={styles}
                                    onChange={(event, newValue) => this.setState({ password2: newValue })} />

                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                            <td>
                                <Checkbox style={{ width: '70%', fontWeight: 400 }}
                                    labelStyle={{
                                        fontFamily: 'kanit',
                                        float: 'left',
                                        borderRadius: '0',
                                        fontSize: '12px',
                                        color: '#004225'
                                    }}
                                    id="confirmationCheck"
                                    iconStyle={{ fill: '#004225' }}
                                    checked={this.state.termsAndConditions}
                                    onCheck={this.updateCheckConfirm.bind(this)}
                                    label="Vakuutan edellä antamani tiedot oikeiksi, ja hyväksyn palvelun käyttöehdot."
                                    disabled={!this.state.allFilled}
                                />

                            </td>
                        </tr>
                    </tbody>
                </table>

                <FlatButton className="cancelButton"
                    label="Peruuta"
                    hoverColor="#004225"
                    backgroundColor="#004225"
                    style={{ margin: '15px' }}
                    labelStyle={{
                        fontFamily: 'kanit',
                        float: 'left',
                        borderRadius: '0',
                        fontSize: '17px',
                        color: '#FFFFFF'
                    }}
                    onClick={(event) => this.Cancel(event)} />
                <FlatButton className="registerButton"
                    label="Rekisteröidy"
                    labelStyle={{
                        fontFamily: 'kanit',
                        float: 'left',
                        borderRadius: '0',
                        fontSize: '17px',
                        color: '#FFFFFF'
                    }}
                    
                    disabled={!this.state.termsAndConditions}

                    style={this.state.termsAndConditions ? registerActive : registerInactive}

                    onClick={(event) => this.Submit(event)} />
                <br />

            </div >

        );
    }
}

export default Register;