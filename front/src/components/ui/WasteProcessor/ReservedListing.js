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
import { changeReservationStatus, cancelReservation } from '../../../utils/reserveItems';

class ReservedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      showAll: true,
      newList: []
    }
  }

  // fetch junk data
  getJunksData() {
    getJunkData().then((junks) => {
      // this.setState({ junks: junks })
      this.createNewList();
    });
  }

  // cancel reserved item, setting it as free
  cancelItemReserve(item) {
    cancelReservation(item.junkID).then(
      this.props.refreshJunks
    );
  }

  // change item reservation status
  reserve(status, item) {
    changeReservationStatus(status + 1, item.fetcher, item.junkID).then(
      this.props.refreshJunks
    );
  }

  createNewList() {
    let newObject = [];
    let newObject2 = [];
    let j = 0;
    let k = 0;

    for (let i = 0; i < this.props.items.length; i++) {

      if (this.props.items[i].status === 2 || this.props.items[i].status === 3) {

        getJunkOwnerData(this.props.items[i].fetcher).then((data) => {
          newObject[j] = Object.assign({ data }, this.props.items[i])
          getJunkOwnerData(this.props.items[i].owner).then((junkOwner) => {
            newObject2[k] = Object.assign({ junkOwner }, newObject[k])
            k++
          })
          j++
        })
        this.setState({
          newList: newObject2
        })
      }
    }
    console.log(this.state.newList)
    // this.listReserved();
    // timeout because setState is too slow
    setTimeout(() => { this.listReserved() }, 500)


  }

  listReserved() {
    const items = [];
    console.log(this.props.userInfo)

    for (let i = 0; i < this.state.newList.length; i++) {

      if (this.state.newList[i].data.company === this.props.userInfo.company && this.state.showAll) {
        items.push(
          <TableRow key={i} >
            <TableRowColumn colSpan='1'>{this.state.newList[i].category} ({this.state.newList[i].subCat})<br />
              Ilmoitettu: {this.state.newList[i].junkdateadded}</TableRowColumn>
            <TableRowColumn>Ilmoittaja: {this.state.newList[i].junkOwner.fname} {this.state.newList[i].junkOwner.lname}<br />
              Varaaja: {this.state.newList[i].data.company} / {this.state.newList[i].data.lname}</TableRowColumn>
            <TableRowColumn>Tila: {this.getStatus(this.state.newList[i].status)}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton style={{ marginRight: '5%' }}
                label="Peruuta"
                onClick={e => this.cancelItemReserve(this.state.newList[i])}
                disabled={this.props.userInfo.userlvl === '1' ? null : this.props.userInfo.id !== this.state.newList[i].fetcher
                  /*(this.props.userInfo.id !== this.state.newList[i].fetcher) || this.props.userInfo.userlvl !== '2'*/}
              />
              <RaisedButton
                label='-->'
                onClick={e => this.reserve(this.state.newList[i].status, this.state.newList[i])}
                disabled={this.props.userInfo.userlvl === '1' ? null : this.props.userInfo.id !== this.state.newList[i].fetcher}
              />
            </TableRowColumn>
          </TableRow>
        )
      }
      if (!this.state.showAll) {
        items.push(
          <TableRow key={i} >
            <TableRowColumn colSpan='1'>{this.state.newList[i].category} ({this.state.newList[i].subCat})<br />
              Ilmoitettu: {this.state.newList[i].junkdateadded}</TableRowColumn>
            <TableRowColumn>Ilmoittaja: {this.state.newList[i].junkOwner.fname} {this.state.newList[i].junkOwner.lname}<br />
              Varaaja: {this.state.newList[i].data.company}</TableRowColumn>
            <TableRowColumn>Tila: {this.getStatus(this.state.newList[i].status)}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton style={{ marginRight: '5%' }}
                label="Peruuta"
                onClick={e => this.cancelItemReserve(this.state.newList[i])}
                disabled={this.props.userInfo.id !== this.state.newList[i].fetcher}
              />
              <RaisedButton
                label='-->'
                onClick={e => this.reserve(this.state.newList[i].status, this.state.newList[i])}
                disabled={this.props.userInfo.id !== this.state.newList[i].fetcher}
              />
            </TableRowColumn>
          </TableRow>
        )
      }
    }
    this.setState({
      itemList: items
    })
  }

  // get the list of available junks
  componentDidMount() {
    this.getJunksData();
  }


  // turns status id into a printable status
  getStatus(status) {
    switch (status) {
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
        <RaisedButton
          style={{ margin: '2%' }}
          label={this.state.showAll ? 'Näytä kaikki' : 'Näytä omat'}
          onClick={(event) => this.setState({ showAll: !this.state.showAll }, function () { this.listReserved() })}
        />
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
export default ReservedListing;
