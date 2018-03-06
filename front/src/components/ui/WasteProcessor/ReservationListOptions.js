import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../../../ArtunCSSsaadot.css';

//let _ser, _batteries, _showRes

class ReservationListOptions extends Component {
constructor(props){
  super(props);
  this.state={
    // categories
    _ser: true,
    _batteries: true,
    _infoSecurity: true,

    // subcategories
    _serSmallSer: true,
    _serBigSer: true,
    _serDataSer: true,
    _serLampSer: true,

    _battNickelKadium: true,
    _battNickelMetal: true,
    _battOther: true,

    _infosecDataSer: true,
    _infosecPaper: true,

    // show reserved
    _showRes: true,

    // properties
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
    infoSecurity: this.state._infoSecurity.checked,

    // subcats
    serSmallSer: this.state._serSmallSer.checked,
    serBigSer: this.state._serBigSer.checked,
    serDataSer: this.state._serDataSer.checked,
    serLampSer: this.state._serLampSer.checked,

    battNickelKadium: this.state._battNickelKadium.checked,
    battNickelMetal: this.state._battNickelMetal.checked,
    battOther: this.state._battOther.checked,

    infosecDataSer: this.state._infosecDataSer.checked,
    infosecPapaer: this.state._infosecPaper.checked,

    // show reserved
    showRes: this.state._showRes.checked,

    // properties
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
              <tbody>
                <tr>
                  <td>Paino (kg)</td>
                  <td id="weightField"><input id="weight" ref={input => this.state._minWeight = input} type="textbox" maxLength="6"/> - <input id="weight" ref={input => this.state._maxWeight = input} type="textbox" maxLength="6"/></td>
                </tr>
                <tr>
                  <td>Koko (m<sup>3</sup>)</td>
                  <td id="sizeField"><input id="size" ref={input => this.state._minSize = input} type="textbox" maxLength="6" /> - <input id="size" ref={input => this.state._maxSize = input} type="textbox" maxLength="6"/></td>
                </tr>
                <tr>
                  <td>Etäisyys (km)</td>
                  <td id="distanceField"><input id="distance" ref={input => this.state._distance = input} type="textbox" maxLength="6"/></td>
                </tr>
                <tr>
                  <td> &nbsp; </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td className="type">Ser</td>
                  <td><input id="ser" ref={input => this.state._ser = input} type="checkbox" /></td>

                  <td className="type">Akut</td>
                  <td><input id="akut" ref={input => this.state._batteries = input} type="checkbox" /></td>

                  <td className="type">Tietoturva</td>
                  <td><input id="akut" ref={input => this.state._infoSecurity = input} type="checkbox" /></td>
                </tr>

                <tr>
                  <td className="type">SER - Pieni SER</td>
                  <td><input id="ser" ref={input => this.state._serSmallSer = input} type="checkbox" /></td>

                  <td className="type">SER - Iso SER</td>
                  <td><input id="ser" ref={input => this.state._serBigSer = input} type="checkbox" /></td>

                  <td className="type">SER - Data SER</td>
                  <td><input id="ser" ref={input => this.state._serDataSer = input} type="checkbox" /></td>

                  <td className="type">SER - Lamppu SER</td>
                  <td><input id="ser" ref={input => this.state._serLampSer = input} type="checkbox" /></td>

                  <td className="type">Akut - Nikkelikadium</td>
                  <td><input id="ser" ref={input => this.state._battNickelKadium = input} type="checkbox" /></td>

                  <td className="type">Akut - Nikkelimetallihybridi</td>
                  <td><input id="ser" ref={input => this.state._battNickelMetal = input} type="checkbox" /></td>

                  <td className="type">Akut - Muut</td>
                  <td><input id="ser" ref={input => this.state._battOther = input} type="checkbox" /></td>

                  <td className="type">Tietoturva - Data SER</td>
                  <td><input id="ser" ref={input => this.state._infosecDataSer = input} type="checkbox" /></td>

                  <td className="type">Tietoturva - Paperi</td>
                  <td><input id="ser" ref={input => this.state._infosecPaper = input} type="checkbox" /></td>

                </tr>

                <tr>
                  <td> &nbsp; </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td>Näytä varatut</td>
                  <td><input id="sRes" ref={input => this.state._showRes = input} type="checkbox" /></td>
                </tr>
              </tbody>
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
