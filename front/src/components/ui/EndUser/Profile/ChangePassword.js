import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';
import { changePassword } from '../../../../utils/editPassword';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFilled: false
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

  Submit(event) {    
    if (this.state.allFilled) {
      var passwordChange = {
      }

      console.log(passwordChange)
      // changePassword(passwordChange);
      this.props.handleSnackbar(true);
    } 
  }

  Cancel() {
    this.props.handleSnackbar(false);
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
        <h1 style={{padding: '0 5px'}}>Täällä voit vaihtaa salasanan</h1>
        <div className="updateWrapperUser" style={{height: '90vh'}}>
          <table className="updateStructureUser" style={wrapperStyle}>
            <tbody style={{width: '100%'}}>
              <tr>
                <td style={{width:'67%'}}>
                  <label className="leftUpdateLabelUser">Vanha salasana*: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="password" 
                    hintText="Vanha salasana" style={styles}
                    onChange={(event, newValue) => this.setState({ oldPassword: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Uusi salasana*: </label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="password"
                    hintText="Uusi salasana" style={styles}
                    onChange={(event, newValue) => this.setState({ newPassword: newValue })} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="leftUpdateLabelUser">Uusi salasana uudelleen*:</label>
                </td>
                <td>
                  <TextField className="rightUpdateFieldUser"
                    underlineStyle={{ borderColor: '#A6CE6B' }}
                    underlineFocusStyle={{ borderColor: '#004225' }}
                    type="password"
                    hintText="Uusi salasana uudelleen" style={styles}
                    onChange={(event, newValue) => this.setState({ newPasswordAgain: newValue })} />
                </td>
              </tr>
              <tr>
                
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
                  onClick={() => this.Cancel()} />
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

                  onClick={() => this.Submit()} />
                </td>
              </tr>
            </tbody>
          </table>
        </div >
      </div>
    );
  }
}
export default ChangePassword;
