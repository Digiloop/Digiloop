import axios from 'axios';
import { BASE_URL } from './../settings';

export { sendUpdateData };

function sendUpdateData(updateUserData) {
  return fetch(BASE_URL + '/updateUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: updateUserData
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}