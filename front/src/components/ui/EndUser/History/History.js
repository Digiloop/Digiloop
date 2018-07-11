import React, { Component } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import moment from 'moment'

import { getJunkData } from '../../../../utils/fetchItems';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      order: 'asc',
      orderBy: 'junkdateadded',
      rowCount: 0,
      selected: []
    };
  }

  // fetch junk data
  getItems() {
    getJunkData().then((junks) => {
      this.setState({ items: (junks) });
    });
  }

  handleClick = (event, id) => {
    console.log(id)
    
  };


  /* createData(Lisätty, Kategoria, Alakategoria, Kpl, Koko) {
    let counter = 0;
    counter += 1;
    return { items: Lisätty, Kategoria, Alakategoria, Kpl, Koko };
  } */

  // sorting function
  getSorting(order, orderBy) {
    orderBy = this.state.orderBy
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }


  componentDidMount() {
    this.getItems();
  }

  render() {

    const styles = {
      paper: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '3%'
      }
    }
    console.log(this.state.items)
    return (
      <Paper style={styles.paper}>
        <Table>
          <TableHead
            order={this.state.order}
          // orderBy={this.state.orderBy}
          // rowCount={this.state.items.length}
          >
            <TableRow>
              <TableCell>Lisätty:<br />Kategoria / Alakategoria:<br />Kpl / Koko</TableCell>
              <TableCell>Tila</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items
              .sort(this.getSorting(this.state.order))
              .map(n => {
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.junkID)}
                    key={n.junkID}>
                    <TableCell>{moment(n.junkdateadded).format('DD.MM.YYYY')}<br />{n.category + ' / '}{n.subCat}<br />{n.pcs + 'kpl / '}{n.size}m<sup>3</sup></TableCell>
                    <TableCell>{n.status === 1 ? 'Ilmoitettu' : null}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default History;
