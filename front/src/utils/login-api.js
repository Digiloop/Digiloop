import axios from 'axios';

const BASE_URL = 'http://193.166.72.18';

export { getCredentials, logOut };

function getCredentials(username, password) {
    return fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logOut() {
    const url = BASE_URL + '/logout';
    return axios.get(url).then(response => response.data);
  }