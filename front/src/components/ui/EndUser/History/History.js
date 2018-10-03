import React, { Component } from 'react';
import { BASE_URL } from '../../../../settings';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { RaisedButton } from 'material-ui';
import moment from 'moment'

import { getEnduserJunks, deleteJunk } from '../../../../utils/fetchItems';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      order: 'desc',
      orderBy: 'junkdateadded',
      rowCount: 0,
      selected: [],
      open: false,
      scroll: 'paper',
      dialog: []
    };
  }

  // fetch junk data
  getItems() {
    getEnduserJunks().then((junks) => {
      this.setState({ items: (junks) });
    });
  }

  handleClick = (event, data) => {
    this.handleDialogOpen();
    this.showItemDialog(data);
  };

  showItemDialog(data) {
    this.setState({
      data: data
    })
  }

  // item delete, if not reserved
  deleteItem(id) {
    deleteJunk(id).then(() => {
      this.getItems();
    });
    this.handleDialogClose();
  }

  // sorting function
  getSorting(order, orderBy) {
    orderBy = this.state.orderBy
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }

  // open dialog
  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  // close dialog
  handleDialogClose = () => {
    this.setState({ open: false })
    this.getItems();
  }

  getStatus(status) {
    switch (status) {
      case 0:
        return "Hidden";

      case 1:
        return "Ilmoitettu";

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

  componentDidMount() {
    this.getItems();
  }

  render() {

    const styles = {
      paper: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '3%'
      },
      image: {
        width: '300px'
      }
    }

    const dialog = [];
    if (this.state.open) {
      dialog.push(
        <Dialog key={this.state.data.junkID}
          open={this.state.open}
          onClose={this.handleDialogClose}
          scroll={this.state.scroll}
          fullWidth={true}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle>{this.state.data.category} / {this.state.data.subCat}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nouto-osoite: {this.state.data.pickupaddr}, {this.state.data.zipcode} {this.state.data.city}
            </DialogContentText>
            <DialogContentText>
              Ilmoitettu: {moment(this.state.data.junkdateadded).format('DD.MM.YYYY')}
            </DialogContentText>
            <DialogContentText>
              Tila: {this.getStatus(this.state.data.status)}
            </DialogContentText>
            <DialogContentText>
              Nouto-ohjeet: {this.state.data.wishbox}
            </DialogContentText>
            <DialogContentText>
              Kuvaus: {this.state.data.description}
            </DialogContentText>
            <DialogContentText>
              Kuva: <img style={styles.image} src={BASE_URL + '/images/items/' + this.state.data.picture} alt='ei kuvaa' />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <RaisedButton label='Takaisin' onClick={() => this.handleDialogClose()} />
            <RaisedButton label='Poista' onClick={() => this.deleteItem(this.state.data.junkID)}
              disabled={this.state.data.status !== 1}
            />
          </DialogActions>
        </Dialog>
      )
    }

    return (
      <Paper style={styles.paper}>
        <Table>
          {dialog}
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
            {this.state.items.length ?
              this.state.items
                .sort(this.getSorting(this.state.order))
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      key={n.junkID}>
                      <TableCell>{moment(n.junkdateadded).format('DD.MM.YYYY')}<br />{n.category + ' / '}{n.subCat}<br />{n.pcs + 'kpl / '}{n.size}m<sup>3</sup></TableCell>
                      <TableCell>{this.getStatus(n.status)}</TableCell>
                    </TableRow>
                  )
                }) : <TableRow><TableCell>Et ole ilmoittanut mitään</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default History;
