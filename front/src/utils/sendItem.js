import axios from 'axios';
import { BASE_URL } from './../settings';

export { sendItemData };

/*
function sendItemData(itemData) {
  return axios.post(BASE_URL + '/itemAdd', { itemData })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}
*/

// send the data for the items
// multipart/form-data also requires a new FormData() method, which apparently sets some mysterious settings that make things work

function sendItemData(itemData) {
  let fd = new FormData();

  // need to use this due to the image requiring multipart/form-data
  for (let i = 0; i < itemData.length; i++) {
    fd.set("category" + i , itemData[i].category)
    fd.set("city" + i , itemData[i].city)
    fd.set("description" + i , itemData[i].description)
    fd.set("iscompany" + i , itemData[i].iscompany)
    fd.set("latitude" + i , itemData[i].latitude)
    fd.set("longitude" + i , itemData[i].longitude)
    fd.set("pcs" + i , itemData[i].pcs)
    fd.set("phone" + i , itemData[i].phone)
    fd.set("pickupInstructions" + i , itemData[i].pickupInstructions)
    fd.set("pickupaddr" + i , itemData[i].pickupaddr)
    fd.set("size" + i , itemData[i].size)
    fd.set("subCat" + i , itemData[i].subCat)
    fd.set("weight" + i ,itemData[i].weight)
    fd.set("zipcode" + i , itemData[i].zipcode)
    fd.set("img" + i , itemData[i].image)
  }



  return axios({
    method: 'post',
    url: BASE_URL + '/itemAdd',
    data: fd,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}
