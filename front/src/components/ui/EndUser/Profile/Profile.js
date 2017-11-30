import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import './Profile.css';

class Profile extends Component {
constructor(props){
  super(props);
  this.state =
  {

  }
 }

render() {
    return (
        <div className="news">
          <h1>Tilaushistoria</h1>
          <div className="newsbox">
            <p>Tilaus 1</p>
            <Divider />
            <p>Tilaus 2</p>
            <Divider />
          </div>
        </div>
    );
  }
}
export default Profile;
