import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';
import Login from './components/containers/Login/Login.js';
import Admin from './components/ui/WasteProcessor/Admin/Admin.js';

import WasteProcessor from './components/containers/WasteProcessor/WasteProcessor.js';

import Order from './components/ui/EndUser/Order/order.js';
import Front from './components/ui/EndUser/EndUserFront.js';
import FrontPage from './components/ui/EndUser/FrontPage/FrontPage.js';
import Profile from './components/ui/EndUser/Profile/Profile.js';
// Author: Spagehetti Baker Bros & co.
//Testikommentti





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      value: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
      //console.log('HERE!', this.contextTypes);
        //this.state.loggedIn ? <Map /> : <AdminFront />;
        this.setState({
          loggedIn: !this.state.loggedIn,
         })
        console.log(this.state.value);
      // this.context.location.transitionTo('Map');
    };

    handleChange = () => {
        this.setState({
        });
        console.log(this.state.userLevel);

      };

  componentWillReceiveProps(){
    console.log(this.props.userLevel.loginInfo.userLevel);
  }


  render() {
    return (
      <MuiThemeProvider>
      <div className="App"
      >
        <RaisedButton onClick={this.handleChange} label="Logout" value="-1" />
        {/* <RaisedButton onClick={this.handleClick} label="Käsittelijä" /> */}
        {console.log(this.state.value)}

        <div>
         {
             (() => {
             switch(this.props.userLevel.loginInfo.userLevel){
               case '0':
                 return <WasteProcessor />;
                 break;

               case '1':
                 return <WasteProcessor />;
                 break;

               case '2':
                 return <Front />;
                 break;

               default:
                  return <Login />;
               break;
             }
           })()


         }
         </div>
      </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
