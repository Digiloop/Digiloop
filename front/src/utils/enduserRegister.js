import axios from 'axios';
import { BASE_URL } from './../settings';

export { enduserRegister };

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
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      return error;
    });
}