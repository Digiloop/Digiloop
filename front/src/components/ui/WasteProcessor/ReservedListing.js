import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

// fetches
import { changeReservationStatus, cancelReservation } from '../../../utils/reserveItems';
import { getOwnJunkData, updateJunkData } from '../../../utils/fetchItems';


class ReservedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
      update: false,
      lastTimestamp: undefined
    }
    this.updateJunks = this.updateJunks.bind(this);
  }

  // fetch junk data
  getJunksData() {
    getOwnJunkData().then((junks) => {
      this.props.reservedToStore(junks);
      this.listHistory();
    });
  }

  // cancel reserved item, setting it as free
  cancelItemReserve(item) {
    cancelReservation(item.junkID).then(
      this.getJunksData()
    );
  }

  // change item reservation status
  reserve(status, item) {
    changeReservationStatus(status + 1, item.fetcher, item.junkID).then(
      this.getJunksData()
    );
  }

  listHistory() {

    let historylistFiltered = [];

    if (this.props.reservedItems.length) {

      for (let i = 0; i < this.props.reservedItems.length; i++) {

        if (this.props.reservedItems[i].status === 2 || this.props.reservedItems[i].status === 3) {

          if (this.props.reservedItems[i].company === this.props.userInfo.company && !this.state.showAll) {
            historylistFiltered.push(
              <TableRow key={i} >
                <TableRowColumn colSpan='1'>{this.props.reservedItems[i].category} ({this.props.reservedItems[i].subCat})<br />
                  Ilmoitettu: {this.props.reservedItems[i].junkdateadded}</TableRowColumn>
                <TableRowColumn>Ilmoittaja: {this.props.reservedItems[i].fnameOwner} {this.props.reservedItems[i].lnameOwner}<br />
                  Varaaja: {this.props.reservedItems[i].fname} {this.props.reservedItems[i].lname} / {this.props.reservedItems[i].company}</TableRowColumn>
                <TableRowColumn>Tila: {this.getStatus(this.props.reservedItems[i].status)}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton style={{ marginRight: '5%' }}
                    label="Peruuta"
                    onClick={e => this.cancelItemReserve(this.props.reservedItems[i])}
                    disabled={this.props.userInfo.userlvl === '1' ? null :
                      this.props.userInfo.id !== this.props.reservedItems[i].fetcher}
                  />
                  <RaisedButton
                    label='-->'
                    onClick={e => this.reserve(this.props.reservedItems[i].status, this.props.reservedItems[i])}
                    disabled={this.props.userInfo.userlvl === '1' ? null :
                      this.props.userInfo.id !== this.props.reservedItems[i].fetcher}
                  />
                </TableRowColumn>
              </TableRow>
            )
          }
          if (this.state.showAll) {
            historylistFiltered.push(
              <TableRow key={i} 
              style={{ backgroundColor : this.props.reservedItems[i].company === this.props.userInfo.company ? '#DCEDC8' : null }} 
              >
                <TableRowColumn colSpan='1'>{this.props.reservedItems[i].category} ({this.props.reservedItems[i].subCat})<br />
                  Ilmoitettu: {this.props.reservedItems[i].junkdateadded}</TableRowColumn>
                <TableRowColumn>Ilmoittaja: {this.props.reservedItems[i].fnameOwner} {this.props.reservedItems[i].lnameOwner}<br />
                  Varaaja: {this.props.reservedItems[i].fname} {this.props.reservedItems[i].lname} / {this.props.reservedItems[i].company}</TableRowColumn>
                <TableRowColumn>Tila: {this.getStatus(this.props.reservedItems[i].status)}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton style={{ marginRight: '5%' }}
                    label="Peruuta"
                    onClick={e => this.cancelItemReserve(this.props.reservedItems[i])}
                    disabled={this.props.userInfo.userlvl === '1' ?
                      this.props.reservedItems[i].company !== this.props.userInfo.company :
                      this.props.userInfo.id !== this.props.reservedItems[i].fetcher}
                  />
                  <RaisedButton
                    label='-->'
                    onClick={e => this.reserve(this.props.reservedItems[i].status, this.props.reservedItems[i])}
                    disabled={this.props.userInfo.userlvl === '1' ?
                      this.props.reservedItems[i].company !== this.props.userInfo.company :
                      this.props.userInfo.id !== this.props.reservedItems[i].fetcher}
                  />
                </TableRowColumn>
              </TableRow>
            )
          }
        }
        this.setState({
          historyList: historylistFiltered
        })
      }
    }
  }


  // turns status id into a printable status
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

  // update junks if timestamp is changed
  updateJunks() {
    updateJunkData().then((res) => {
      console.log(res)
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
    this.updateJunks();

    // updates new junks on 10 seconds intervals
    let intervalId = setInterval(this.updateJunks, 50000);
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    // stops the interval when page is change
    clearInterval(this.state.intervalId)
  }

  render() {

    return (
      <div className="ReservedPageContainer">
        <RaisedButton
          style={{ margin: '2%' }}
          label={!this.state.showAll ? 'Näytä kaikki' : 'Näytä omat'}
          onClick={(event) => this.setState({ showAll: !this.state.showAll }, () => { this.listHistory() })}
        />
        <MuiThemeProvider>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {this.state.historyList}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default ReservedListing;
