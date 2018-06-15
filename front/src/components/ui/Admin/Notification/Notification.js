import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getNotifications } from '../../../../utils/fetchNotifications.js';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifList: []
    };
    this.listNotif = this.listNotif.bind(this);
  }

  // fetch notifications
  getNotifications() {
    getNotifications().then((notif) => {
      this.props.itemsToStore(notif);
      this.listNotif();
    });
  }


  listNotif() {
    const items = [];
    for (let i = 0; i < this.props.items.length; i++) {
      items.push(
        <TableRow key={i} >
          <TableRowColumn>{this.props.items[i].info}</TableRowColumn>
        </TableRow>
      )
    }

    this.setState({
      notifList: items
    })
  }

  componentDidMount() {
    this.getNotifications();
    //
    // fetch data from backend
  }


  render() {
    return (

        <MuiThemeProvider>
          <div className="#NotifContainer" style={{
            width: '45%',
            marginTop: '50px',
            marginLeft: '50px'
          }}>
          <div className='frontPageBox'>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {this.state.notifList}
            </TableBody>
          </Table>
          </div>
          </div>
        </MuiThemeProvider>

    );
  }
}
export default Notification;
