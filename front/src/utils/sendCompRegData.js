import axios from 'axios';
import { BASE_URL } from './../settings';


export { sendCompRegData };


function sendCompRegData(regData) {
  
  //TODO: Laita route!!

  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: regData
  })
    //.then((response) => response.json())
    .then((response) => {
      console.log(response);
      // return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}
