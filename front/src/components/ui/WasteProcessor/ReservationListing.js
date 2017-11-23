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
constructor(props){
  super(props);
  this.state={
    itemCount: 3,
    items: [
      {
      cat: 'SER',
      subCat: 'Data',
      amount: 12,
      size: 0.59,
      weight: 4.2,
      date: "27-10-2017",
      status: 'free'
      },
      {
      cat: 'SER',
      subCat: 'Iso',
      amount: 10,
      size: 3.89,
      weight: 4.7,
      date: "27-10-2017",
      status: 'free'
      },
      {
      cat: 'SER',
      subCat: 'Pieni',
      amount: 7,
      size: 0.96,
      weight: 1.2,
      date: "26-10-2017",
      status: 'reserv'
      }
    ] // items array end
  }
 }



render() {

  const items = [];

  for(let i = 0; i < this.state.itemCount; i++){
    items.push(
      <TableRow key={i} >
        <TableRowColumn>{this.state.items[i].cat} ({this.state.items[i].subCat})<br/>Ilmoitettu: {this.state.items[i].date}</TableRowColumn>
        <TableRowColumn>{this.state.items[i].amount}kpl</TableRowColumn>
        <TableRowColumn>{this.state.items[i].size}m<sup>3</sup></TableRowColumn>
        <TableRowColumn>{this.state.items[i].weight}kg</TableRowColumn>
        {this.state.items[i].status == "free" ? <TableRowColumn><RaisedButton label="Varaa" /></TableRowColumn> : <TableRowColumn></TableRowColumn>}
        <TableRowColumn>Tila {this.state.items[i].status == "reserv" ? "Varattu" : "Vapaa"}</TableRowColumn>
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