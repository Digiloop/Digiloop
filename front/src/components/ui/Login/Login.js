import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import styles from '../../../index.css';
import { PropTypes } from 'react';




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

    // TODO: Create data connection to backend here
  }


// TEST SHIT

render() {
    return (
      <div>

          <AppBar style={{backgroundColor: '#FFF'}}
             title={<div className="app-bar-title">Kirjautuminen</div>}
             showMenuIconButton={false}
           />
           <div className='loginpage'>
           <p className="ohje">Sähköpostiosoite</p>
           <TextField
           underlineShow={false}
            color="#004225"
            inputStyle={{color: '#004225', padding: '0 0'}}
            style={{ backgroundColor: 'white', border: '2px solid #004225' }}
             hintText="Enter your Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <p className="ohje">Salasana</p>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Kirjaudu" primary={true} style={style} onClick={(event) => this.loginClick(event)} />
             </div>
      </div>
    );
  }
}
const style = {
 margin: 15,
};



export default Login;
