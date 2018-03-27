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

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            phone: '',
            streetAddress: '',
            zipcode: '',
            city: '',
            submitted: false
        };
    }

    handleChange(event) {
    }

    Submit(event) {
        var regData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            streetAddress: this.state.streetAddress,
            zipcode: this.state.zipcode,
            city: this.state.city
        }
        console.log(regData);
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
                            <td>  <label className="leftRegisterLabel">Etunimi: </label> </td>
                            <td>   <TextField className="rightRegisterField" 
                            type="text" hintText="esim. Matti" style={styles}
                            style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ firstName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Sukunimi: </label> </td>
                                <td>  <TextField className="rightRegisterField" 
                                type="text" hintText="esim. Meikäläinen" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ lastName: newValue })} />
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
                                 </td>
                                <td>   <TextField className="rightRegisterField" 
                                type="password" hintText="Valitsemasi salasana" style={styles}
                                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
                                    onChange={(event, newValue) => this.setState({ password: newValue })} />
                                    
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

export default Register;