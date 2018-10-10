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
import { Dialog, DialogTitle } from '@material-ui/core';
import { reserveItem } from '../../../../utils/reserveItems'

import { BASE_URL } from '../../../../settings'

class ReservationListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      open: false
    }
    //this.reserve = this.reserve.bind(this);
    //this.createStates = this.createStates.bind(this);
    this.parseTimeStamp = this.parseTimeStamp.bind(this);
  }

  // change status ID into a displayable status text
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



  // call the reserve API, setting it as reserved
  reserve(item) {
    reserveItem(item.junkID).then((res) => {
      if (res.status === 200) {
        this.props.refreshJunks();
      } else {
        this.handleDialogOpen();
        this.props.refreshJunks();
      }
    });
  }

  // open dialog
  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  // close dialog
  handleDialogClose = () => {
    this.setState({ open: false })
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


  // create open/closed states for each item row
  componentWillReceiveProps(nextProps) {
    let arr = this.state.rows;

    for (let i = 0; i < nextProps.items.length; i++) {
      arr = [...arr, false]
    }
    this.setState({ rows: arr });
  }

  // "2018-01-15 22:00:00.000Z" -> 15.01.2018
  parseTimeStamp(timeStamp) {
    let newStamp = timeStamp.split(/[- ]+/);
    return newStamp[2] + "." + newStamp[1] + "." + newStamp[0];
  }

  render() {

    // automatic linebreaks for long texts (description) in item rows
    const rowStyle = {
      whiteSpace: 'normal',
      wordWrap: 'break-word'
    }

    let items = [];


    // create the item rows
    // because we're reversing the list, but want to keep row numbers correct, we're looping with double variables
    // i is the regular start to end index for the rownumber
    // j is the selector for the items list, end to start
    for (let i = 0, j = this.props.items.length - 1; i < this.props.items.length; i++ , j--) {

      // define if the row is open or not. +1 is due to header row.
      if (this.state.rows[i + 1]) {

        let imageUrl = BASE_URL + "/images/items/" + this.props.items[j].picture;

        items.push(
          <TableRow key={i} style={{ height: '400px' }}>
            <TableRowColumn style={rowStyle} colSpan="5">
              {this.props.items[j].category} ({this.props.items[j].subCat})<br />
              Ilmoitettu: {this.parseTimeStamp(this.props.items[j].junkdateadded)}<br />
              {this.props.items[j].pcs}kpl<br />
              {this.props.items[j].size}m<sup>3</sup><br />
              {this.props.items[j].weight}kg<br />

              <img src={imageUrl} alt='' style={{ maxWidth: '200px' }} />

              <div>{this.props.items[j].description}</div><br />
              <div style={{ marginTop: '5%' }}>
                Ilmoittaja: {this.props.items[j].fname} {this.props.items[j].lname}<br />
                Puhelinnumero: {this.props.items[j].itemphone}<br />
                Nouto-osoite: {this.props.items[j].pickupaddr}, {this.props.items[j].zipcode} {this.props.items[j].city}<br />
                {this.props.items[j].wishbox ? 'Nouto-ohjeet:' + this.props.items[j].wishbox : null}
              </div>
            </TableRowColumn>

            {this.props.items[j].status === 1 ?
              <TableRowColumn><RaisedButton label="Varaa" onClick={e => this.reserve(this.props.items[j])} /></TableRowColumn> :
              <TableRowColumn>{this.getStatus(this.props.items[j].status)}</TableRowColumn>}
          </TableRow>
        )
      } else {
        items.push(
          <TableRow key={i}>
            <TableRowColumn colSpan="4">{this.props.items[j].category} ({this.props.items[j].subCat})<br />Ilmoitettu: {this.props.items[j].date}</TableRowColumn>

            <TableRowColumn></TableRowColumn>
            {this.props.items[j].status === 1 ?
              <TableRowColumn><RaisedButton label="Varaa" onClick={e => this.reserve(this.props.items[j])} /></TableRowColumn> :
              <TableRowColumn>{this.getStatus(this.props.items[j].status)}</TableRowColumn>}

          </TableRow>
        )
      }
    }

    return (
      <MuiThemeProvider>
        <div>
          <Table onCellClick={rowNumber => this.expand(rowNumber)}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Nimi</TableHeaderColumn>
                <TableHeaderColumn>Määrä</TableHeaderColumn>
                <TableHeaderColumn>Tilavuus</TableHeaderColumn>
                <TableHeaderColumn>Paino</TableHeaderColumn>
                <TableHeaderColumn>Varaa</TableHeaderColumn>
                <TableHeaderColumn>Tila</TableHeaderColumn>
              </TableRow>
              {items}
            </TableBody>
          </Table>

          <Dialog key={'r'} // if item is already reserved
            style={{ visibility: 'visible' }}
            open={this.state.open}
            onClose={this.handleDialogClose}
            fullWidth={true}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle>Tuotetta ei voi varata, se saattaa olla jo varattu.</DialogTitle>
          </Dialog >
        </div>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListing;