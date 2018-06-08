import axios from 'axios';
import { BASE_URL } from './../settings';

export { sendItemData, sendItemImageData };


function sendItemData(itemData) {
  return axios.post(BASE_URL + '/itemAdd', { itemData })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}

// send the images for the items
// requires a seperate axios request, since the content type is differemt
// multipart/form-data also requires a new FormData() method, which apparently sets some mysterious settings that
// make things work

function sendItemImageData(image) {
  let fd = new FormData();

  console.log(image.length)
  console.log(image)

  for(let i = 0; i < image.length; i++){
    let slot = "img" + i;
    fd.set(slot, image[i]);
  }
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
