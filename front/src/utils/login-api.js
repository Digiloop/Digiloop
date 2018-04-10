import axios from 'axios';
import { BASE_URL } from './../settings';

//const BASE_URL = 'http://193.166.72.18';

export { getCredentials, logOut };

function getCredentials(username, password) {
  return axios.post(BASE_URL + '/login', {
    username, password
  })
    .then(response => response.data)
    .catch(function (error) {
      // return the error to the component, so that a proper error message can be displayed
      return error;
    });
}

function logOut() {
  const url = BASE_URL + '/logout';
  return axios.get(url).then(response => response.data);
}



  /* return fetch(BASE_URL + '/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },         
    body: JSON.stringify({
      username, password
    }),
    // credentials: 'include'
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    }); */