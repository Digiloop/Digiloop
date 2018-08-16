import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { getJunkData } from '../../../utils/fetchItems';
import { changeReservationStatus, cancelReservation } from '../../../utils/reserveItems';

class ReservedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      rendaa: false
    }
  }

  // cancel reserved item, setting it as free
  cancelItemReserve(item) {
    cancelReservation(item.junkID).then(
      this.props.refreshItem,
      this.setState({ rendaa: false }) // timeout to render
    );
  }

  // change item reservation status
  reserve(status, item) {
    changeReservationStatus(status + 1, item.fetcher, item.junkID).then(
      this.props.refreshItem,
      this.setState({ rendaa: false }) // timeout to render
    );
  }

  listChecker(value) { // check that props are ready and set render true
    if (this.props.itemsWithOwners.length === value) {
      this.setState({ rendaa: true })
    }
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

    const items = [];
    if (this.state.rendaa) {

      for (let i = 0; i < this.props.itemsWithOwners.length; i++) {

        if (this.props.itemsWithOwners[i].company === this.props.userInfo.company && !this.state.showAll) {
          items.push(
            <TableRow key={i} >
              <TableRowColumn colSpan='1'>{this.props.itemsWithOwners[i].category} ({this.props.itemsWithOwners[i].subCat})<br />
                Ilmoitettu: {this.props.itemsWithOwners[i].junkdateadded}</TableRowColumn>
              <TableRowColumn>Ilmoittaja: {this.props.itemsWithOwners[i].junkOwner.fname} {this.props.itemsWithOwners[i].junkOwner.lname}<br />
                Varaaja: {this.props.itemsWithOwners[i].company}</TableRowColumn>
              <TableRowColumn>Tila: {this.getStatus(this.props.itemsWithOwners[i].status)}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton style={{ marginRight: '5%' }}
                  label="Peruuta"
                  onClick={e => this.cancelItemReserve(this.props.itemsWithOwners[i])}
                />
                <RaisedButton
                  label='-->'
                  onClick={e => this.reserve(this.props.itemsWithOwners[i].status, this.props.itemsWithOwners[i])}
                />
              </TableRowColumn>
            </TableRow>
          )
        }
        if (this.state.showAll) {
          items.push(
            <TableRow key={i} >
              <TableRowColumn colSpan='1'>{this.props.itemsWithOwners[i].category} ({this.props.itemsWithOwners[i].subCat})<br />
                Ilmoitettu: {this.props.itemsWithOwners[i].junkdateadded}</TableRowColumn>
              <TableRowColumn>Ilmoittaja: {this.props.itemsWithOwners[i].junkOwner.fname} {this.props.itemsWithOwners[i].junkOwner.lname}<br />
                Varaaja: {this.props.itemsWithOwners[i].company}</TableRowColumn>
              <TableRowColumn>Tila: {this.getStatus(this.props.itemsWithOwners[i].status)}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton style={{ marginRight: '5%' }}
                  label="Peruuta"
                  onClick={e => this.cancelItemReserve(this.props.itemsWithOwners[i])}
                />
                <RaisedButton
                  label='-->'
                  onClick={e => this.reserve(this.props.itemsWithOwners[i].status, this.props.itemsWithOwners[i])}
                />
              </TableRowColumn>
            </TableRow>
          )
        }
      }
    } else {
      setTimeout(() => { // props are not ready when render starts, that why timeout
        this.listChecker(this.props.itemsWithOwners.length)
      }, 200);

    }


    return (
      <div className="ReservedPageContainer">
        <RaisedButton
          style={{ margin: '2%' }}
          label={!this.state.showAll ? 'Näytä kaikki' : 'Näytä omat'}
          onClick={(event) => this.setState({ showAll: !this.state.showAll })}
        />
        <MuiThemeProvider>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {items}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default ReservedListing;
