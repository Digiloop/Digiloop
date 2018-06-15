import axios from 'axios';
import { BASE_URL } from './../settings';


export { wasteprocessorRegister };


function wasteprocessorRegister(regData) {
  

  return fetch(BASE_URL + '/signupCompany', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: regData
  })
    //.then((response) => response.json())
    .then((response) => {
      
      // return responseJson;
    })
    .catch((error) => {
      
    });
}
