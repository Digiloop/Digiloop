import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { getNotifications } from '../../../../utils/fetchNotifications.js';
import moment from 'moment'

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      scroll: 'paper',
      open: false
    };
  }

  // fetch notifications
  getNotifications() {
    getNotifications().then((notif) => {
      this.props.itemsToStore(notif);
    });
  }

  getNotificationInfo(rownumber) {
    this.expand(rownumber);
    this.handleDialogOpen();
  }

  closeNotification(rownumber) {
    this.close(rownumber);
  }

  // open row
  expand(rowNumber) {

    // close open ones
    for (let i = 0; i < this.state.rows.length; i++) {
      if (this.state.rows[i]) {
        this.state.rows[i] = false;
      }
    }

    // open new row
    this.state.rows[rowNumber] = true;
    this.setState({ rows: this.state.rows });
  }

  // close row
  close(rowNumber) {

    for (let i = 0; i < this.state.rows.length; i++) {
      if (this.state.rows[i]) {
        this.state.rows[i] = false;
      }
    }
    this.setState({ rows: this.state.rows });
  }


  // open dialog
  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  // close dialog
  handleDialogClose = () => {
    this.setState({ open: false })
    this.getNotificationInfo();
  }

  componentDidMount() {
    this.getNotifications();
  }


  render() {

    let validItems = [];
    let oldItems = [];
    const validNotifs = [];
    const dialog = [];
    let j = 0;
    let k = 0;

    // sort notifications to valid and expired
    for (let i = 0; i < this.props.items.length; i++) {
      // get timestamp to compare if notification has expired

      const today = Date.now();
      const endDate = Date.parse(this.props.items[i].dateEnd);

      if (today >= endDate) {
        oldItems[j] = Object.assign({}, this.props.items[i]);
        j++;
      } else {
        validItems[k] = Object.assign({}, this.props.items[i]);
        k++;
      }
    }

    // for loop notifications which are still valid
    for (let l = 0; l < validItems.length; l++) {

      if (this.state.rows[l]) {
        dialog.push(
          <Dialog key={l}
            open={this.state.open}
            onClose={this.handleDialogClose}
            scroll={this.state.scroll}
            fullWidth={true}
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle>{validItems[l].title}</DialogTitle>
            <DialogTitle>{validItems[l].info}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Alkupäivämäärä: {moment(validItems[l].dateBegin).format('DD.MM.YYYY')}
              </DialogContentText>
              <DialogContentText>
                Loppupäivämäärä: {moment(validItems[l].dateEnd).format('DD.MM.YYYY')}
              </DialogContentText>
              <DialogContentText style={{ marginTop: '3%' }}>
              Ilmoittaja: {validItems[l].company}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <RaisedButton label='Sulje' onClick={() => this.closeNotification(l)} />
            </DialogActions>
          </Dialog>
        )
        validNotifs.push(
          <TableRow key={l}>
            <TableRowColumn colSpan='2' >{validItems[l].title}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(l)} />
            </TableRowColumn>
          </TableRow>
        )
      } else {
        validNotifs.push(
          <TableRow key={l}>
            <TableRowColumn colSpan='2' >{validItems[l].title}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(l)} />
            </TableRowColumn>
          </TableRow>
        )
      }      
    }

    return (

      <MuiThemeProvider>
        <div className={validNotifs.length ? 'frontPageBox' : null}>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {!validNotifs.length ? null : validNotifs }
            </TableBody>
          </Table>
          {dialog}
        </div>
      </MuiThemeProvider>

    );
  }
}
export default Notification;
