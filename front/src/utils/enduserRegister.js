import axios from 'axios';
import { BASE_URL } from './../settings';

//const BASE_URL = 'http://193.166.72.18';

export { enduserRegister };

/* function enduserRegister(regData) {
  return axios.post(BASE_URL + '/signup', {
    regData    
  })
    .then(response => response.data)
    .catch(function (error) {
      console.log(regData);
    });
} */

function enduserRegister(regData) {
  return fetch(BASE_URL + '/signup',{
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
    })
    .catch((error) => {
      console.log(error);
    });
}