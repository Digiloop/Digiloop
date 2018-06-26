import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// get users
import { getUsers } from '../../../utils/fetchUsers';
import { TableRow, TableRowColumn, Table, TableBody } from 'material-ui';

import Checkbox from 'material-ui/Checkbox';

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

  // opening items
  expand(x, visibleRowsCount) {

    let newArray = [];

    for (let i = 0; i < visibleRowsCount; i++) {
      if (i === x) {
        if (this.state.rows[x] == true) {
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

    const users = [];
    let visibleRowsCount = 0;

    // get users
    for (let i = 0; i < this.state.users.length; i++) {

      if ((this.state.users[i].userlvl == 0 && this.state.listAdmins)
        || (this.state.users[i].userlvl == 1 && this.state.listWasteprocessors)
        || (this.state.users[i].userlvl == 2 && this.state.listEndUsers)
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
                Button tulee tähä
              </TableRowColumn>
            </TableRow>
          )
        } else {
          users.push(
            <TableRow key={i}>
              <TableRowColumn colSpan='4'>
                {this.state.users[i].fname}{' ' + this.state.users[i].lname}
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
                  Sepot
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
                  Tepot
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
                  Jepet
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
