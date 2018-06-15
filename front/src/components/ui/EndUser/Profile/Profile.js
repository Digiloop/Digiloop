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
      margin: '10px'

    };

    const registerActive = {
      borderRadius: '0',
      textAlign: 'center',
      backgroundColor: "#004225",
      margin: '10px'


    };

    const styles = {
      borderRadius: '5px',
      backgroundColor: 'white',
      border: '2px solid #004225',
      width: '93%'
    };

    const wrapperStyle = {
      boxShadow: '0px 0px 0 10px rgb(166, 206, 106)',
      display: 'inline-block',
      margin: '15px',
      padding: '1%',
    }
    
    return (
      <div>
        <h1 style={{padding: '0 5px'}}>Täällä voit muokata omia tietojasi</h1>
        <div className="updateWrapperUser" style={{height: '90vh'}}>
          <table className="updateStructureUser" style={wrapperStyle}>
            <tbody style={{width: '100%'}}>
              <tr>
                <td style={{width:'67%'}}>
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
              <tr>
                <td>
                  <FlatButton className="cancelButton"
                  style={{margin: '10px'}}
                  label="Peruuta"
                  hoverColor="#004225"
                  backgroundColor="#004225"
                  labelStyle={{
                    padding: '0 10px',
                    fontFamily: 'kanit',
                    float: 'left',
                    borderRadius: '0',
                    fontSize: '17px',
                    color: '#FFFFFF'
                  }}
                  onClick={this.props.onUpdate} />
                </td>
                <td>
                  <FlatButton className="registerButton"
                  style={{margin: '10px'}}
                  label="Tallenna"
                  labelStyle={{
                    padding: '0 10px',
                    fontFamily: 'kanit',
                    float: 'left',
                    borderRadius: '0',
                    fontSize: '17px',
                    color: '#FFFFFF'
                  }}

                  style={this.state.allFilled ? registerActive : registerInactive}

                  onClick={(event) => this.Submit(event)} />
                </td>
              </tr>




            </tbody>

          </table>

        </div >
      </div>
    );
  }
}
export default Profile;
