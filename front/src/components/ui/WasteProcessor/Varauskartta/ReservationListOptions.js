import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../../../../ArtunCSSsaadot.css';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import ActionInfo from 'material-ui/svg-icons/action/info';
import Tooltip from '@material-ui/core/Tooltip';


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
      distance: 0,

      // location data
      userLocation: {
        latitude: null,
        longitude: null,
        locationButtonDisable: true
      },

      geolocationStatus: 0 // 0 not allowed, 1 active, 2 browser doesn't support
    }
    this.activateLocation = this.activateLocation.bind(this);
    this.geoLocationSuccess = this.geoLocationSuccess.bind(this);
    this.geoLocationError = this.geoLocationError.bind(this);
  }


  componentDidMount() {

    // get the existing states from store
    // It will either be the initialstate, or a state set by the user
    this.setState({
      showRes: this.props.rLOpt.showRes,

      minWeight: this.props.rLOpt.minWeight,
      maxWeight: this.props.rLOpt.maxWeight,
      minSize: this.props.rLOpt.minSize,
      maxSize: this.props.rLOpt.maxSize,
      distance: this.props.rLOpt.distance,

      userLocation: {
        locationButtonDisable: this.props.rLOpt.userLocation.locationButtonDisable
      }
    })


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

    // same for subcategories
    for (let i = 0; i < this.props.categories.length; i++) {
      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId === this.props.categories[i].CatId) {

          // subcat name is created from main cat name + subcat name
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

    this.activateLocation();
    //<RaisedButton onClick={this.activateLocation} disabled={!this.state.userLocation.locationButtonDisable} id="location" value="Käytä etäisyyttä" label="Käytä etäisyyttä" />

  }

  // geoLocation success function
  geoLocationSuccess(position) {
    this.setState({
      userLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        locationButtonDisable: false
      },
      geolocationStatus: 1
    })
  }

  // geoLocation error function
  geoLocationError() {
    //window.alert("Sijainti pitää olla käytössä, jos haluat rajata etäisyyden mukaan.");
    this.setState({
      geolocationStatus: 0
    })
  }

  activateLocation() {

    if (!navigator.geolocation) {
      //window.alert("Selaimesi ei tue sijaintia.");
      this.setState({
        geolocationStatus: 2
      })
      return;
    }


    navigator.geolocation.getCurrentPosition(this.geoLocationSuccess, this.geoLocationError);

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

    // subcat package
    for (let i = 0; i < this.props.categories.length; i++) {
      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId === this.props.categories[i].CatId) {

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
      distance: this.state.distance,

      // user's own location and is it in use
      userLocation: this.state.userLocation,
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
    catBoxes.push(<tr key={"spagettinenCheckBoxKorjausTableRownKorjausRowJokaVaatiJonkuHelvetinKeynJottaToimii"}><td><br /></td></tr>);

    // pre-build subcategory checkboxes
    for (let i = 0; i < this.props.categories.length; i++) {


      if (this.state[this.props.categories[i].CatName]) {
        // create the category-väliotsikot
        subCatBoxes.push(<tr key={"subKattiOtsikko" + i}><td>{this.props.categories[i].CatName}</td></tr>);

        for (let j = 0; j < this.props.subCategories.length; j++) {
          if (this.props.subCategories[j].CatId === this.props.categories[i].CatId) {

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

    }

    const textFieldStyles = {
      borderRadius: "3px",
      top: "1px",
      marginLeft: "3px",
      width: "100px",
      color: "white"
    }
    const inputStyle = {
      color: "white"
    }
    const inputStyleDisabled = {
      color: "grey"
    }


    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit} className="ResListOptForm">

          <div id="ResListOptionsPohjadiv" style={{ width: "fit-content" }}>
            <div id="ResListOptionsColorDiv" style={{ width: "fit-content" }}>

              <input type="submit" id="submitButt" value="Tallenna" style={{ float: 'left', position: 'initial' }}></input>

              <table id="varatut" style={{ position: 'initial', margin: '50px 0 30px 0' }}>
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
                    <td id="weightField">
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="weightMin" className="weightOption" onChange={(event, newValue) => this.setState({ minWeight: event.target.value })} type="number" min="0" max="1000000" value={this.state.minWeight} />
                      -
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="weightMax" className="weightOption" onChange={(event, newValue) => this.setState({ maxWeight: event.target.value })} type="number" min="0" max="1000000" value={this.state.maxWeight} />
                    </td>
                  </tr>
                  <tr>
                    <td>Koko (m<sup>3</sup>)</td>
                    <td id="sizeField">
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="sizeMin" className="sizeOption" onChange={(event, newValue) => this.setState({ minSize: event.target.value })} type="number" min="0" max="1000000" value={this.state.minSize} />
                      -
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="sizeMax" className="sizeOption" onChange={(event, newValue) => this.setState({ maxSize: event.target.value })} type="number" min="0" max="1000000" value={this.state.maxSize} />
                    </td>
                  </tr>
                  <tr>
                    <td style={this.state.userLocation.locationButtonDisable ? inputStyleDisabled : inputStyle}>Etäisyys (km)</td>
                    <td id="distanceField">
                      <TextField
                        inputStyle={this.state.userLocation.locationButtonDisable ? inputStyleDisabled : inputStyle}
                        style={textFieldStyles}
                        id="distance"
                        onChange={(event, newValue) => this.setState({ distance: event.target.value })}
                        type="number"
                        value={this.state.distance}
                        disabled={this.state.userLocation.locationButtonDisable}
                      />

                      {this.state.geolocationStatus !== 1 ?
                        <Tooltip
                          id="tooltip-right"
                          title={this.state.geolocationStatus === 0 ?
                            "Sivu tarvitsee luvan sijainnin käyttöön, jotta voit rajata etäisyyden mukaan."
                            : "Selaimesi ei tue sijainnin käyttöä"}
                          placement="right" >
                          <ActionInfo id="locationDisabledInfo" color={'#ccc'} />
                        </Tooltip>
                        : null
                      }
                    </td>

                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>


              <table>
                <tbody>
                  <tr>
                    <td id="varausKattiId">
                      <table id="katit" style={{ position: "unset" }}>
                        <tbody id="kattibody">
                          <tr><td><h1 id="katetext">Kategoriat</h1></td></tr>
                          {catBoxes}
                        </tbody>
                      </table>
                    </td>
                    <td id="varausAlakattiId">
                      <table id="alakatit" style={{ padding: 0 }}>
                        <tbody id="alakattibody">
                          <tr><td><h1 id="alakatetext">Alakategoriat</h1></td></tr>
                          {subCatBoxes}
                        </tbody>
                      </table>
                    </td>
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

/* class ReservationListOptions extends Component {
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
      distance: 0,

      // location data
      userLocation: {
        latitude: null,
        longitude: null,
        locationButtonDisable: true
      }
    }
    this.activateLocation = this.activateLocation.bind(this);
    this.geoLocationSuccess = this.geoLocationSuccess.bind(this);
    this.geoLocationError = this.geoLocationError.bind(this);
  }


  componentDidMount() {

    // get the existing states from store
    // It will either be the initialstate, or a state set by the user
    this.setState({
      minWeight: this.props.rLOpt.minWeight,
      maxWeight: this.props.rLOpt.maxWeight,
      minSize: this.props.rLOpt.minSize,
      maxSize: this.props.rLOpt.maxSize,
      distance: this.props.rLOpt.distance,

      userLocation: {
        locationButtonDisable: this.props.rLOpt.userLocation.locationButtonDisable
      } 
    })


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

    // same for subcategories
    for (let i = 0; i < this.props.categories.length; i++) {
      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId === this.props.categories[i].CatId) {

          // subcat name is created from main cat name + subcat name
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

  // geoLocation success function
  geoLocationSuccess(position) {
    this.setState({
      userLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        locationButtonDisable: false
      }
    })
  }

  // geoLocation error function
  geoLocationError() {
    window.alert("Sijainti pitää olla käytössä, jos haluat filtteröidä etäisyyden mukaan.");
  }

  activateLocation() {

    if (!navigator.geolocation) {
      window.alert("Selaimesi ei tue sijaintia.");
      return;
    }


    navigator.geolocation.getCurrentPosition(this.geoLocationSuccess, this.geoLocationError);

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

    // subcat package
    for (let i = 0; i < this.props.categories.length; i++) {
      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId === this.props.categories[i].CatId) {

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
      distance: this.state.distance,

      // user's own location and is it in use
      userLocation: this.state.userLocation
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
    catBoxes.push(<tr key={"spagettinenCheckBoxKorjausTableRownKorjausRowJokaVaatiJonkuHelvetinKeynJottaToimii"}><td><br /></td></tr>);

    // pre-build subcategory checkboxes
    for (let i = 0; i < this.props.categories.length; i++) {

      // create the category-väliotsikot
      subCatBoxes.push(<tr key={"subKattiOtsikko" + i}><td>{this.props.categories[i].CatName}</td></tr>);

      for (let j = 0; j < this.props.subCategories.length; j++) {
        if (this.props.subCategories[j].CatId === this.props.categories[i].CatId) {

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

    const textFieldStyles = {
      borderRadius: "3px",
      top: "1px",
      marginLeft: "3px",
      width: "100px",
      color: "white"
    }
    const inputStyle = {
      color: "white"
    }


    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit} className="ResListOptForm">

          <div id="ResListOptionsPohjadiv">
            <div id="ResListOptionsColorDiv">

              <input type="submit" id="submitButt" value="Tallenna"></input>

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
                    <td id="weightField">
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="weightMin" className="weightOption" onChange={(event, newValue) => this.setState({ minWeight: event.target.value })} type="number" min="0" max="1000000" value={this.state.minWeight} />
                      -
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="weightMax" className="weightOption" onChange={(event, newValue) => this.setState({ maxWeight: event.target.value })} type="number" min="0" max="1000000" value={this.state.maxWeight} />
                    </td>
                  </tr>
                  <tr>
                    <td>Koko (m<sup>3</sup>)</td>
                    <td id="sizeField">
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="sizeMin" className="sizeOption" onChange={(event, newValue) => this.setState({ minSize: event.target.value })} type="number" min="0" max="1000000" value={this.state.minSize} />
                      -
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="sizeMax" className="sizeOption" onChange={(event, newValue) => this.setState({ maxSize: event.target.value })} type="number" min="0" max="1000000" value={this.state.maxSize} />
                    </td>
                  </tr>
                  <tr>
                    <td>Etäisyys (km)</td>
                    <td id="distanceField">
                      <TextField inputStyle={inputStyle} style={textFieldStyles} id="distance" onChange={(event, newValue) => this.setState({ distance: event.target.value })} type="number" value={this.state.distance}
                        disabled={this.state.userLocation.locationButtonDisable} />
                    </td>
                  </tr>
                  <tr>
                    <td><RaisedButton onClick={this.activateLocation} disabled={!this.state.userLocation.locationButtonDisable} id="location" value="Käytä etäisyyttä" label="Käytä etäisyyttä" /></td>
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
export default ReservationListOptions; */
