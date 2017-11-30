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

  for(let i = 0; i < this.props.items.length; i++){
    items.push(
      <TableRow key={i} >
        <TableRowColumn>{this.props.items[i].cat} ({this.props.items[i].subCat})<br/>Ilmoitettu: {this.props.items[i].date}</TableRowColumn>
        <TableRowColumn>{this.props.items[i].amount}kpl</TableRowColumn>
        <TableRowColumn>{this.props.items[i].size}m<sup>3</sup></TableRowColumn>
        <TableRowColumn>{this.props.items[i].weight}kg</TableRowColumn>
        {this.props.items[i].status == "free" ? <TableRowColumn><RaisedButton label="Varaa" /></TableRowColumn> : <TableRowColumn></TableRowColumn>}
        <TableRowColumn>Tila {this.props.items[i].status == "reserv" ? "Varattu" : "Vapaa"}</TableRowColumn>
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
