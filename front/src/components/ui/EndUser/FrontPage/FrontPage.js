import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import styles from '../../../../index.css';
import Order from '../Order/Order';
import Notification from '../../../containers/WasteProcessor/Notification'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Notification,
      etusivu: []

    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => this.setState({ value })


  componentDidMount() {
    console.log(this.props.items);

  }


  render() {

    if (this.state.value === Notification) {
      this.state.etusivu.push(
        <h2>Tervetuloa, {this.props.items.fname != null ? this.props.items.fname : this.props.items.username}!</h2>)

      this.state.etusivu.push(<FlatButton
        label="Uusi tavaratilaus" onClick={this.handleChange}
        hoverColor="#8CE30B"
        style={{ margin: '5px' /*transform: 'rotate(-2deg)'*/ }}
        backgroundColor="#A6CE6B"
        labelStyle={{
          fontFamily: 'kanit',
          float: 'left',
          borderRadius: '0',
          fontSize: '17px',
          color: '#004225'
        }} />)
    }
    else {
      this.state.etusivu = [];
    }
    return (
      <div className="frontPageWrapper">
        <div className="FrontPageContainer"><br />
          {this.state.etusivu}

          <div className="frontPageBox">{this.state.value ? <Notification /> : <Order />}</div>
        </div>
      </div>

    );
  }
}
export default FrontPage;
