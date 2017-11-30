import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import './FrontPage.css';
import Profile from '../Profile/Profile.js';

class FrontPage extends Component {
constructor(props){
  super(props);
  this.state = {
    value: '',
    open: false,
    changePa: false,
  };
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})
handleToggle = () => this.setState({open: !this.state.open})

changePage = () => {
  console.log(this.state.changePa)
   this.setState({
     changePa: !this.state.changePa,
   })
 }

render() {
    return (
      <MuiThemeProvider>
      <div className="frontpake">
        <div>
        {/*this.state.changePa ? <Profile /> : <Profile />*/}
        <AppBar style={{backgroundColor: '#004225'}} title="Etusivu"
          onClick={this.handleToggle} >
          <div className="frontDrawer">
            <Drawer open={this.state.open} containerStyle={{backgroundColor: '#004225'}}>
              <Menu value={this.state.value} onChange={this.handleChange}>{console.log(this.state.value)}
                <MenuItem style={{color: 'white'}} value={'FrontPage'}>Etusivu</MenuItem>
                <MenuItem style={{color: 'white'}} value={'Profile'}>Oma profiili</MenuItem>
                <MenuItem style={{color: 'white'}} value={'News'}>Uutiset</MenuItem>
              </Menu>
            </Drawer>
          </div>
        </AppBar>
        </div>
        <div className="news">
          <h1>Ilmoitukset</h1>
          <div className="newsbox">
            <p>Lava tulloo, ootteko valmiita</p>
            <Divider style={{backgroundColor: '#004225'}}/>
          </div>
        </div>
          <div className="footter">
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default FrontPage;
