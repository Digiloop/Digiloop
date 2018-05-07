import React, { Component } from 'react';
import { Divider, TextField, FlatButton } from 'material-ui';
import styles from '../../../../index.css';
import { sendUpdateData } from '../../../../utils/sendUpdateData';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.userInfo.id,
      firstName: this.props.userInfo.fname,
      lastName: this.props.userInfo.lname,
      phone: this.props.userInfo.phone,
      streetAddress: this.props.userInfo.address,
      zipcode: this.props.userInfo.zipcode,
      city: this.props.userInfo.city,

      allFilled: false,

      phoneNumberValid: false
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
      if (this.state[key] === '' || this.state[key] === null) {
        pass = false;
      }
    }
    if (pass && !this.state.allFilled) {
      this.setState({ allFilled: true })
    } else if (!pass && this.state.allFilled) {
      this.setState({ allFilled: false })
    }
  }

  Submit(event) {    
    if (this.state.allFilled) {
      var updateUserData = {
        "id": this.state.id,
        "fname": this.state.firstName,
        "lname": this.state.lastName,
        "phone": this.state.phone,
        "address": this.state.streetAddress,
        "zipcode": this.state.zipcode,
        "city": this.state.city
      }
      console.log(JSON.stringify(updateUserData));
      // sendUpdateData(JSON.stringify(updateData));
      this.props.onUpdate();
      window.alert("Tiedot päivitetty!");
    } else {
      window.alert("Ei saa jättää lootia tyhjiksi!");
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
      backgroundColor: "#004225",
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
              <tr>
                <td>
                  <label className="leftUpdateLabel">Etunimi: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
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
                    type="text" defaultValue={this.props.userInfo.phone}
                    hintText="Puhelinnumero" style={styles}
                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabel">Katuosoite: </label>
                </td>
                <td>
                  <TextField className="rightUpdateField"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
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
                    type="text" defaultValue={this.props.userInfo.city}
                    hintText="Postitoimipaikka" style={styles}
                    onChange={(event, newValue) => this.setState({ city: newValue })} />
                </td>
              </tr>
            </tbody>
          </table>

          <FlatButton className="cancelButton"
            label="Peruuta"
            hoverColor="#004225"
            backgroundColor="#004225"
            style={{ margin: '15px' }}
            labelStyle={{
              fontFamily: 'kanit',
              float: 'left',
              borderRadius: '0',
              fontSize: '17px',
              color: '#FFFFFF'
            }}
            onClick={this.props.onUpdate} />

          <FlatButton className="registerButton"
            label="Tallenna"
            labelStyle={{
              fontFamily: 'kanit',
              float: 'left',
              borderRadius: '0',
              fontSize: '17px',
              color: '#FFFFFF'
            }}

            style={this.state.allFilled ? registerActive : registerInactive}

            onClick={(event) => this.Submit(event)} />
          <br />
        </div >
      </div>
    );
  }
}
export default Profile;
