import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../../../../ArtunCSSsaadot.css';

import Checkbox from 'material-ui/Checkbox';

//let _ser, _batteries, _showRes

class ReservationListOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {


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
      // if there is no existing data in store, set true, else set as existing data

      if (this.props.rLOpt.categories[this.props.categories[i].CatName] === undefined) {
        this.setState({ [this.props.categories[i].CatName]: true })
      } else {
        this.setState({ [this.props.categories[i].CatName]: this.props.rLOpt.categories[this.props.categories[i].CatName] })
      }
    }


    for (let i = 0; i < this.props.categories.length; i++) {
      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId == this.props.categories[i].CatId) {
          let subCatState = this.props.categories[i].CatName + this.props.subCategories[j].subName;
          subCatState = subCatState.toLowerCase();

          if (this.props.rLOpt.subCategories[subCatState] === undefined) {
            this.setState({ [subCatState]: true })
          } else {
            this.setState({ [subCatState]: this.props.rLOpt.subCategories[subCatState] })
          }


        }
      }
    }

  }


  // when options' save button is pressed
  submit = e => {
    e.preventDefault() // don't refresh page


    // create the cat/subcat packages for sending into store
    let cats = {};
    let subCats = {};

    // category package
    for (let i = 0; i < this.props.categories.length; i++) {
      cats[this.props.categories[i].CatName] = this.state[this.props.categories[i].CatName];
    }
    /*
        for (let i = 0; i < this.props.subCategories.length; i++) {
          subCats[this.props.subCategories[i].subName] = this.state[this.props.subCategories[i].subName];
        }
    */

    // subcat package
    for (let i = 0; i < this.props.categories.length; i++) {
      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId == this.props.categories[i].CatId) {

          // prepare the subcat's statename (parent catname + subname)
          let subCatState = this.props.categories[i].CatName + this.props.subCategories[j].subName;
          subCatState = subCatState.toLowerCase();
          subCats[subCatState] = this.state[subCatState];
        }
      }
    }




    // add the packages to the other settings, update to redux store
    this.props.onNewOptions({
      // categories
      categories: cats,

      // subcats
      subCategories: subCats,

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

    // pre-build category checkboxes
    for (let i = 0; i < this.props.categories.length; i++) {
      catBoxes.push(

        <tr key={"kattirivi" + i}>
          <td className="type">{this.props.categories[i].CatName}</td>
          <td>
            <Checkbox
              checked={this.state[this.props.categories[i].CatName]}
              onCheck={(event, newValue) => this.setState({ [this.props.categories[i].CatName]: newValue })}
            /></td>
        </tr>
      )
    }
    // shitty fix for checkboxes breking the div, creating scroll bars
    catBoxes.push(<tr><td><br/></td></tr>);

    // pre-build subcategory checkboxes
    for (let i = 0; i < this.props.categories.length; i++) {

      // create the category-väliotsikot
      subCatBoxes.push(<tr key={"subKattiOtsikko" + i}><td>{this.props.categories[i].CatName}</td></tr>);

      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId == this.props.categories[i].CatId) {

          // prepare the subcat's statename (parent catname + subname)
          let subCatState = this.props.categories[i].CatName + this.props.subCategories[j].subName;
          subCatState = subCatState.toLowerCase();
          subCatBoxes.push(

            <tr key={"subkattirivi" + j}>
              <td className="type">{this.props.subCategories[j].subName}</td>
              <td><Checkbox
                checked={this.state[subCatState]}
                onCheck={(event, newValue) => this.setState({ [subCatState]: newValue })}
              /></td>
            </tr>

          );

        }

      }
    }


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
                  {subCatBoxes}


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
