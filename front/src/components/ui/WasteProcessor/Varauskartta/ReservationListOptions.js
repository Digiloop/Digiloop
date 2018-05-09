import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../../../../ArtunCSSsaadot.css';

import Checkbox from 'material-ui/Checkbox';

//let _ser, _batteries, _showRes

class ReservationListOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*
      // categories
      ser: this.props.rLOpt.categories.ser,
      batteries: this.props.rLOpt.categories.batteries,
      infoSecurity: this.props.rLOpt.categories.infoSecurity,
      */

      // subcategories
      serSmallSer: true,
      serBigSer: true,
      serDataSer: true,
      serLampSer: true,

      battNickelKadium: true,
      battNickelMetal: true,
      battOther: true,

      infosecDataSer: true,
      infosecPaper: true,

      // show reserved
      showRes: true,

      // properties
      minWeight: 0,
      maxWeight: 0,
      minSize: 0,
      maxSize: 0,
      distance: 0
    }
  }

  componentDidMount() {
    // create states for categories
    for (let i = 0; i < this.props.categories.length; i++) {

      // create a state for each category, essentially setState({ <catName>: rLOpt.<catName> })
      this.setState({ [this.props.categories[i].CatName]: this.props.rLOpt.categories[this.props.categories[i].CatName] })
    }
  }



  submit = e => {
    e.preventDefault()

    let cats = {};
    let subCats = {};

    for (let i = 0; i < this.props.categories.length; i++){
      cats[this.props.categories[i].CatName] = this.state[this.props.categories[i].CatName];
    }
    console.log(cats);


    this.props.onNewOptions({
      // categories
      categories: cats,

      // subcats
      subCategories: {
        serSmallSer: this.state.serSmallSer,
        serBigSer: this.state.serBigSer,
        serDataSer: this.state.serDataSer,
        serLampSer: this.state.serLampSer,

        battNickelKadium: this.state.battNickelKadium,
        battNickelMetal: this.state.battNickelMetal,
        battOther: this.state.battOther,

        infosecDataSer: this.state.infosecDataSer,
        infosecPapaer: this.state.infosecPaper
      },


      // show reserved
      showRes: this.state.showRes,

      // properties
      minWeight: this.state.minWeight,
      maxWeight: this.state.maxWeight,
      minSize: this.state.minSize,
      maxSize: this.state.maxSize,
      distance: this.state.distance
    });
  }

  render() {

    let catBoxes = [];
    let subCatBoxes = [];

    for (let i = 0; i < this.props.categories.length; i++) {
      catBoxes.push(

        <tr key={"kattirivi"+i}>
          <td className="type">{this.props.categories[i].CatName}</td>

          <td>
            <Checkbox
              checked={this.state[this.props.categories[i].CatName]}
              onCheck={(event, newValue) => this.setState({ [this.props.categories[i].CatName]: newValue })}
            /></td>
        </tr>
      )
    }



    // TODO create styling for options
    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit} className="ResListOptForm">

          <div id="ResListOptionsPohjadiv">
            <div id="ResListOptionsColorDiv">

              <input type="submit" id="submitButt"></input>

              <table id="varatut">
                <tbody>
                  <tr>
                    <td>Näytä varatut</td>
                    <td><Checkbox
                      checked={this.state.showRes}
                      onCheck={(event, newValue) => this.setState({ showRes: newValue })}
                    /></td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td>Paino (kg)</td>
                    <td id="weightField"><input id="weight" onChange={(event, newValue) => this.setState({ minWeight: newValue })} type="textbox" maxLength="6" />
                      -
                    <input id="weight" onChange={(event, newValue) => this.setState({ maxWeight: newValue })} type="textbox" maxLength="6" /></td>
                  </tr>
                  <tr>
                    <td>Koko (m<sup>3</sup>)</td>
                    <td id="sizeField"><input id="size" onChange={(event, newValue) => this.setState({ minSize: newValue })} />
                      -
                    <input id="size" onChange={(event, newValue) => this.setState({ maxSize: newValue })} type="textbox" maxLength="6" /></td>
                  </tr>
                  <tr>
                    <td>Etäisyys (km)</td>
                    <td id="distanceField"><input id="distance" onChange={(event, newValue) => this.setState({ distance: newValue })} type="textbox" maxLength="6" /></td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>



              <table id="katit">

                <tbody id="kattibody">
                  <tr><td><h1 id="katetext">Kategoriat</h1></td></tr>
                  {catBoxes}
                </tbody>
              </table>

              <table id="alakatit">
                <tbody id="alakattibody">

                  <tr><td><h1 id="alakatetext">Alakategoriat</h1></td></tr>


                  <tr><td>Sähkölaitteet</td></tr>
                  <tr>
                    <td className="type">Pieni SER</td>
                    <td><Checkbox
                      checked={this.state.serSmallSer}
                      onCheck={(event, newValue) => this.setState({ serSmallSer: newValue })}
                    /></td>
                  </tr>
                  <tr>
                    <td className="type">Iso SER</td>
                    <td><Checkbox
                      checked={this.state.serBigSer}
                      onCheck={(event, newValue) => this.setState({ serBigSer: newValue })}
                    /></td>
                  </tr>
                  <tr>
                    <td className="type">Data SER</td>
                    <td><Checkbox
                      checked={this.state.serDataSer}
                      onCheck={(event, newValue) => this.setState({ serDataSer: newValue })}
                    /></td>
                  </tr>
                  <tr>
                    <td className="type">Lamppu SER</td>
                    <td><Checkbox
                      checked={this.state.serLampSer}
                      onCheck={(event, newValue) => this.setState({ serLampSer: newValue })}
                    /></td>
                  </tr>

                  <tr><td>&nbsp;</td></tr>
                  <tr><td>Akut</td></tr>
                  <tr>
                    <td className="type">Nikkelikadium</td>
                    <td><Checkbox
                      checked={this.state.battNickelKadium}
                      onCheck={(event, newValue) => this.setState({ battNickelKadium: newValue })}
                    /></td>
                  </tr>
                  <tr>
                    <td className="type">Nikkelimetallihybridi</td>
                    <td><Checkbox
                      checked={this.state.battNickelMetal}
                      onCheck={(event, newValue) => this.setState({ battNickelMetal: newValue })}
                    /></td>
                  </tr>
                  <tr>
                    <td className="type">Muut</td>
                    <td><Checkbox
                      checked={this.state.battOther}
                      onCheck={(event, newValue) => this.setState({ battOther: newValue })}
                    /></td>
                  </tr>

                  <tr><td>&nbsp;</td></tr>
                  <tr><td>Tietoturva</td></tr>
                  <tr>
                    <td className="type">Data SER</td>
                    <td><Checkbox
                      checked={this.state.infosecDataSer}
                      onCheck={(event, newValue) => this.setState({ infosecDataSer: newValue })}
                    /></td>
                  </tr>
                  <tr>
                    <td className="type">Paperi</td>
                    <td><Checkbox
                      checked={this.state.infosecPaper}
                      onCheck={(event, newValue) => this.setState({ infosecPaper: newValue })}
                    /></td>

                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </form>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListOptions;
