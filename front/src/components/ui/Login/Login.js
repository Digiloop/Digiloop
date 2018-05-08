import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styles from '../../../index.css';
import { getCredentials } from '../../../utils/login-api';




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: false,
      connectionError: false
    }
  }

  loginClick(event) {
    event.preventDefault();
    console.log(this.state.email);
    this.getUserLevel();
  }

  getUserLevel() {
    getCredentials(this.state.email, this.state.password).then((loginData) => {


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
        this.setState({connectionError: true});
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

    const errorStyle = {
      marginTop: '1vh',
      padding: '1vh',
      fontWeight: 400,
      fontSize: '12px',
      color: '#004225'
    }


    return (

      <div className="loginWrapper">
        <AppBar style={{ backgroundColor: '#FFF' }}
          title={<div className="app-bar-title">Kirjautuminen</div>}
          showMenuIconButton={false}
        />

        <div className='loginContent'>
          <form>


            <div className="loginGroup">

              {this.state.loginError ?
                <p style={errorStyle}>
                  <ActionInfo color={'#004225'} /> <br />
                  <b>Kirjautuminen epäonnistui.</b> <br />
                  Väärä salasana tai käyttäjätunnus.
                </p>
                : <p></p>
              }

              {this.state.connectionError ?
                <p style={errorStyle}>
                  <ActionInfo color={'#004225'} /> <br />
                  <b>Yhteyden muodostaminen epäonnistui.</b> <br />
                  Tarkista verkkoyhteytesi. Mikäli vika jatkuu, odota hetki ja yritä uudelleen.
                </p>
                : <p></p>
              }

              <p className="loginLabel">Sähköpostiosoite</p>
              <TextField className="loginInputField"
                underlineShow={false}
                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225' }}
                /*color="#004225"
                inputStyle={{color: '#004225'}}
                style={{ backgroundColor: 'white', border: '2px solid #004225' }} */
                hintText="Enter your Username"
                onChange={(event, newValue) => this.setState({ email: newValue })}
              />
            </div>

            <div className="loginGroup">
              <p className="loginLabel">Salasana </p>
              <TextField className="loginInputField"
                underlineShow={false}
                style={{ backgroundColor: 'white', border: '2px solid #004225' }}
                type="password"
                hintText="Enter your Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
            </div>

            <div className="loginGroup">

              <FlatButton type="submit" label="Kirjaudu"
                disableTouchRipple={true}
                style={{ marginTop: '5px' }}
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
              <a href="#">Unohtunut salasana?</a><br />
              <a onClick={() => { this.wasteRegister() }} >Hae yrityskäyttäjäksi</a><br />
              <a onClick={() => { this.register() }}>Rekisteröidy</a><br />
            </div>
          </form>

          <div className="LoginImage" />
        </div>

      </div>
    );
  }
}
const style = {
  margin: 15,
};



export default Login;
