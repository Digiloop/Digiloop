import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../../../ArtunCSSsaadot.css';

//let _ser, _batteries, _showRes

class ReservationListOptions extends Component {
constructor(props){
  super(props);
  this.state={
    _ser: false,
    _batteries: false,
    _showRes: false,
    _minWeight: 0,
    _maxWeight: 0,
    _minSize: 0,
    _maxSize: 0,
    _distance: 0
  }
 }



submit = e => {
  e.preventDefault()
  this.props.onNewOptions({
    // categories
    ser: this.state._ser.checked,
    batteries: this.state._batteries.checked,

    // show reserved
    showRes: this.state._showRes.checked,

    // size & distance
    minWeight: this.state._minWeight.value,
    maxWeight: this.state._maxWeight.value,
    minSize: this.state._minSize.value,
    maxSize: this.state._maxSize.value,
    distance: this.state._distance.value,
  })
}

render() {


    // TODO create styling for options
    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit} className="ResListOptForm">

        <div id="ResListOptionsPohjadiv">
          <div id="ResListOptionsColorDiv">
            <table>
              <tr>
                <td>Paino (kg)</td>
                <td id="weightField"><input id="weight" ref={input => this.state._minWeight = input} type="textbox" maxlength="6"/> - <input id="weight" ref={input => this.state._maxWeight = input} type="textbox" maxlength="6"/></td>
              </tr>
              <tr>
                <td>Koko (m<sup>3</sup>)</td>
                <td id="sizeField"><input id="size" ref={input => this.state._minSize = input} type="textbox" maxlength="6" /> - <input id="size" ref={input => this.state._maxSize = input} type="textbox" maxlength="6"/></td>
              </tr>
              <tr>
                <td>Etäisyys (km)</td>
                <td id="distanceField"><input id="distance" ref={input => this.state._distance = input} type="textbox" maxlength="6"/></td>
              </tr>
              <tr>
                <td> &nbsp; </td>
              </tr>
            </table>

            <table>
              <tr>
                <td class="type">Ser</td>
                <td><input id="ser" ref={input => this.state._ser = input} type="checkbox" /></td>
                <td class="type"> </td>
                <td class="type">Iso SER</td>
                <td><input id="ser" ref={input => this.state._ser = input} type="checkbox" /></td>
              </tr>
              <tr>
                <td class="type">Akut</td>
                <td><input id="akut" ref={input => this.state._batteries = input} type="checkbox" /></td>
                <td class="type"> </td>
                <td class="type">Tietoturva</td>
                <td><input id="akut" ref={input => this.state._batteries = input} type="checkbox" /></td>
              </tr>
              <tr>
                <td> &nbsp; </td>
              </tr>
            </table>

            <table>
            <tr>
              <td>Näytä varatut</td>
              <td><input id="sRes" ref={input => this.state._showRes = input} type="checkbox" /></td>
            </tr>
            </table>
            
            <input type="submit" id="submitButt"></input>

          </div>
        </div>
        </form>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListOptions;
