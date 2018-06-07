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
import { getJunkData } from '../../../utils/fetchItems';

class ReservedListing extends Component {
constructor(props){
  super(props);
  this.state = {
      itemList: []
  }
  this.listReserved = this.listReserved.bind(this);
 }

 // fetch junk data
getJunksData() {
  getJunkData().then((junks) => {
    this.props.itemsToStore(junks);
    this.listReserved();
  });
}

listReserved(){
  const items = [];
  for(let i = 0; i < this.props.items.length; i++){
    if(this.props.items[i].status === 2){
    items.push(
      <TableRow key={i} >
        <TableRowColumn>{this.props.items[i].category} ({this.props.items[i].subCat})<br/>Ilmoitettu: {this.props.items[i].date}</TableRowColumn>
        <TableRowColumn>{this.props.items[i].pcs}kpl</TableRowColumn>
        <TableRowColumn>{this.props.items[i].size}m<sup>3</sup></TableRowColumn>
        <TableRowColumn>{this.props.items[i].weight}kg</TableRowColumn>
        <TableRowColumn>{this.props.items[i].owner}</TableRowColumn>
        <TableRowColumn>{this.props.items[i].fetcher}</TableRowColumn>
        <TableRowColumn>Tila { this.getStatus( this.props.items[i].status ) }</TableRowColumn>
      </TableRow>
    )
  }
  }

  this.setState({
    itemList: items
  })
}

componentDidMount(){
  this.getJunksData();
    //
    // fetch data from backend
}

getStatus(status){
  switch(status){
    case 0:
    return "Hidden";
    break;

    case 1:
    return "Vapaa";
    break;

    case 2:
    return "Varattu";
    break;

    case 3:
    return "Matkalla";
    break;

    case 4:
    return "Noudettu";
    break;

    default:
    break;
  }
}



render() {



    return (
      <MuiThemeProvider>
        <Table>
          <TableBody displayRowCheckbox={false}>
            {this.state.itemList}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}
export default ReservedListing;
