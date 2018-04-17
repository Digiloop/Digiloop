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

class WasteRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            corpName: '',
            ytunnus: '',
            streetAddress: '',
            zipcode: '',
            city: '',
            contName: '',
            email: '',
            phone: '',
            submitted: false,
            Status: ''
        };
    }

    handleChange(event) {
    }

    Submit(event) {
        var regData = {
            "username" : this.state.email,
            "fname" : this.state.firstName,
            "lname" : this.state.lastName,
            "email" : this.state.email,
            "phone" : this.state.phone,
            "address" : this.state.streetAddress,
            "zipcode" : this.state.zipcode,
            "city" : this.state.city,
            "company" : "99",
            "userlvl" : "2",
            "Status" : "0",
            "ytunnus" : this.state.ytunnus
        }
        console.log(JSON.stringify(regData));
        sendRegData(JSON.stringify(regData));
    }

    render() {

        const styles = {
            width: 250, backgroundColor: '#FFFFFF', borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da'
        };

        return (
            <div className="registerWrapper">

            <AppBar style={{backgroundColor: '#FFF'}}
             title={<div className="app-bar-title">Rekisteröityminen</div>}
             showMenuIconButton={false}
           />

            <div className="Container">

                <table className="registerStructure">
                    <tbody>
                        <tr>
                            <td>  <label className="leftRegisterLabel">Yrityksen nimi: </label> </td>
                            <td>   <TextField className="rightRegisterField"
                            type="text" hintText="esim. Matti" style={styles}
                            style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ corpName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>  <label className="leftRegisterLabel">Y-tunnus: </label> </td>
                            <td>   <TextField className="rightRegisterField"
                            type="text" hintText="Kyl pitäis tietää" style={styles}
                            style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ ytunnus: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Katuosoite: </label></td>
                                <td>    <TextField className="rightRegisterField"
                                type="text" hintText="esim. Ståhlberginkatu 10" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ streetAddress: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Postinumero: </label></td>
                                <td>   <TextField className="rightRegisterField"
                                type="text" hintText="esim. 15110" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Kaupunki: </label></td>
                                <td>   <TextField  className="rightRegisterField"
                                 type="text" hintText="esim. Lahti" style={styles}
                                 style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Yhteyshenkilö: </label> </td>
                                <td>  <TextField className="rightRegisterField"
                                type="text" hintText="esim. Matti Meikäläinen" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ contName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Sähköposti: </label> </td>
                                <td> <TextField className="rightRegisterField"
                                type="text" hintText="esim. etunimi.sukunimi@lamk.fi" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ email: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Puhelinnumero: </label> </td>
                                <td>   <TextField className="rightRegisterField"
                                type="text" hintText="esim. 044 708 1347​" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <FlatButton className="registerButton"
                label= "Rekisteröidy"
                backgroundColor="#FFFFFF"
                style={{ borderRadius: '0',
                textAlign: 'center',
                backgroundColor: 'white',
                border: '2px solid #004225',
                fontFamily: 'kanit',
                borderRadius: '0',
                fontSize: '18px',
                color: '#004225',

}}
                onClick={(event) => this.Submit(event)} />
            </div >
            </div >
        );
    }
}

export default WasteRegister;
