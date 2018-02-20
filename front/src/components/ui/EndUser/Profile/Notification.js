import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

class Notification extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
}
    render() {
        return (

          <div className="notification">

            <h1>Ilmoitukset</h1>
            <div className="newsbox">
              <p>Lava tulloo, ootteko valmiita</p>
              <Divider style={{backgroundColor: '#004225'}}/>
            </div>
          </div>

        );
      }
    }
    export default Notification;
