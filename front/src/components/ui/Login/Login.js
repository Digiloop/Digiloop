import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from '../../../index.css';
import { PropTypes } from 'react';
import App from '../../../App.js';
import Front from '../../ui/EndUser/EndUserFront.js';
import { getCredentials } from '../../../utils/login-api';




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: false
    }
  }

  loginClick(event) {
    event.preventDefault();
    console.log(this.state.username);
    this.getUserLevel();
  }

  getUserLevel() {
    getCredentials(this.state.username, this.state.password).then((loginData) => {


      // check that loginData is defined and is not an error
      if (loginData.userdata) {
        console.log(loginData);
        localStorage.loginData = JSON.stringify(loginData);
        this.props.onNewLogin(loginData.userdata);

        // shows error for wrong credentials
      } else if (loginData.response) {
        this.setState({ loginError: true })

        // server is down / other problems
      } else {
        console.log("PÄKKI KAATU");
      }

    });
  }

  register = () => {
    this.props.onNewLogin({
      userlvl: -2
    });
  }

  wasteRegister = () => {
    this.props.onNewLogin({
      userlvl: -3
    });
  }


  render() {
    return (
      <div className="loginWrapper">
        <AppBar style={{ backgroundColor: '#FFF' }}
          title={<div className="app-bar-title">Kirjautuminen</div>}
          showMenuIconButton={false}
        />
        <div className='loginContent'>
          <form>
            <div className="loginGroup">
              <p className="loginLabel">Sähköpostiosoite</p>
              <TextField className="loginInputField"
                underlineShow={false}
                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                /*color="#004225"
                inputStyle={{color: '#004225'}}
                style={{ backgroundColor: 'white', border: '2px solid #004225' }} */
                hintText="Enter your Username"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
            </div>

            <div className="loginGroup">
              <p className="loginLabel">Salasana</p>
              <TextField className="loginInputField"
                underlineShow={false}
                style={{ backgroundColor: 'white', border: '2px solid #004225' }}
                type="password"
                hintText="Enter your Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
            </div>


            {this.state.loginError ? <p style={{ fontWeight: 400, fontSize: '12px', color: 'red' }}>
              Kirjautuminen epäonnistui. Olet invaliidi.</p> :

              <p style={{ fontWeight: 400, fontSize: '12px', color: 'red' }}>
                Are you wanna kirjautua??! Visut korjatkaa tää ku kerkeette.</p>}


            <div className="loginGroup">
              <FlatButton type="submit" label="Kirjaudu"
                disableTouchRipple="true"
                style={{ marginTop: '20px' }}
                labelStyle={{
                  fontFamily: 'kanit',
                  float: 'left',
                  borderRadius: '0',
                  fontSize: '17px',
                  color: '#FFFFFF'
                }}
                hoverColor="#004225"
                fullWidth={true}
                backgroundColor="#004225"
                onClick={(event) => this.loginClick(event)}
                value="App" />
            </div>


            <div className="loginGroup">
              <a href="#">Salasana?</a><br />
              <a href="#" onClick={() => { this.wasteRegister() }} >Yrityskäyttäjä</a><br />
              <a href="#" onClick={() => { this.register() }}>Rekisteröidy</a><br />
            </div>
          </form> </div>

      </div>
    );
  }
}
const style = {
  margin: 15,
};



export default Login;
