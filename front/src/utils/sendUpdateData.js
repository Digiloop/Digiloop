import axios from 'axios';
import { BASE_URL } from './../settings';

export { sendUpdateData };

/* function sendUpdateData(updateUserData) {
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
} */

function sendUpdateData(updateUserData) {
  return axios.post(BASE_URL + '/updateUser', {
    fname: updateUserData.fname,
    lname: updateUserData.lname,
    phone: updateUserData.phone,
    address: updateUserData.address,
    zipcode: updateUserData.zipcode,
    city: updateUserData.city
  })
  .then(response => response.data)
  .catch(function (error) {
    return error;
  });
}