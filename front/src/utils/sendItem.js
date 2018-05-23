import axios from 'axios';
import { BASE_URL } from './../settings';

export { sendItemData };

function sendItemData(data) {
  return fetch(BASE_URL + '/itemAdd', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}