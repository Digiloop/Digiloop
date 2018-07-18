import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { getJunkData } from '../../../utils/fetchItems';
import { cancelReservation } from '../../../utils/reserveItems';

class ReservedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    }
    this.listReserved = this.listReserved.bind(this);
  }

  // fetch junk data
  getJunksData() {
    getJunkData().then((junks) => {
      this.listReserved();
    });
  }

  // cancel reserved item, setting it as free
  cancelItemReserve(item) {
    cancelReservation(item.junkID).then(
      this.props.refreshJunks
    );
  }

  // change item reservation status
  reserve(status, item) {
    /* reserveItem(status, item.fetcher, item.junkID).then(
      this.props.refreshJunks
    ); */
  }

  listReserved() {
    const items = [];
    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].status === 2) {
        items.push(
          <TableRow key={i} >
            <TableRowColumn colSpan='1'>{this.props.items[i].category} ({this.props.items[i].subCat})<br />Ilmoitettu: {this.props.items[i].junkdateadded}</TableRowColumn>
            <TableRowColumn>Ilmoittaja: {this.props.items[i].owner}<br />
              Varaaja: {this.props.items[i].fetcher}</TableRowColumn>
            <TableRowColumn>Tila: {this.getStatus(this.props.items[i].status)}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton style={{ marginRight: '5%' }}
                label="Peruuta"
                onClick={e => this.cancelItemReserve(this.props.items[i])}
                disabled={this.props.userInfo.id !== this.props.items[i].fetcher}
              />
              <RaisedButton
                label="Noudettu"
                onClick={e => this.reserve(4, this.props.items[i])}
                disabled={this.props.userInfo.id !== this.props.items[i].fetcher}
              />
            </TableRowColumn>
          </TableRow>
        )
      }
    }

    this.setState({
      itemList: items
    })

  }

  /* 
          <TableRowColumn>{this.props.items[i].pcs}kpl</TableRowColumn>
          <TableRowColumn>{this.props.items[i].size}m<sup>3</sup></TableRowColumn>
          <TableRowColumn>{this.props.items[i].weight}kg</TableRowColumn>
  */

  // get the list of available junks
  componentDidMount() {
    this.getJunksData();
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

  render() {
    return (
      <div className="FrontPageContainer">
        <MuiThemeProvider>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {this.state.itemList}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default ReservedListing;
