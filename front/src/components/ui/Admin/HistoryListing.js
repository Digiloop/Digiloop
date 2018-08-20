import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

// fetches
import { getOwnJunkData } from '../../../utils/fetchItems';

class HistoryListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: []
    }
  }

  // fetch junk data
  getJunksData() {
    getOwnJunkData().then((junks) => {
      this.setState({
        historyList: junks
      })
    });
    console.log(this.state.historyList)
  }

  handleClick = (event, data) => {
    console.log(data)
  }


  componentDidMount() {
    this.getJunksData();
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
      <Paper style={ styles.paper } >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lisätty:</TableCell>
              <TableCell>Ilmoittaja:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.historyList
              .map(n => {
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n)}
                    key={n.junkID}>
                  <TableCell>{n.junkdateadded}</TableCell>
                  <TableCell>{n.owner}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        </Paper>
    );
  }
}
export default HistoryListing;
