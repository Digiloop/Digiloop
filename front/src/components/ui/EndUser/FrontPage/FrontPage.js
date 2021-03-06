import React, { Component } from 'react';
import Order from '../../../containers/EndUser/Order/OrderMain';
import Notification from '../../../containers/EndUser/Notification'
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


  handleChange = (e, value) => {
    this.setState({
      value
    }, function () {
      this.props.setNewPageName('Noutolomake');
    });
  }

  componentDidMount() {
  }

  

  render() {
    let i=0;

    if (this.state.value === Notification) {
      this.state.etusivu.push(
        <h2 key={i} >Tervetuloa, {this.props.items.fname !== null ? this.props.items.fname : this.props.items.username}!</h2>)

      this.state.etusivu.push(<FlatButton key={i+1}
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

          <div>{this.state.value ? <Notification /> : <Order toggleAllahuSnackbar={this.props.toggleAllahuSnackbar} />}</div>
        </div>
      </div>

    );
  }
}
export default FrontPage;
