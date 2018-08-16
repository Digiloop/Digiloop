import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getOwnJunkData } from '../../../utils/fetchItems';

class HistoryListing extends Component {
constructor(props){
  super(props);
  this.state = {
    itemList: []
  }
  this.listHistory = this.listHistory.bind(this);
 }

   // fetch junk data
getJunksData() {
  getOwnJunkData().then((junks) => {
    this.setState({
      items: junks
    })
    this.listHistory();
  });
}


listHistory(){
  const items = [];
  console.log(this.state.items)
  for(let i = 0; i < this.state.items.length; i++){
    if(this.state.items[i].status === 4 && this.state.items[i].company === this.props.userInfo.company){
    items.push(
      <TableRow key={i} >
        <TableRowColumn>{this.state.items[i].category} ({this.state.items[i].subCat})<br/>Ilmoitettu: {this.state.items[i].date}</TableRowColumn>
        <TableRowColumn>{this.state.items[i].pcs}kpl</TableRowColumn>
        <TableRowColumn>{this.state.items[i].size}m<sup>3</sup></TableRowColumn>
        <TableRowColumn>{this.state.items[i].weight}kg</TableRowColumn>
        <TableRowColumn>Tila { this.getStatus( this.state.items[i].status ) }</TableRowColumn>
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
