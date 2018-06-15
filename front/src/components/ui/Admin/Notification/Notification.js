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
          marginLeft: '50px',
          float: 'left',
        }}>
          <div className='frontPageBox'>
            <Table>
              <TableBody displayRowCheckbox={false}>
                {this.state.notifList}
              </TableBody>
            </Table>
          </div>
        </div>

        <div style={{
          float: 'left',
          marginTop: '50px',
          marginLeft: '75px',
          textAlign: 'left',
          width: '35%',
          border: '3px solid white',
          borderRadius: '10px',
          padding: '0px 15px',
        }}>

          <h1 style={{
            textAlign: 'center',
            margin: '0 0 20px 0',
          }}>Lisää Ilmoitus</h1>

          <h2 style={{ margin: '30px 0 0 0', textAlign: 'left' }}>Otsikko</h2>
          <input text="" placeholder="Tämä osa näkyy käyttäjälle ensimmäisenä" style={{
            width: '95%',
            padding: '10px',
            border: '2px solid #bedb92',
            borderRadius: '10px',
            fontFamily: 'Kanit',
          }} />

          <h2 style={{
            margin: '30px 0 0 0',
            textAlign: 'left'
          }}>Infoteksti</h2>

          <textarea rows='4' cols="50" placeholder="Tähän tarkemmat infot tapahtumasta, aukeaa klikkaamalla ilmoitusta" style={{
            border: '2px solid #a6ce6a',
            borderRadius: '7px',
            height: '100px',
            width: '95%',
            fontSize: '16px',
            padding: '10px',
            fontFamily: 'Kanit',
          }} />

          <h2 style={{ margin: '30px 0 0 0', textAlign: 'left' }}>Ilmoituksen kesto</h2>

          <input text="" type="date" style={{
            width: '130px',
            border: '2px solid #a6ce6a',
            borderRadius: '10px',
            padding: '10px',
            marginRight: '10px',
            fontFamily: 'Kanit',
          }}>
          </input>
          -
            <input text="" type="date" style={{
            width: '130px',
            border: '2px solid #a6ce6a',
            borderRadius: '10px',
            padding: '10px',
            marginLeft: '10px',
            fontFamily: 'Kanit',
          }}>
          </input>

          <h3></h3>
          <button style={{
            width: '100px',
            height: '30px',
            border: '2px solid #004225',
            borderRadius: '10px',
            marginBottom: '10px',
            fontFamily: 'Kanit',
          }}>Lähetä</button>

        </div>
      </MuiThemeProvider>

    );
  }
}
export default Notification;
