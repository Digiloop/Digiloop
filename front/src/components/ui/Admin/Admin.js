import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// get users
import { getUsers } from '../../../utils/fetchUsers';
import { TableRow, TableRowColumn, Table, TableBody } from 'material-ui';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      rows: []
    }
  }

  // get users
  getUsersData() {
    getUsers().then((usersData) => {
      this.setState({ users: (usersData) });
    });
  }

  // opening items
  expand(x) {
    // create a temp array, because it's easier to edit than the state one
    let newArray = this.state.rows;

    if (newArray[x]) { // closing the open item
      newArray[x] = false;
    } else { // opening another means first closing the open one
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i]) {
          newArray[i] = false; // close the open one
        }
      }
      newArray[x] = true; // open the new row
    }
    // set the edited version as the new state
    this.setState({ rows: newArray });
  }

  componentDidMount() {
    this.getUsersData();
  }

  render() {

    const users = [];
    console.log(this.state.users);

    // get users
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.rows[i]) {
        users.push(
          <TableRow key={i} style={{ height: '200px' }}>
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
              {this.state.users[i].zipcode}{' '+this.state.users[i].city}<br />
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
    }


    return (
      <MuiThemeProvider>
        <Table style={{ width: '60%', marginLeft: '5%', marginTop: '4%' }} onCellClick={rowNumber => this.expand(rowNumber)}>
          <TableBody displayRowCheckbox={false} >
            {users}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}
export default Admin;
