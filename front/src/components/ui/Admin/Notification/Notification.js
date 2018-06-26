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
import { getNotifications, addNotification } from '../../../../utils/fetchNotifications.js';
import { TextField } from 'material-ui';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifList: [],
      oldNotifs: [],
      notificationData: {
        title: '',
        info: '',
        startDate: null,
        endDate: null
      }

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
    const oldItems = [];

    for (let i = 0; i < this.props.items.length; i++) {
      console.log(this.props.items);
      const today = Date.now();
      const endDate = Date.parse(this.props.items[i].dateEnd);

      if (today >= endDate) {
        oldItems.push(
          <TableRow key={i} >
            <TableRowColumn>{this.props.items[i].title}</TableRowColumn>
            <TableRowColumn>{this.props.items[i].info}</TableRowColumn>
          </TableRow>
        )
      } else {
        items.push(
          <TableRow key={i} >
            <TableRowColumn>{this.props.items[i].title}</TableRowColumn>
            <TableRowColumn>{this.props.items[i].info}</TableRowColumn>
          </TableRow>
        )
      }
    }

    this.setState({
      notifList: items,
      oldNotifs: oldItems
    })
  }

  checkFill() {

    let pass = true;
    for (var key in this.state.notificationData) {
      if (this.state[key] === undefined || this.state[key] === '') {
        pass = false;
      }
    }
    if (pass === true) {
      this.submit();
      this.setState({
        title: '',
        info: '',
        startDate: null,
        endDate: null
      })
    } else {
      window.alert("Täytä lootat!");
    }
  }

  // add new announcement
  submit(event) {
    var notificationData = {
      title: this.state.title,
      info: this.state.info,
      dateBegin: this.state.startDate,
      dateEnd: this.state.endDate
    }
    console.log(notificationData);
    /* addNotification(notificationData)
      .then(() => {
        this.getNotifications();
      }); */
  }

  componentDidMount() {
    this.getNotifications();
    //
    // fetch data from backend
  }


  render() {
    return (

      <MuiThemeProvider>
        <div>
          <div className="#NotifContainer" style={{
            width: '45%',
            marginTop: '50px',
            marginLeft: '50px',
            float: 'left',
          }}>
            <h3>Voimassa olevat ilmoitukset</h3>
            <div className='frontPageBox'>
              <Table>
                <TableBody displayRowCheckbox={false}>
                  {this.state.notifList}
                </TableBody>
              </Table>
            </div>
            <h3>Vanhat ilmoitukset</h3>
            <div className='frontPageBox'>
              <Table>
                <TableBody displayRowCheckbox={false}>
                  {this.state.oldNotifs}
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
            <TextField
              type='text'
              hintText="Kirjoita otsikko tähän"
              underlineStyle={{ borderColor: '#A6CE6B' }}
              underlineFocusStyle={{ borderColor: '#004225' }}
              value={this.state.notificationData.title}
              style={{
                width: '99%',
                marginLeft: '4px',
                border: '2px solid #bedb92',
                borderRadius: '10px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event, newValue) => this.setState({ title: newValue })}
            />

            <h2 style={{
              margin: '30px 0 0 0',
              textAlign: 'left'
            }}>Infoteksti</h2>

            <TextField
              multiLine={true}
              rows={4}
              rowsMax={7}
              maxLength="1000"
              hintText="Tähän tarkemmat infot tapahtumasta"
              style={{
                border: '2px solid #a6ce6a',
                borderRadius: '7px',
                height: '100px',
                width: '95%',
                fontSize: '16px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event, newValue) => this.setState({ info: newValue })}
            />

            <h2 style={{ margin: '30px 0 0 0', textAlign: 'left' }}>Ilmoituksen kesto</h2>

            <TextField
              type="date"
              hintText=" "
              style={{
                width: '35%',
                border: '2px solid #a6ce6a',
                borderRadius: '10px',
                marginRight: '10px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event, newValue) => this.setState({ startDate: newValue })}
            />
            -
            <TextField
              type="date"
              hintText=' '
              style={{
                width: '35%',
                border: '2px solid #a6ce6a',
                borderRadius: '10px',
                marginLeft: '10px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event, newValue) => this.setState({ endDate: newValue })}
            />

            <h3></h3>
            <button style={{
              width: '100px',
              height: '30px',
              border: '2px solid #004225',
              borderRadius: '10px',
              marginBottom: '10px',
              fontFamily: 'Kanit',
            }}
              onClick={(event) => this.checkFill(event)}
            >Lähetä</button>

          </div>
        </div>
      </MuiThemeProvider>

    );
  }
}
export default Notification;
