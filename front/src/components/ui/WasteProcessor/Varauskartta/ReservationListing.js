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

class ReservationListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    //console.log(this.props.items);

    for (let i = 0; i < this.props.items.length; i++) {
      items.push(
        <TableRow key={i} >
          <TableRowColumn>{this.props.items[i].category} ({this.props.items[i].subCat})<br />Ilmoitettu: {this.props.items[i].date}</TableRowColumn>
          <TableRowColumn>{this.props.items[i].pcs}kpl</TableRowColumn>
          <TableRowColumn>{this.props.items[i].size}m<sup>3</sup></TableRowColumn>
          <TableRowColumn>{this.props.items[i].weight}kg</TableRowColumn>
          {this.props.items[i].status == 1 ? <TableRowColumn><RaisedButton label="Varaa" /></TableRowColumn> : <TableRowColumn></TableRowColumn>}
          <TableRowColumn>Tila {this.getStatus(this.props.items[i].status)}</TableRowColumn>
        </TableRow>
      )
    }

    return (
      <MuiThemeProvider>
        <Table>
          <TableBody displayRowCheckbox={false}>
            {items}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListing;
