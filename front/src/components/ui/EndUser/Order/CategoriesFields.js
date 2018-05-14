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


class CategoriesFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTietoturva: false,
            showAkut: false,
            showSer: false
        };
    }

    handleChange(event) {
    }


    tietoturvaHandler = () => {
        this.setState(prev => ({ showTietoturva: !prev.showTietoturva }));
        this.setState(prev => ({ showAkut: false }));
        this.setState(prev => ({ showSer: false }));
    };

    akutHandler = () => {
        this.setState(prev => ({ showAkut: !prev.showAkut }));
        this.setState(prev => ({ showTietoturva: false }));
        this.setState(prev => ({ showSer: false }));
    };

    serHandler = () => {
        this.setState(prev => ({ showSer: !prev.showSer }));
        this.setState(prev => ({ showTietoturva: false }));
        this.setState(prev => ({ showAkut: false }));
    };

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
            borderColor: '#d6d7da',

            images: {
                width: '14.2vh'
            },

            tdStyle : {
                borderRadius: 4,
                border: '8px solid white'
            },

            trStyle: {
                width: '98vh',
                overflowX: 'hidden',
                overflowY: 'auto',
                whiteSpace: 'nowrap'
            }
        };

        const results = (<table className="orderStructure">
            <tbody>
                <tr>
                    <td>  <label className="leftOrderLabel"><h2 style={{ textAlign: 'left' }}>Alakategoria</h2> </label> </td>
                </tr>
                <tr>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/tietoturva.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/tietoturva1.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/tietoturva.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                </tr>
            </tbody>
        </table>);

        const resultsAkku = (<table className="orderStructure">
            <tbody>
                <tr>
                    <td>  <label className="leftOrderLabel"><h2>Alakategoria</h2> </label> </td>
                </tr>
                <tr style={{ margin: '0' }}>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/akku.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/akku.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/akku.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                </tr>
            </tbody>
        </table>);

        const resultsSer = (<table className="orderStructure">
            <tbody>
                <tr>
                    <td>  <label className="leftOrderLabel"><h2>Alakategoria</h2> </label> </td>
                </tr>
                <tr>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/tv.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/pesukone.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/kahvi.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                    <td style={ styles.tdStyle }>
                        <img
                            src={require('../Materials/OrderPics/tv.gif')}
                            style={ styles.images }
                            className="image-btn btn"
                            alt="Special button"
                            onClick={(event) => this.Submit(event)}
                        />
                    </td>
                </tr>
            </tbody>
        </table>);

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td><label className="leftOrderLabel"><h2>Pääluokka</h2> </label> </td>
                        </tr>
                        <tr>
                            <td style={ styles.tdStyle }>
                                <img
                                    src={require('../Materials/OrderPics/slaitteet.gif')}
                                    style={ styles.images }
                                    className="image-btn btn"
                                    alt="Special button"
                                    onClick={this.serHandler}
                                />
                            </td>
                            <td style={ styles.tdStyle }>
                                <img
                                    src={require('../Materials/OrderPics/akku.gif')}
                                    style={ styles.images }
                                    className="image-btn btn"
                                    alt="Special button"
                                    onClick={this.akutHandler}
                                />
                            </td>
                            <td style={ styles.tdStyle }>
                                <img
                                    src={require('../Materials/OrderPics/tietoturva.gif')}
                                    style={ styles.images }
                                    className="image-btn btn"
                                    alt="Special button"
                                    onClick={this.tietoturvaHandler}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    {this.state.showTietoturva ? results : null}
                    {this.state.showAkut ? resultsAkku : null}
                    {this.state.showSer ? resultsSer : null}
                </div>
            </div >
        );
    }
}

export default CategoriesFields;
