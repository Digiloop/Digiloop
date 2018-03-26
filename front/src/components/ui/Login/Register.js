import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import { sendRegData } from '../../../utils/sendRegData';

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
            <div className="Container">
                <table>
                    <tbody>
                        <tr>
                            <td><label>Etunimi</label><br/>
                                <TextField type="text" hintText="Etunimi" style={styles}
                                    onChange={(event, newValue) => this.setState({ firstName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Sukunimi</label><br/>
                                <TextField type="text" hintText="Sukunimi" style={styles}
                                    onChange={(event, newValue) => this.setState({ lastName: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Sähköposti</label><br/>
                                <TextField type="text" hintText="Sähköposti" style={styles}
                                    onChange={(event, newValue) => this.setState({ email: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Puhelinnumero</label><br/>
                                <TextField type="text" hintText="Puhelinnumero" style={styles}
                                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Katuosoite</label><br/>
                                <TextField type="text" hintText="Katuosoite" style={styles}
                                    onChange={(event, newValue) => this.setState({ streetAddress: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Postinumero</label><br/>
                                <TextField type="text" hintText="Postinumero" style={styles}
                                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Kaupunki</label><br/>
                                <TextField type="text" hintText="Kaupunki" style={styles}
                                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Salasana</label><br/>
                                <TextField type="password" hintText="Salasana" style={styles}
                                    onChange={(event, newValue) => this.setState({ password: newValue })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <RaisedButton onClick={(event) => this.Submit(event)}>Lähetä</RaisedButton>
            </div >
        );
    }
}

export default Register;