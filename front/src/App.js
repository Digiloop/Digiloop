import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';
import Login from './components/containers/Login/Login.js';
import Register from './components/containers/Login/Register.js';
import Front from './components/ui/EndUser/EndUserFront.js';
import WasteProcessor from './components/containers/WasteProcessor/WasteProcessor.js';
import AdminWasteProcessor from './components/containers/Admin/WasteProcessor.js';

import Order from './components/ui/EndUser/Orderinho/Order.js';
import FrontPage from './components/ui/EndUser/FrontPage/FrontPage.js';
import Profile from './components/ui/EndUser/Profile/Profile.js';
import Admin from './components/ui/Admin/Admin.js';
// Author: Spagehetti Baker Bros & co.
//Testikommentti
import { getCats, getSubCats } from './utils/fetchcategories';
import { logOut } from './utils/login-api';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  logout = () => {
    logOut();
    this.props.onNewLogin({
      userlvl: -1
    });
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
    getCats().then((cats) => {
      this.props.setCategories(cats.category);
    })

    getSubCats().then((subCats) => {
      this.props.setSubCategories(subCats.category);
    })
  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <RaisedButton onClick={this.logout} label="Logout" />

          <div>
            {
              (() => {
                switch (this.props.loginInfo.userlvl) {
                  case '0':
                    return <AdminWasteProcessor />;

                  case '1':
                    return <WasteProcessor />;

                  case '2':
                    return <Front />;

                  case 3:
                    return <Register />;

                  default:
                    return <Login />;
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
