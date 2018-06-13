import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { getCredentials } from '../../../utils/login';




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: false,
      connectionError: false,
      showInfoText: true
    }
    this.formStyleCreator = this.formStyleCreator.bind(this)
  }

  componentDidMount() {
    if (localStorage.infoTextSeen === undefined) {
      this.setState({
        showInfoText: true
      })
      localStorage.infoTextSeen = true;
    } else {
      this.setState({
        showInfoText: false
      })
    }
  }

  loginClick(event) {
    event.preventDefault();
    this.getUserLevel();
  }

  getUserLevel() {
    getCredentials(this.state.email, this.state.password).then((loginData) => {


      // check that loginData is defined and is not an error
      if (loginData.userdata) {
        localStorage.loginData = JSON.stringify(loginData);
        this.props.onNewLogin(loginData.userdata);

        // shows error for wrong credentials
      } else if (loginData.response) {
        this.setState({ loginError: true })

        // server is down / other problems
      } else {
        console.log("PÄKKI KAATU");
        this.setState({ connectionError: true });
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

  formStyleCreator() {
    switch (true) {
      case (this.state.showInfoText && window.innerWidth > 545):
        return "565px"
      case (!this.state.showInfoText && window.innerWidth > 545):
        return "230px"
      case (this.state.showInfoText && window.innerWidth < 545):
        return "340px"
      case (!this.state.showInfoText && window.innerWidth < 545):
        return "120px"
    }
  }


  render() {

    const errorStyle = {
      position: 'absolute',
      paddingTop: window.innerWidth > 545 ? '535px' : "285px",
      paddingLeft: '45px',
      fontWeight: 400,
      fontSize: '12px',
      color: 'red'
    }

    const loginHeaders = {
      textAlign: 'left',
      fontSize: window.innerWidth > 545 ? "25px" : "17px",
      margin: '10px 0 5px 0',
    }



    return (

      <div className="loginWrapper">
        <AppBar style={{ backgroundColor: '#FFF' }}
          title={<div className="app-bar-title">Kirjautuminen</div>}
          showMenuIconButton={false}
        />

        {this.state.connectionError ?
          <p style={errorStyle}>
            {/*<ActionInfo color={'#004225'} /> <br /> */}
            <b>Yhteyden muodostaminen epäonnistui.</b> <br />
            Tarkista verkkoyhteytesi. Mikäli vika jatkuu, odota hetki ja yritä uudelleen.
                </p>
          : <p></p>
        }

        {this.state.loginError ?
          <p style={errorStyle}>
            {/*<ActionInfo color={'#004225'} /> <br />*/}
            <b>Kirjautuminen epäonnistui.</b> <br />
            Väärä salasana tai käyttäjätunnus.
                </p>
          : <p></p>
        }



        <div id="loginText" style={{
          marginTop: window.innerWidth > 545 ? "195px" : "115px",
          width: window.innerWidth > 545 ? "380px" : "220px",
          fontSize: window.innerWidth > 545 ? "15px" : "10px",
          height: window.innerWidth > 545 ? "290px" : "165px",
          display: this.state.showInfoText ? "block" : "none"
        }}>
          <h2 style={loginHeaders}>Digiloop</h2>
          <p className="loginParagraph">Ilmaiset romun vastaanottopaikat, edulliset noudot ja arvoromun osto</p>

          <h2 style={loginHeaders}>Rekisteröidy ja tilaa ensimmäinen noutosi</h2>
          <p className="loginParagraph">Digiloop on ilmainen. Noutopalveluyritykset ovat hinnoitelleet edulliset noutohinnat. Voit toimittaa myös itse tarpeettoman
          metalliromun, sähkölaitteet, akut ja paristot Digiloop keräyspisteisiin.
          </p>
        </div>

        <div className='loginContent' style={{ height: window.innerWidth > 545 ? '751px' : '433px', width: window.innerWidth > 545 ? "545px" : "320px" }}>



          <form style={{
            //paddingTop: window.innerWidth > 545 ? "600px" : "338px",
            paddingTop: this.formStyleCreator(),
            height: window.innerWidth > 545 ? "320px" : "95px"
          }}>


            <div className="loginGroup">

              <p className="loginLabel">Sähköpostiosoite</p>
              <TextField className="loginInputField"
                underlineShow={false}
                style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225', paddingLeft: '5px' }}
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
                style={{ backgroundColor: 'white', border: '2px solid #004225', paddingLeft: '5px' }}
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
              <a href="">Unohtunut salasana?</a><br />
              <a onClick={() => { this.wasteRegister() }} >Hae yrityskäyttäjäksi</a><br />
              <a onClick={() => { this.register() }}>Rekisteröidy</a><br />
            </div>
          </form>

          <div className="LoginImage" />

        </div>
        <div id="bottomColor" style={{
          width: window.innerWidth > 545 ? "434px" : "250px",
          height: window.innerWidth > 545 ? "11vh" : "40vh",
          height: this.state.showInfoText ? "40vh" : "31vh"
        }}>
        </div>
      </div>

    );

  }
}



export default Login;
