import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { getJunkData, getJunkOwnerData } from '../../../utils/fetchItems';

class HistoryListing extends Component {
constructor(props){
  super(props);
  this.state = {
    itemList: []
  }
  this.listHistory = this.listHistory.bind(this);
 }


listHistory(){
  const items = [];
  for(let i = 0; i < this.props.items.length; i++){
    if(this.props.items[i].status === 4){
    items.push(
      <TableRow key={i} >
        <TableRowColumn>{this.props.items[i].category} ({this.props.items[i].subCat})<br/>Ilmoitettu: {this.props.items[i].date}</TableRowColumn>
        <TableRowColumn>{this.props.items[i].pcs}kpl</TableRowColumn>
        <TableRowColumn>{this.props.items[i].size}m<sup>3</sup></TableRowColumn>
        <TableRowColumn>{this.props.items[i].weight}kg</TableRowColumn>
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
  this.listHistory();  
}

getStatus(status){
  switch(status){
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
      <div className="ReservedPageContainer">
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
export default HistoryListing;
