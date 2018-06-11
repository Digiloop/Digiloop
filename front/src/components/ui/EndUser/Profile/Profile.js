import React, { Component } from 'react';
import { Divider, TextField, FlatButton } from 'material-ui';
import { updateUserData } from '../../../../utils/updateUserData';

class Profile extends Component {
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
      var updateUserdata = {
        "fname": this.state.firstName,
        "lname": this.state.lastName,
        "phone": this.state.phone,
        "address": this.state.streetAddress,
        "zipcode": this.state.zipcode,
        "city": this.state.city
      }

      console.log("Päivitetty data")
      console.log(updateUserdata)
      updateUserData(updateUserdata);


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

        <div className="updateWrapperUser">
          <table className="updateStructureUser">
            <tbody>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Etunimi: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="text" defaultValue={this.props.userInfo.fname}
                    hintText="Etunimi" style={styles}
                    onChange={(event, newValue) => this.setState({ firstName: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Sukunimi: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="text" defaultValue={this.props.userInfo.lname}
                    hintText="Sukunimi" style={styles}
                    onChange={(event, newValue) => this.setState({ lastName: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Puhelinnumero: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="text" defaultValue={this.props.userInfo.phone}
                    hintText="Puhelinnumero" style={styles}
                    onChange={(event, newValue) => this.setState({ phone: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Katuosoite: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="text" defaultValue={this.props.userInfo.address}
                    hintText="Katuosoite" style={styles}
                    onChange={(event, newValue) => this.setState({ streetAddress: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Postinumero: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="text" defaultValue={this.props.userInfo.zipcode}
                    hintText="Postinumero" style={styles}
                    onChange={(event, newValue) => this.setState({ zipcode: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Postitoimipaikka: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
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
