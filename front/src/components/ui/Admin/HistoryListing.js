import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

// fetches
import { getOwnJunkData } from '../../../utils/fetchItems';
import { getUsers } from '../../../utils/fetchEditUsers';

class HistoryListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
      users: []
    }
  }

  // fetch junk data
  getJunksData() {
    getOwnJunkData().then((junks) => {
      this.setState({
        historyList: junks
      }, () => { console.log(this.state.historyList) })
    });
  }

  // get users
  getUsersData() {
    getUsers().then((usersData) => {
      this.setState({ users: (usersData) });
    });
  }

  handleClick = (event, data) => {
    console.log(data)
  }

  getName = (id) => {

    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === id) {
        return this.state.users[i].fname + ' ' + this.state.users[i].lname
      }
    }    
  }


  componentDidMount() {
    this.getJunksData();
    this.getUsersData();
  }

  getStatus(status) {
    switch (status) {
      case 0:
        return "Hidden";

      case 1:
        return "Vapaa";

      case 2:
        return "Varattu";

      case 3:
        return "Matkalla";

      case 4:
        return "Noudettu";

      default:
        break;
    }
  }



  render() {

    const styles = {
      paper: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '3%'
      }
    }


    return (
      <Paper style={styles.paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kategoria / alakategoria:</TableCell>
              <TableCell>Lisätty:</TableCell>
              <TableCell>Ilmoittaja:</TableCell>
              <TableCell>Käsittelijä:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.historyList
              .map(n => {                 
                return n.status === 4 ? (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n)}
                    key={n.junkID}
                  >
                    <TableCell>{n.category} / {n.subCat}</TableCell>
                    <TableCell>{n.junkdateadded}</TableCell>
                    <TableCell>{this.getName(n.owner)}</TableCell>
                    <TableCell>{n.company} / {n.fname} {n.lname}</TableCell>
                  </TableRow>
                )  : null
              })
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default HistoryListing;
