import React from 'react';
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


class Order1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            zipcode: '',
            city: '',
            phone: '',
            pickup: '',
            submitted: false
        };
    }

    handleChange(event) {
    }

    Submit(event) {
        var regData = {
            address: this.state.address,
            zipcode: this.state.zipcode,
            city: this.state.city,
            phone: this.state.phone,
            pickup: this.state.pickup,
        }
        console.log(regData);
    }

    render() {

        const styles = {
            width: 250,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da'
        };

        return (
            <div className="registerWrapper">

            <AppBar style={{backgroundColor: '#FFF'}}
             title={<div className="app-bar-title">Noutolomake</div>}
             showMenuIconButton={false}
           />


            <div className="Container">

                <table className="registerStructure">
                    <tbody>
                        <tr>
                            <td>  <label className="leftRegisterLabel">Hakuosoite: </label> </td>
                            <td>   <TextField className="rightRegisterField"
                            type="text" hintText="esim. Ståhlberginkatu 10" style={styles}
                                    onChange={(event, newValue) => this.setState({ address: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Postinumero: </label> </td>
                                <td>  <TextField className="rightRegisterField"
                                type="text" hintText="esim. 15110" style={styles}
                                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Postitoimipaikka: </label> </td>
                                <td> <TextField className="rightRegisterField"
                                type="text" hintText="esim. Lahti" style={styles}
                                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Puhelinnumero: </label> </td>
                                <td>   <TextField className="rightRegisterField"
                                type="text" hintText="esim. 044 708 1347​" style={styles}
                                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftRegisterLabel">Nouto-ohjeet: </label></td>
                                <td>    <TextField className="rightRegisterField"
                                type="text" hintText="esim. Perjantai 30.4 klo 16:30. Käynti pääovesta. " style={styles}
                                rows={3} rowsMax={7}
                                    onChange={(event, newValue) => this.setState({ pickup: newValue })} />
                            </td>
                        </tr>

                      <tr>

                        <td>
                        <img
                            src={require('../Profiile/home2.gif')}
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                        </td>
                        <td style={{display: 'flex',justifyContent: 'center'}}>
                        <img
                            src={require('../Profiile/organization2.gif')}
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                        </td>
                      </tr>


                    </tbody>
                </table>




            </div >
            </div >
        );
    }
}

export default Order1;
