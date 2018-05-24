import axios from 'axios';
import { BASE_URL } from './../settings';

export { getCredentials, logOut };


function getCredentials(email, password) {

  //https.globalAgent.options.rejectUnauthorized = false;
/*
  var agent = new https.Agent({ 
    rejectUnauthorized: false
  });
  */
  //axios.get(url, { agent: agent });


  return axios.post(BASE_URL + '/login', {
    email, password
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