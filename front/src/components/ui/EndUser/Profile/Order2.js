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


class Order2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          showTietoturva: false,
          showAkut: false
        };
    }

    handleChange(event) {
    }


    tietoturvaHandler = ()=>{
      this.setState(prev => ({showTietoturva: !prev.showTietoturva}));
      this.setState(prev => ({ showAkut: false}));
      this.setState(prev => ({ showSer: false}));
    };

    akutHandler = ()=>{
      this.setState(prev => ({showAkut: !prev.showAkut}));
      this.setState(prev => ({ showTietoturva: false}));
      this.setState(prev => ({ showSer: false}));
    };

    serHandler = ()=>{
      this.setState(prev => ({showSer: !prev.showSer}));
      this.setState(prev => ({ showTietoturva: false}));
      this.setState(prev => ({ showAkut: false}));
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

const results = (                <table className="registerStructure">
                    <tbody>
                    <tr>
                        <td>  <label className="leftRegisterLabel">Alakategoria: </label> </td>
                    </tr>
                    <tr>
                    <td>
                    <img
                        src={require('./home2.gif')}
                        className="image-btn btn"
                        alt="Special button"
                        onClick={(event) => this.Submit(event)}
                    />
                    </td>
                    <td>
                    <img
                        src={require('./home2.gif')}
                        className="image-btn btn"
                        alt="Special button"
                        onClick={(event) => this.Submit(event)}
                    />
                    </td>
                    <td style={{display: 'flex',justifyContent: 'center'}}>
                    <img
                        src={require('./organization2.gif')}
                        className="image-btn btn"
                        alt="Special button"
                        onClick={this.tietoturvaHandler}
                    />
                    </td>
                    </tr>
                    </tbody>
                </table>);

                const resultsAkku = (                <table className="registerStructure">
                                    <tbody>
                                    <tr>
                                        <td>  <label className="leftRegisterLabel">Alakategoria: </label> </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <img
                                        src={require('./home2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={(event) => this.Submit(event)}
                                    />
                                    </td>
                                    <td>
                                    <img
                                        src={require('./organization2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={(event) => this.Submit(event)}
                                    />
                                    </td>
                                    <td style={{display: 'flex',justifyContent: 'center'}}>
                                    <img
                                        src={require('./organization2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={this.tietoturvaHandler}
                                    />
                                    </td>
                                    </tr>
                                    </tbody>
                                </table>);

                const resultsSer = (                <table className="registerStructure">
                                    <tbody>
                                    <tr>
                                        <td>  <label className="leftRegisterLabel">Alakategoria: </label> </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <img
                                        src={require('./organization2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={(event) => this.Submit(event)}
                                    />
                                    </td>
                                    <td>
                                    <img
                                        src={require('./organization2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={(event) => this.Submit(event)}
                                    />
                                    </td>
                                    <td style={{display: 'flex',justifyContent: 'center'}}>
                                    <img
                                        src={require('./organization2.gif')}
                                        className="image-btn btn"
                                        alt="Special button"
                                        onClick={this.tietoturvaHandler}
                                    />
                                    </td>
                                    </tr>
                                    </tbody>
                                </table>);

        const styles = {
            width: 250,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da'
        };

        const progress = {
            borderRadius: 4, backgroundColor: '#FFFFFF', width: '10%', height: '1.5vh', margin: 5, float: 'left'
        }
        return (
            <div className="registerWrapper">

            <AppBar style={{backgroundColor: '#FFF'}}
             title={<div className="app-bar-title">Noutolomake</div>}
             showMenuIconButton={false}
           />

           <div className="progressBar" style={{display: 'flex',justifyContent: 'center'}}>
               <div>Nuoli</div>
               <div className="state1" style={progress}></div>
               <div className="state2" style={{borderRadius: 4, backgroundColor: '#A6CE6B', width: '10%', height: '1.5vh', margin: 5, float: 'left'}}></div>
               <div className="state3" style={progress}></div>
               <div className="state4" style={progress}></div>
               <div>Nuoli</div>
           </div>

            <div className="Container">

                <table className="registerStructure">
                    <tbody>
                    <tr>
                        <td>  <label className="leftRegisterLabel">Pääluokka: </label> </td>
                    </tr>
                    <tr>
                    <td>
                    <img
                        src={require('./home2.gif')}
                        className="image-btn btn"
                        alt="Special button"
                        onClick={this.serHandler}
                    />
                    </td>
                    <td>
                    <img
                        src={require('./home2.gif')}
                        className="image-btn btn"
                        alt="Special button"
                        onClick={this.akutHandler}
                    />
                    </td>
                    <td style={{display: 'flex',justifyContent: 'center'}}>
                    <img
                        src={require('./organization2.gif')}
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
            </div >
        );
    }
}

export default Order2;
