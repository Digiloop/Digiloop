import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';
import { updateUserData } from '../../../../utils/updateUserData';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userInfo.fname,
      lastName: this.props.userInfo.lname,
      phone: this.props.userInfo.phone,
      streetAddress: this.props.userInfo.address,
      zipcode: this.props.userInfo.zipcode,
      city: this.props.userInfo.city,

      allFilled: false,
      phoneNumberValid: false,

    };
    this.checkFill = this.checkFill.bind(this);
  }

  componentDidMount() {
    this.checkFill();
  }

  componentDidUpdate() {
    this.checkFill();
  }

  // function, that checks if all fields are filled, and updates allFilled -state accordingly
  checkFill() {
    let pass = true;

    for (var key in this.state) {
      if (this.state[key] === '' || this.state[key] === null || this.state[key] === undefined) {
        pass = false;
      }
    }
    if (pass && !this.state.allFilled) {
      this.setState({ allFilled: true })
    } else if (!pass && this.state.allFilled) {
      this.setState({ allFilled: false })
    }
  }

  Cancel() {
    this.props.handleSnackbar(false);
  }

  Submit(event) {
    if (this.state.allFilled) {
      var updateUserdata = {
        "fname": this.state.firstName,
        "lname": this.state.lastName,
        "phone": this.state.phone,
        "address": this.state.streetAddress,
        "zipcode": this.state.zipcode,
        "city": this.state.city
      }

      var userdata = {        
        "fname": this.state.firstName,
        "lname": this.state.lastName,
        'phone': this.state.phone,
        "address": this.state.streetAddress,
        "zipcode": this.state.zipcode,
        "city": this.state.city,
        company: this.props.userInfo.company,
        id: this.props.userInfo.id,
        userlvl: this.props.userInfo.userlvl,
        ytunnus: this.props.userInfo.ytunnus
      }

      updateUserData(updateUserdata);
      this.props.localStorageLogin(userdata);

      this.props.handleSnackbar(true);

    }
  }

  render() {


    const registerInactive = {
      borderRadius: '0',
      textAlign: 'center',
      backgroundColor: "grey",
      margin: '15px'

    };

    const registerActive = {
      borderRadius: '0',
      textAlign: 'center',
      backgroundColor: "#FFF",
      margin: '15px'


    };

    const styles = {
      borderRadius: '0',
      backgroundColor: 'white',
      border: '2px solid #004225'
    };


    return (
      <div>
        <h1>Täällä voit muokata omia tietojasi</h1>

        <div className="updateWrapper">
          <table className="updateStructure">
            <tbody>
              <tr><td></td><td><label className="middleRegisterLabel">Yhteyshenkilön tiedot:</label> </td></tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Etunimi: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    inputStyle={{ marginLeft: '5px' }}
                    type="text" defaultValue={this.props.userInfo.fname}
                    hintText="Etunimi" style={styles}
                    onChange={(event, newValue) => this.setState({ firstName: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Sukunimi: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    inputStyle={{ marginLeft: '5px' }}
                    type="text" defaultValue={this.props.userInfo.lname}
                    hintText="Sukunimi" style={styles}
                    onChange={(event, newValue) => this.setState({ lastName: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Puhelinnumero: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    inputStyle={{ marginLeft: '5px' }}
                    type="text" defaultValue={this.props.userInfo.phone}
                    hintText="Puhelinnumero" style={styles}
                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                </td>
              </tr>
              <tr><td></td><td><label className="middleRegisterLabel">Yrityksen tiedot:</label> </td></tr>
              <tr>
                <td><label className="leftUpdateLabel">Yrityksen nimi: </label></td>
                <td><label className="leftUpdateLabel">{this.props.userInfo.company}</label></td>
              </tr>
              <tr>
                <td><label className="leftUpdateLabel">Y-tunnus: </label></td>
                <td><label className="leftUpdateLabel">{this.props.userInfo.ytunnus}</label></td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Katuosoite: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    inputStyle={{ marginLeft: '5px' }}
                    type="text" defaultValue={this.props.userInfo.address}
                    hintText="Katuosoite" style={styles}
                    onChange={(event, newValue) => this.setState({ streetAddress: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Postinumero: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    inputStyle={{ marginLeft: '5px' }}
                    type="text" defaultValue={this.props.userInfo.zipcode}
                    hintText="Postinumero" style={styles}
                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Postitoimipaikka: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    inputStyle={{ marginLeft: '5px' }}
                    type="text" defaultValue={this.props.userInfo.city}
                    hintText="Postitoimipaikka" style={styles}
                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                </td>
              </tr>
            </tbody>
          </table>

          <FlatButton className="cancelUpdateButton"
            label="Peruuta"
            hoverColor="#FFF"
            backgroundColor="#FFF"
            style={{ margin: '15px' }}
            labelStyle={{
              fontFamily: 'kanit',
              float: 'left',
              borderRadius: '0',
              fontSize: '17px',
              color: '#004225'
            }}
            onClick={() => this.Cancel()} />

          <FlatButton className="updateButton"
            label="Tallenna"
            hoverColor="#FFF"
            backgroundColor="#FFF"
            labelStyle={{
              fontFamily: 'kanit',
              float: 'left',
              borderRadius: '0',
              fontSize: '17px',
              color: '#004225'
            }}

            disabled={!this.state.allFilled}
            style={this.state.allFilled ? registerActive : registerInactive}

            onClick={() => this.Submit()} />
          <br />
        </div >
      </div>
    );
  }
}
export default UserInfo;
