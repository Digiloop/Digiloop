import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

// fetches
import { changeReservationStatus } from '../../../utils/reserveItems'
import { getOwnJunkData, updateJunkData } from '../../../utils/fetchItems';

class HistoryListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
      users: [],
      update: false,
      lastTimestamp: undefined
    }
    this.updateJunks = this.updateJunks.bind(this);
  }

  // fetch junk data
  getJunksData() {
    getOwnJunkData().then((junks) => {
      this.setState({
        historyList: junks
      }, () => { this.state.historyList })
    });
  }

  handleClick = (event, data) => {
    console.log(data);
    this.setState({ data: data })
    this.handleDialogOpen();
  }

  // open dialog
  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  // close dialog
  handleDialogClose = () => {
    this.setState({ open: false })
  }

  cancelCollected(item) {
    changeReservationStatus(2, item.fetcher, item.junkID).then(() => {
      this.getJunksData(),
      this.handleDialogClose()
    })
  }

  // update junks if timestamp is changed
  updateJunks() {
    updateJunkData().then((res) => {

      // stores first timestamp value, when entered to page
      if (this.state.lastTimestamp === undefined) { this.state.lastTimestamp = res }

      // checks if timestamp is changed
      if (this.state.lastTimestamp !== res) {
        this.state.update = true;
      }

      if (this.state.update) {
        this.getJunksData();
        this.setState({
          update: false,
          lastTimestamp: res // store current value to lastTimestamp
        })
      }
    })
  }

  componentDidMount() {
    this.getJunksData();

    // updates new junks on 10 seconds intervals
    let intervalId = setInterval(this.updateJunks, 50000);
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    // stops the interval when page is change
    clearInterval(this.state.intervalId)
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

    const dialog = [];
    if (this.state.open) {
      dialog.push(
        <Dialog key='data'
          open={this.state.open}
          onClose={this.handleDialogClose}
          scroll='paper'
          fullWidth
        >
          <DialogTitle>{this.state.data.category} / {this.state.data.subCat}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ilmoittaja: {this.state.data.fnameOwner} {this.state.data.lnameOwner}
            </DialogContentText>
            <DialogContentText>
              Käsittelijä: {this.state.data.fname} {this.state.data.lname} / {this.state.data.company}
            </DialogContentText>
            <DialogContentText>
              Ilmoitettu: {this.state.data.junkdateadded}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={e => this.cancelCollected(this.state.data)} >Peruuta</Button>
          </DialogActions>
        </Dialog>
      )
    }


    return (
      <Paper style={styles.paper} >
        {this.state.historyList.length ?
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
                  return n.status === 4 && (n.company === this.props.userInfo.company) ? (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      key={n.junkID}
                    >
                      <TableCell>{n.category} / {n.subCat}</TableCell>
                      <TableCell>{n.junkdateadded}</TableCell>
                      <TableCell>{n.fnameOwner} {n.lnameOwner}</TableCell>
                      <TableCell>{n.company} / {n.fname} {n.lname}</TableCell>
                    </TableRow>
                  ) : null
                })
              }
            </TableBody>
          </Table>
          : null}
        {dialog}
      </Paper>
    );
  }
}
export default HistoryListing;
