import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import styles from '../../../index.css';
import { PropTypes } from 'react';
import App from '../../../App.js';




class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }

 loginClick(event){

    var payload={
    "email":this.state.username,
    "password":this.state.password
    }
    console.log(payload);
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
            style={{ backgroundColor: 'white', border: '2px solid #004225'}}
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
               <RaisedButton label="Kirjaudu"
             style={{ backgroundColor: '#004225', border: '2px solid #004225' }}
             onClick={(event) => this.loginClick(event)}
             value="App" />
             </div>


             <div className="loginGroup">
              <a href="#">Salasana?</a><br />
              <a href="#">Yrityskäyttäjä</a><br />
              <a href="#">Rekisteröidy</a><br />
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
