import axios from 'axios';

const BASE_URL = 'http://193.166.72.18';

export { sendRegData };

function sendRegData(regData) {
    return fetch(BASE_URL + '/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        regData
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