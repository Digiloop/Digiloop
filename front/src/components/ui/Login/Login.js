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
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }

 loginClick(event){
    /* this.setState ({
      username: this.state.username,
      password: this.state.password
    });
    var payload={
    "username":this.state.username,
    "password":this.state.password
  }*/
    console.log(this.state.username);
    this.getUserLevel();
  }

  getUserLevel() {
    getCredentials(this.state.username, this.state.password).then((usrLevel) => {
      console.log(usrLevel);

      this.props.onNewLogin({
        userLevel: usrLevel.userlvl
      });

    });
  }

  register = () => {
    this.props.onNewLogin({
      userlvl: 3
    });
    console.log(this.state.userLevel.userlvl);
  }


render() {
    return (
      <div className="loginWrapper">
          <AppBar style={{backgroundColor: '#FFF'}}
             title={<div className="app-bar-title">Kirjautuminen</div>}
             showMenuIconButton={false}
           />
           <div className='loginContent'>
           <div className="loginGroup">
           <p className="loginLabel">Sähköpostiosoite</p>
           <TextField className="loginInputField"
            underlineShow={false}
            style={{ borderRadius: '0', backgroundColor: 'white', border: '2px solid #004225'}}
            /*color="#004225"
            inputStyle={{color: '#004225'}}
            style={{ backgroundColor: 'white', border: '2px solid #004225' }} */
             hintText="Enter your Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
             </div>

           <div className="loginGroup">
           <p className="loginLabel">Salasana</p>
             <TextField className="loginInputField"
               underlineShow={false}
               style={{ backgroundColor: 'white', border: '2px solid #004225'}}
               type="password"
               hintText="Enter your Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
               </div>

               <div className="loginGroup">
               <FlatButton label="Kirjaudu"
               style = {{marginTop: '20px'}}
               labelStyle = {{
                fontFamily: 'kanit',
                float: 'left',
                borderRadius: '0',
                fontSize: '17px',
               color: '#FFFFFF'}}
               hoverColor="#004225"
               fullWidth={true}
             backgroundColor="#004225"
             onClick={(event) => this.loginClick(event)}
             value="App" />
             </div>


             <div className="loginGroup">
              <a href="#">Salasana?</a><br />
              <a href="#">Yrityskäyttäjä</a><br />
              <a href="#" onClick={() => {this.register()}}>Rekisteröidy</a><br />
             </div>
             </div>

      </div>
    );
  }
}
const style = {
 margin: 15,
};



export default Login;
