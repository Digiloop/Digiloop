import axios from 'axios';
import { BASE_URL } from './../settings';

export { updateUserData };


function updateUserData(updateUserData) {
  return axios.put(BASE_URL + '/users', {
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