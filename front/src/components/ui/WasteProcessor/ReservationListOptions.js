import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//let _ser, _batteries, _showRes

class ReservationListOptions extends Component {
constructor(props){
  super(props);
  this.state={
    _ser: false,
    _batteries: false,
    _showRes: false,
    _minWeight: 0
  }
 }



 submit = e => {
   e.preventDefault()
   this.props.onNewOptions({
     ser: this.state._ser.checked,
     batteries: this.state._batteries.checked,
     showRes: this.state._showRes.checked,
     minwWeight: this.state._minWeight.value
   })
}

render() {


    // TODO create styling for options
    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit} className="ResListOptForm">

          SER <input id="ser" ref={input => this.state._ser = input} type="checkbox" /><br/>
          Akut <input id="akut" ref={input => this.state._batteries = input} type="checkbox" /><br/>
          <br />
          Paino: <input id="weight" ref={input => this.state._weight = input} type="textbox" /> kg
          <br/>

          <br />
          Näytä varatut <input id="sRes" ref={input => this.state._showRes = input} type="checkbox" /><br/>
          <br />
          <input type="submit"></input>
        </form>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListOptions;
