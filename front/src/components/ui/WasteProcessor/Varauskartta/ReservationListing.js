import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { reserveItem } from '../../../../utils/reserveItems'

class ReservationListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
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
  // TODO: change into limited version, where only junkID is passed
  reserve(item) {
    reserveItem(2, 1, item.junkID);
  }

  // opening items
  expand(x) {
    // create a temp array, because it's easier to edit than the state one
    let newArray = this.state.rows;

    if(newArray[x]){ // closing the open item
      newArray[x] = false;
    } else { // opening another means first closing the open one
      for (let i = 0; i < newArray.length; i++){
        if(newArray[i]){
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

  // "2018-01-15T22:00:00.000Z" -> 15.01.2018
  parseTimeStamp(timeStamp){
    let newStamp = timeStamp.split(/[-T]+/);
    return newStamp[2] + "." + newStamp[1] + "." + newStamp[0];
  }

  render() {
    
    // automatic linebreaks for long texts (description) in item rows
    const rowStyle = {
      whiteSpace: 'normal',
      wordWrap: 'break-word'
    }

    const items = [];
    console.log(this.props.items);


    // create the item rows
    for (let i = 0; i < this.props.items.length; i++) {

      // define if the row is open or not. +1 is due to header row.
      if (this.state.rows[i+1]) {

        items.push(
          <TableRow key={i}  style={{height: '400px'}}>
            <TableRowColumn style={rowStyle} colSpan="5">
            {this.props.items[i].category} ({this.props.items[i].subCat})<br />
            Ilmoitettu: {this.parseTimeStamp(this.props.items[i].junkdateadded)}<br />
            {this.props.items[i].pcs}kpl<br />
            {this.props.items[i].size}m<sup>3</sup><br />
            {this.props.items[i].weight}<br />

            <div>{this.props.items[i].description}</div><br />
            </TableRowColumn>

            {this.props.items[i].status == 1 ? 
            <TableRowColumn><RaisedButton label="Varaa" onClick={e => this.reserve(this.props.items[i])} /></TableRowColumn> : 
            <TableRowColumn>{this.getStatus(this.props.items[i].status)}</TableRowColumn>}
          </TableRow>
        )
      } else {
        items.push(
          <TableRow key={i}>
            <TableRowColumn colSpan="4">{this.props.items[i].category} ({this.props.items[i].subCat})<br />Ilmoitettu: {this.props.items[i].date}</TableRowColumn>

            <TableRowColumn></TableRowColumn>
            {this.props.items[i].status == 1 ? 
            <TableRowColumn><RaisedButton label="Varaa" onClick={e => this.reserve(this.props.items[i])} /></TableRowColumn> : 
            <TableRowColumn>{this.getStatus(this.props.items[i].status)}</TableRowColumn>}

          </TableRow>
        )
      }
    }

    return (
      <MuiThemeProvider>
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
      </MuiThemeProvider>
    );
  }
}
export default ReservationListing;
