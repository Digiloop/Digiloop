import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ReservationListOptions extends Component {
constructor(props){
  super(props);
  this.state={
  }
 }

 submit = e => {
   e.preventDefault()

}

render() {


    return (
      <MuiThemeProvider>
        <form onSubmit={this.submit}>

          SER <input type="checkbox" /><br/>
          Akut <input type="checkbox" /><br/>
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
