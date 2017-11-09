import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';
import './WasteProcessor.css';
import {Tabs, Tab} from 'material-ui/Tabs';
// import Slider from 'material-ui/Slider';
// import { Container, Row, Col } from 'reactstrap';

class WasteProcessor extends Component {
constructor(props){
  super(props);
  this.state={
    value: 'a',
  }
 }

 handleChange = (value) => {
     this.setState({
       value: value,
     });
   };

render() {
    return (
      <MuiThemeProvider>
      <Tabs className="map" inkBarStyle={{background: '#AFD43F', height: '3px'}}
      value={this.state.value}
      onChange={this.handleChange}
    >
      <Tab className="menu" label="Tab A" value="a">
        <div  className="map">
          <h2>Controllable Tab A</h2>
          <p>
            Tabs are also controllable if you want to programmatically pass them their values.
            This allows for more functionality in Tabs such as not
            having any Tab selected or assigning them different values.
          </p>
        </div>
      </Tab>
      <Tab className="menu" label="Tab B" value="b">
        <div className="map">
          <h2>Controllable Tab B</h2>
          <p>
            This is another example of a controllable tab. Remember, if you
            use controllable Tabs, you need to give all of your tabs values or else
            you wont be able to select them.
          </p>
        </div>
      </Tab>
      <Tab className="menu" label="Admin" value="c">
        <div  className="map">
          <h2>Controllable Tab C</h2>
          <p>
            Jotain tekstii
          </p>
        </div>
      </Tab>
      <Tab className="menu" label="Varauskartta" value="d">
        <div className="map">
          <div className="left">
            <h2>Kartta</h2>
              <div className="subLeft">
              <p>Hhlkhlsdjsföolsjfsdöfdsflk</p>
              </div>
          </div>
          <div className="right">
            <h2>Varausluettelo<RaisedButton label="Asetukset" style={{float: 'right', marginRight: '10px'}} /></h2>
            <div className="subRight">
            <p>Hhlkhlsdjsföolsjfsdöfdsflk</p>
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>

      </MuiThemeProvider>
    );
  }
}
export default WasteProcessor;
