import axios from 'axios';
import { BASE_URL } from './../settings';

export { sendItemData, sendItemImageData };

/* function sendItemData(itemData) {
  return fetch(BASE_URL + '/itemAdd', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: itemData
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
} */

function sendItemData(itemData) {
  return axios.post(BASE_URL + '/itemAdd', { itemData })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}

function sendItemImageData(image) {
  console.log(axios.defaults.headers)
  return axios.post(
    BASE_URL + '/imageAdd',
    image,
    {headers: { 'Content-Type': 'image' }}
  )
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}
