import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import styles from '../../../../index.css';
import Profile from '../Profile/Profile.js';
import Order from '../Profile/Order.js';
import Notification from '../../../containers/WasteProcessor/Notification'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class FrontPage extends Component {
constructor(props){
  super(props);
  this.state = {
    value: Notification,
    etusivu:[]

  }
  this.handleChange = this.handleChange.bind(this);
 }

handleChange = (event, value) => this.setState({value})


componentDidMount(){
  console.log(this.props.items);

}


render() {

  if(this.state.value === Notification){
    this.state.etusivu.push(<FlatButton label="Uusi Tilaus" onClick={this.handleChange}
    backgroundColor="#FFFFFF"
    style={{ borderRadius: '0',
    textAlign: 'center',
    backgroundColor: 'white',
    border: '2px solid #004225',
    fontFamily: 'kanit',
    borderRadius: '0',
    fontSize: '30px',
    color: '#004225',}}/>)
    this.state.etusivu.push(
    <h2>Tervetuloa, {this.props.items.fname != null ? this.props.items.fname : this.props.items.username}!</h2>)
  }
  else{
    this.state.etusivu=[];
  }
    return (
      <div className="frontpageWrapper">
      <div className="Container"><br/>
      {this.state.etusivu}
      {this.state.value ? <Notification /> : <Order />}
      </div>
      </div>

    );
  }
}
export default FrontPage;
