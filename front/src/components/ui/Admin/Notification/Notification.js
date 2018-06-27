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
import { TextField, RaisedButton } from 'material-ui';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifList: [],
      oldNotifs: [],
      rows: [],
      title: '',
      info: '',
      startDate: '',
      endDate: ''
    };
    // this.listNotif = this.listNotif.bind(this);
  }

  // fetch notifications
  getNotifications() {
    getNotifications().then((notif) => {
      this.props.itemsToStore(notif);
      // this.listNotif();
    });
  }

  // get info from notification, type: 0=expired, 1=valid
  getNotificationInfo(rownumber, type) {
    console.log('rivinumero: ' + rownumber);
    this.setState({
      type: type
    })
    this.expand(rownumber);
  }

  // edit announcement
  editNotification(title, info, startDate, endDate, rowNumber) {
    console.log(arguments);
    this.close(rowNumber)
  }

  // delete annoucement
  deleteNotification(rowNumber) {
    console.log('deletee pukkaa');
    this.close(rowNumber)
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


  // list notifications
  /* listNotif() {
    let validItems = [];
    let oldItems = [];
    const oldNotifs = [];
    let j = 0;
    let k = 0;

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
    console.log(oldItems)
    console.log(validItems)

    this.setState({
      oldItems: oldItems,
      validItems: validItems
    })

    for (let i = 0; i < oldItems.length; i++) {

      oldNotifs.push(
        <TableRow key={i}>
            <TableRowColumn colSpan='3' >{oldItems[i].info}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(i)} />
            </TableRowColumn>
          </TableRow>
      ) 

       if (this.state.rows[i]) {
        oldNotifs.push(
          <TableRow key={i} style={{ height: '150px' }}>
            <TableRowColumn colSpan='3'>
              {this.state.oldItems[i].title}<br />
              {this.state.oldItems[i].info}<br />
              {this.state.oldItems[i].dateBegin}<br />
              {this.state.oldItems[i].dateEnd}
            </TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(i, 1)} />
            </TableRowColumn>
          </TableRow>
        )
      } else {
        oldNotifs.push(
          <TableRow key={i}>
            <TableRowColumn colSpan='3' >{this.state.oldItems[i].title}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(i, 0)} />
            </TableRowColumn>
          </TableRow>
        )
      } 
    }
    this.setState({
      oldNotifs: oldNotifs
    }) 

} */

  // checks that all are filled
  checkFill() {
    //console.log(this.state);

    let pass = true;
    for (var key in this.state) {
      if ((this.state[key] === undefined || this.state[key] === '') && key !== 'rows') {
        pass = false;
      }
    }
    if (pass === true) {
      this.submit();

      this.setState({
        title: '',
        info: '',
        startDate: '',
        endDate: ''
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
    //console.log(notificationData);
    this.getNotifications();/*
    addNotification(notificationData)
      .then(() => {
        this.getNotifications();
      });*/
  }

  componentDidMount() {
    this.getNotifications();
    //
    // fetch data from backend
  }


  render() {

    let validItems = [];
    let oldItems = [];
    const oldNotifs = [];
    const validNotifs = [];
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

    // for loop notifications which has expired
    for (let l = 0; l < oldItems.length; l++) {

      if (this.state.rows[l] && this.state.type === 0) {
        oldNotifs.push(
          <TableRow key={l} style={{ height: '150px' }}>
            <TableRowColumn colSpan='3'>
              {oldItems[l].title}<br />
              {oldItems[l].info}<br />
              {oldItems[l].dateBegin}<br />
              {oldItems[l].dateEnd}
            </TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(l, 0)} />
            </TableRowColumn>
          </TableRow>
        )
      } else {
        oldNotifs.push(
          <TableRow key={l}>
            <TableRowColumn colSpan='3' >{oldItems[l].title}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(l, 0)} />
            </TableRowColumn>
          </TableRow>
        )
      }
    }

    // for loop notifications which are still valid
    for (let m = 0; m < validItems.length; m++) {

      if (this.state.rows[m + 1000] && this.state.type === 1) {
        validNotifs.push(
          <TableRow key={m} style={{ height: '150px' }}>
            <TableRowColumn colSpan='3'>
              Otsikko:  {validItems[m].title}<br />
              Info:     {validItems[m].info}<br />
              Alkupvm:  {validItems[m].dateBegin}<br />
              Loppupvm: {validItems[m].dateEnd}
            </TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Muokkaa' onClick={() =>
                this.editNotification(validItems[m].title, validItems[m].info, validItems[m].dateBegin, validItems[m].dateEnd, m+1000)} />
              <br /><br />
              <RaisedButton label='Poista' onClick={() => this.deleteNotification(m+1000)} />
            </TableRowColumn>
          </TableRow>
        )
      } else {
        validNotifs.push(
          <TableRow key={m}>
            <TableRowColumn colSpan='3' >{validItems[m].title}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton label='Näytä' onClick={() => this.getNotificationInfo(m + 1000, 1)} />
            </TableRowColumn>
          </TableRow>
        )
      }
    }

    return (

      <MuiThemeProvider>
        <div>
          <div className="NotifContainer" style={{
            width: '45%',
            marginTop: '50px',
            marginLeft: '50px',
            float: 'left',
          }}>
            <h3>Voimassa olevat ilmoitukset</h3>
            <div className='frontPageBox'>
              <Table>
                <TableBody displayRowCheckbox={false}>
                  {validNotifs}
                </TableBody>
              </Table>
            </div>
            <h3>Vanhat ilmoitukset</h3>
            <div className='frontPageBox'>
              <Table>
                <TableBody displayRowCheckbox={false}>
                  {oldNotifs}
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
              value={this.state.title}
              style={{
                width: '99%',
                marginLeft: '4px',
                border: '2px solid #bedb92',
                borderRadius: '10px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event) => this.setState({ title: event.target.value })}
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
              value={this.state.info}
              style={{
                border: '2px solid #a6ce6a',
                borderRadius: '10px',
                height: '100px',
                width: '95%',
                fontSize: '16px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event) => this.setState({ info: event.target.value })}
            />

            <h2 style={{ margin: '30px 0 0 0', textAlign: 'left' }}>Ilmoituksen kesto</h2>

            <TextField
              type="date"
              hintText=" "
              value={this.state.startDate}
              style={{
                width: '35%',
                border: '2px solid #a6ce6a',
                borderRadius: '10px',
                marginRight: '10px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event) => this.setState({ startDate: event.target.value })}
            />
            -
            <TextField
              type="date"
              hintText=' '
              value={this.state.endDate}
              style={{
                width: '35%',
                border: '2px solid #a6ce6a',
                borderRadius: '10px',
                marginLeft: '10px',
                fontFamily: 'Kanit',
                backgroundColor: 'white'
              }}
              onChange={(event) => this.setState({ endDate: event.target.value })}
            />

            <h3></h3>
            <button style={{
              width: '100px',
              height: '30px',
              border: '2px solid #004225',
              borderRadius: '10px',
              marginBottom: '10px',
              fontFamily: 'Kanit'
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
