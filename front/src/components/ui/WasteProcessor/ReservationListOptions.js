import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let _ser, _batteries, _showRes

class ReservationListOptions extends Component {
constructor(props){
  super(props);
  this.state={
  }
 }



 submit = e => {
   e.preventDefault()
   this.onNewOptions({
     ser: false,
     batteries: false,
     showRes: _showRes.checked
   })
}

render() {



    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit} className="ResListOptForm">

          SER <input id="ser" ref={input => _ser = input} type="checkbox" /><br/>
          Akut <input id="akut" ref={input => _batteries = input} type="checkbox" /><br/>
          <br />
          Paino: <br/>

          <br />
          Näytä varatut <input type="checkbox" /><br/>
          <br />
          <input type="submit"></input>
        </form>
      </MuiThemeProvider>
    );
  }
}
export default ReservationListOptions;
