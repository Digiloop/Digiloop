import axios from 'axios';
import { BASE_URL } from './../settings';

//const BASE_URL = 'http://193.166.72.18';

export { sendRegData };

/* function sendRegData(regData) {
  return axios.post(BASE_URL + '/signup', {
    regData    
  })
    .then(response => response.data)
    .catch(function (error) {
      console.log(regData);
    });
} */

const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})

function sendRegData(regData) {
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
      // return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}