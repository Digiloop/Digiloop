import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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

login = f => f;


render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Kirjaudu sisään"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Kirjaudu" primary={true} style={style} onClick={(event) => this.loginClick(event)}/>
             <RaisedButton label="Testirnä 9k1" primary={true} style={style} onClick={login(true)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};



export default Login;
