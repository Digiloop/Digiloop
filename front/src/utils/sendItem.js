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
    fd.set(i + "category" , itemData[i].category)
    fd.set(i + "city" , itemData[i].city)
    fd.set(i + "description" , itemData[i].description)
    fd.set(i + "iscompany" , itemData[i].iscompany)
    fd.set(i + "latitude" , itemData[i].latitude)
    fd.set(i + "longitude" , itemData[i].longitude)
    fd.set(i + "pcs" , itemData[i].pcs)
    fd.set(i + "phone" , itemData[i].phone)
    fd.set(i + "pickupInstructions" , itemData[i].pickupInstructions)
    fd.set(i + "pickupaddr" , itemData[i].pickupaddr)
    fd.set(i + "size" , itemData[i].size)
    fd.set(i + "subCat" , itemData[i].subCat)
    fd.set(i + "weight" ,itemData[i].weight)
    fd.set(i + "zipcode" , itemData[i].zipcode)
    fd.set(i + "img" , itemData[i].image)
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
