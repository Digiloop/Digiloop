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
    this.createStates = this.createStates.bind(this);
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

  reserve(item) {
    console.log(this.props.loginInfo);
    //reserveItem(2, 1, item.junkID);
  }

  expand(x) {
    console.log(x);
    console.log(this.state.rows);

    let newArray = this.state.rows;
    newArray[x] = !newArray[x];

    this.setState({ rows: newArray });
  }

  // create states for each row
  createStates() {
    console.log(this.props.items);
    for (let i = 0; i < this.props.items.length; i++) {
      this.setState(prevState => ({
        rows: [...prevState.rows, "asd"]
      }))
    }
  }


  componentWillReceiveProps(nextProps) {
    let arr = this.state.rows;
    console.log(this.props.items);
    console.log(this.props);
    console.log(nextProps);

    for (let i = 0; i < nextProps.items.length; i++) {
      arr = [...arr, false]
    }
    this.setState({ rows: arr });
  }

  render() {

    const items = [];
    console.log(this.props.items);

    for (let i = 0; i < this.props.items.length; i++) {

      if (this.state.rows[i]) {

        items.push(
          <TableRow key={i} >
            <TableRowColumn>{this.props.items[i].category} ({this.props.items[i].subCat})<br />Ilmoitettu: {this.props.items[i].date}</TableRowColumn>

            <TableRowColumn>{this.props.items[i].pcs}kpl</TableRowColumn>
            <TableRowColumn>{this.props.items[i].size}m<sup>3</sup></TableRowColumn>
            <TableRowColumn>{this.props.items[i].weight}kg</TableRowColumn>


            {this.props.items[i].status == 1 ? <TableRowColumn><RaisedButton label="Varaa" onClick={e => this.reserve(this.props.items[i])} /></TableRowColumn> : <TableRowColumn></TableRowColumn>}
            <TableRowColumn>Tila {this.getStatus(this.props.items[i].status)}</TableRowColumn>
          </TableRow>
        )
      } else {
        items.push(
          <TableRow key={i} >
            <TableRowColumn>{this.props.items[i].category} ({this.props.items[i].subCat})<br />Ilmoitettu: {this.props.items[i].date}</TableRowColumn>

            <TableRowColumn></TableRowColumn>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn></TableRowColumn>

            {this.props.items[i].status == 1 ? <TableRowColumn><RaisedButton label="Varaa" onClick={e => this.reserve(this.props.items[i])} /></TableRowColumn> : <TableRowColumn></TableRowColumn>}
            <TableRowColumn>Tila {this.getStatus(this.props.items[i].status)}</TableRowColumn>
          </TableRow>
        )
      }
    }

    return (
      <MuiThemeProvider>
        <Table onCellClick={rowNumber => this.expand(rowNumber)}>
          <TableBody displayRowCheckbox={false}>
            {items}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListing;
