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
  let fd = new FormData();

  console.log(image.length)
  console.log(image)
  fd.set("image", image);
  console.log(fd)
  //fd.set("teponSoutuvene", image[1]);

  return axios({
    method: 'post',
    url: BASE_URL + '/imageAdd',
    data: fd,
    config: {headers: { 'Content-Type': 'multipart/form-data' }}
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}
