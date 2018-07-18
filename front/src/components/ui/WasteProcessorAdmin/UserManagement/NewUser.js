import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Dialog, DialogTitle } from '@material-ui/core';
import { Checkbox } from 'material-ui';

import { companyUser } from '../../../../utils/wasteprocessorRegister'

class NewUser extends Component {
    constructor(props) {
        super(props);

        // if more states are added, make sure they don't clash with form submit checker
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',

            submitted: false,
            termsAndConditions: false,
            allFilled: false,

            emailValid: false,
            phoneNumberValid: false,
            open: false,
            successOpen: false
        };
        this.checkFill = this.checkFill.bind(this);
        this.emailCheck = this.emailCheck.bind(this);
        //this.emailChange = this.emailChange.bind(this);
    }



    componentDidUpdate() {
        this.emailCheck();
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
        /* this.props.onNewLogin({
            userlvl: -1
        });*/
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

    emailCheck() {
        let email = this.state.email;
        let pass;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        pass = re.test(String(email).toLowerCase());

        if (this.state.emailValid !== pass) {
            this.setState({ emailValid: pass })
        }

    }


    Submit(event) {


        if (this.state.allFilled) {
            var compUser = {
                fname: this.state.firstName,
                lname: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                address: this.props.companyInfo.address,
                zipcode: this.props.companyInfo.zipcode,
                city: this.props.companyInfo.city
            }
            console.log(compUser);
            companyUser(compUser).then((res) => {
                console.log(res);
                if (res.status === 401) {
                    this.handleDialogOpen();
                }
                else if (res.status === 200) {
                    this.handleSuccessDialogOpen();
                } else {
                    window.alert('Jotain meni vikaan!')
                }
            });

        } else {
            window.alert("Ei saa jättää lootia tyhjiksi!");
        }

    }

    // open dialog
    handleDialogOpen = () => {
        this.setState({ open: true })
    }

    // close dialog
    handleDialogClose = () => {
        this.setState({ open: false })
    }

    // open successdialog
    handleSuccessDialogOpen = () => {
        this.setState({ successOpen: true })
    }

    // close successdialog
    handleSuccessDialogClose = () => {
        this.setState({ successOpen: false })
        /* this.props.onNewLogin({
            userlvl: -1
        });*/
    }




    render() {

        const registerInactive = {
            borderRadius: '0',
            textAlign: 'center',
            backgroundColor: "grey",
            margin: '15px'

        };

        const registerActive = {
            borderRadius: '0',
            textAlign: 'center',
            backgroundColor: "#FFF",
            margin: '15px'


        };

        const styles = {
            borderRadius: '0',
            backgroundColor: 'white',
            border: '2px solid #004225'
        };


        return (
            <div className="updateWrapper">

                <h1>Lisää käyttäjä</h1>

                <table className="updateStructure">
                    <tbody>
                        <tr>
                            <td>
                                <label className="leftUpdateLabel">Etunimi*: </label>
                            </td>
                            <td>
                                <TextField className="rightUpdateField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="Matti" style={styles}
                                    onChange={(event, newValue) => this.setState({ firstName: newValue })} />

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftUpdateLabel">Sukunimi*: </label>
                            </td>
                            <td>
                                <TextField className="rightUpdateField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="Meikäläinen" style={styles}
                                    onChange={(event, newValue) => this.setState({ lastName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftUpdateLabel">Sähköposti*: </label>
                            </td>
                            <td>
                                <TextField className="rightUpdateField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="etunimi.sukunimi@email.com" style={styles}
                                    onChange={(event, newValue) => this.setState({ email: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftUpdateLabel">Puhelinnumero*: </label>
                            </td>
                            <td>
                                <TextField className="rightUpdateField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="text" hintText="044 708 1347​" style={styles}
                                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftUpdateLabel">Salasana*: </label>
                            </td>
                            <td>
                                <TextField className="rightUpdateField"
                                    underlineStyle={{ borderColor: '#A6CE6B' }}
                                    underlineFocusStyle={{ borderColor: '#004225' }}
                                    type="password" hintText="Salasana" style={styles}
                                    onChange={(event, newValue) => this.setState({ password: newValue })} />
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

                <FlatButton className="cancelUpdateButton"
                    label="Peruuta"
                    hoverColor="#FFF"
                    backgroundColor="#FFF"
                    style={{ margin: '15px' }}
                    labelStyle={{
                        fontFamily: 'kanit',
                        float: 'left',
                        borderRadius: '0',
                        fontSize: '17px',
                        color: '#004225'
                    }}
                    onClick={(event) => this.Cancel(event)} />

                <FlatButton className="updateButton"
                    label="Rekisteröidy"
                    labelStyle={{
                        fontFamily: 'kanit',
                        float: 'left',
                        borderRadius: '0',
                        fontSize: '17px',
                        color: '#004225'
                    }}

                    disabled={!this.state.termsAndConditions}

                    style={this.state.termsAndConditions ? registerActive : registerInactive}

                    onClick={(event) => this.Submit(event)} />
                <br />

                <Dialog key={'i'} // if email is already in use
                    style={{ visibility: 'visible' }}
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    fullWidth={true}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle>Antamasi sähköposti {this.state.email} on jo käytössä.</DialogTitle>
                </Dialog >


                <Dialog key={'s'} // if registration is success
                    style={{ visibility: 'visible' }}
                    open={this.state.successOpen}
                    onClose={this.handleSuccessDialogClose}
                    fullWidth={true}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle>Rekisteröityminen onnistui.</DialogTitle>
                </Dialog >

            </div >

        );
    }
}

export default NewUser;