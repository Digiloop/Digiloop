import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';
import Login from './components/containers/Login/Login.js';
import Register from './components/containers/Login/Register.js';
import Front from './components/ui/EndUser/EndUserFront.js';
import WasteProcessor from './components/containers/WasteProcessor/WasteProcessor.js';

import Order from './components/ui/EndUser/Orderinho/Order.js';
import FrontPage from './components/ui/EndUser/FrontPage/FrontPage.js';
import Profile from './components/ui/EndUser/Profile/Profile.js';
import Admin from './components/ui/WasteProcessor/Admin/Admin.js';
// Author: Spagehetti Baker Bros & co.
//Testikommentti
import { getCats, getSubCats } from './utils/fetchcategories'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      value: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
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

  logout = () => {
    this.props.onNewLogin({
    });
  }

  componentWillReceiveProps() {
    console.log(this.props.userLevel.loginInfo.userLevel);
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
                switch (this.props.userLevel.loginInfo.userLevel) {
                  case '0':
                    return <WasteProcessor />;

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
