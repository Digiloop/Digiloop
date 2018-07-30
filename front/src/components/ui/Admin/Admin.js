import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TableRow, TableRowColumn, Table, TableBody } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox';

// get users
import { getUsers, changeStatus } from '../../../utils/fetchEditUsers';
import SelectInput from '../../../../node_modules/@material-ui/core/Select/SelectInput';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      rows: [],

      listAdmins: true,
      listWasteprocessors: true,
      listEndUsers: true
    }
  }

  // get users
  getUsersData() {
    getUsers().then((usersData) => {
      this.setState({ users: (usersData) });
    });
  }

  // edit userinfo 
  changeStatus(id, status) {
    var userStatus = {
      Status: !status,
      id: id
    }
    changeStatus(userStatus)
      .then(() => {
        setTimeout( () => {
          this.getUsersData();
        }, 1000)
      })
  }

  // opening items
  expand(x, visibleRowsCount) {

    let newArray = [];

    for (let i = 0; i < visibleRowsCount; i++) {
      if (i === x) {
        if (this.state.rows[x] === true) {
          newArray[i] = false;
        } else {
          newArray[i] = true;
        }
      } else {
        newArray[i] = false;
      }
    }

    // set the edited version as the new state
    this.setState({ rows: newArray });
  }

  componentDidMount() {
    this.getUsersData();
  }

  render() {

    const active = {
      border: '2px solid green',
      width: '100px'
    }
    const inactive = {
      border: '2px solid red',
      width: '100px'
    }

    const users = [];
    let visibleRowsCount = 0;

    // function for dynamic sorting
    function compareValues(key, order = 'asc') {
      return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
    }

    // sort users by userlevel
    if (this.state.users.length) {
      this.state.users.sort(compareValues('userlvl'));
    }


    // get users
    for (let i = 0; i < this.state.users.length; i++) {

      if ((this.state.users[i].userlvl === '0' && this.state.listAdmins)
        || (this.state.users[i].userlvl === '1' && this.state.listWasteprocessors)
        || (this.state.users[i].userlvl === '2' && this.state.listEndUsers)
      ) {
        if (this.state.rows[visibleRowsCount]) {
          users.push(
            <TableRow key={i} style={{ height: '200px', backgroundColor: '#CCC' }}>
              <TableRowColumn colSpan='1'>
                Nimi:<br />
                Osoite:<br />
                Kaupunki:<br />
                Sähköposti:<br />
                Puhelinnumero:<br />
              </TableRowColumn>
              <TableRowColumn colSpan='2'>
                {this.state.users[i].fname}{' ' + this.state.users[i].lname}<br />
                {this.state.users[i].address}<br />
                {this.state.users[i].zipcode}{' ' + this.state.users[i].city}<br />
                {this.state.users[i].email}<br />
                {this.state.users[i].phone}
              </TableRowColumn>
              <TableRowColumn colSpan='1'>
                {this.state.users[i].userlvl === '0' ? 'Admin' : ''}
                {this.state.users[i].userlvl === '1' ? 'Käsittelijä' : ''}
                {this.state.users[i].userlvl === '2' ? 'Loppukäyttäjä' : ''}
              </TableRowColumn>
              <TableRowColumn colSpan='1'>
                <RaisedButton
                  style={{ width: '110px' }}
                  label={this.state.users[i].Status ? 'Deaktivoi' : 'Aktivoi'}
                  onClick={event => this.changeStatus(this.state.users[i].id, this.state.users[i].Status)} 
                  disabled={this.state.users[i].id === this.props.userInfo.id}
                  />
              </TableRowColumn>
            </TableRow>
          )
        } else {
          users.push(
            <TableRow key={i}>
              <TableRowColumn colSpan='3'>
                {this.state.users[i].fname}{' ' + this.state.users[i].lname}
              </TableRowColumn>
              <TableRowColumn colSpan='1'>
                {this.state.users[i].userlvl === '0' ? 'Admin' : ''}
                {this.state.users[i].userlvl === '1' ? 'Käsittelijä' : ''}
                {this.state.users[i].userlvl === '2' ? 'Loppukäyttäjä' : ''}
              </TableRowColumn>
              <TableRowColumn colSpan='1'>
                <RaisedButton
                  style={this.state.users[i].Status ? active : inactive}
                  label={this.state.users[i].Status ? 'Active' : 'Inactive'} />
              </TableRowColumn>
            </TableRow>
          )
        }
        visibleRowsCount++;
      }

    }


    return (
      <MuiThemeProvider>
        <div>
          <table style={{
            marginLeft: '5%',
            marginTop: '20px'
          }}><tbody>
              <tr>
                <td>
                  Adminit
          </td>
                <td>
                  <Checkbox
                    checked={this.state.listAdmins}
                    onCheck={(event, newValue) => this.setState({ listAdmins: newValue })}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Käsittelijät
          </td>
                <td>
                  <Checkbox
                    checked={this.state.listWasteprocessors}
                    onCheck={(event, newValue) => this.setState({ listWasteprocessors: newValue })}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Loppukäyttäjät
          </td>
                <td>
                  <Checkbox
                    checked={this.state.listEndUsers}
                    onCheck={(event, newValue) => this.setState({ listEndUsers: newValue })}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <Table style={{ width: '60%', marginLeft: '5%', marginTop: '4%' }} onCellClick={rowNumber => this.expand(rowNumber, visibleRowsCount)}>
              <TableBody displayRowCheckbox={false} >
                {users}
              </TableBody>
            </Table>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Admin;
