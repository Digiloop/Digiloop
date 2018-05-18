import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';



// switchin alasivut loginlevelin perusteella
import AdminWasteProcessor from './components/containers/Admin/WasteProcessor.js';
import WasteProcessor from './components/containers/WasteProcessor/WasteProcessor.js';
import Front from './components/containers/EndUser/EndUserFront';
import Register from './components/containers/Login/Register.js';
import WasteRegister from './components/containers/Login/WasteRegister.js';
import Login from './components/containers/Login/Login.js';

import { getCats, getSubCats } from './utils/fetchcategories';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }



  componentDidMount() {

    // fetch categories and subcategories upon opening, they only need to be loaded once per app use
    // they change rarely, and can be updated on page with refresh
    getCats().then((cats) => {
      this.props.setCategories(cats);
    })
    getSubCats().then((subCats) => {
      // subcats will also be used as a check on the backend/network
      console.log(subCats);
      // if the connection refused, clear login sessions and display error message
      if (subCats.message == "Network Error") {
        localStorage.clear();
        this.props.onNewLogout({
          userlvl: -1
        });

      }
      // with a proper response, continue as usual to saving subcats into store and checking if there's a session in localstorage
      else {
        this.props.setSubCategories(subCats);

        // if we have an existing session going on, load that instantly upon opening app
        // it will not remember the page the user was on though, only the login info of the previous session
        if ((localStorage.loginData !== "undefined") && localStorage.loginData) {
          let loginData = JSON.parse(localStorage.loginData);
          this.props.localStorageLogin(loginData.userdata);
        }

        
      } 
      
    })
  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">

          <div>
            {
              (() => {
                switch (this.props.loginInfo.userlvl) {
                  case -3:
                    return <WasteRegister />;

                  case -2:
                    return <Register />;

                  case '0':
                    return <AdminWasteProcessor />;

                  case '1':
                    return <WasteProcessor />;

                  case '2':
                    return <Front />;

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
