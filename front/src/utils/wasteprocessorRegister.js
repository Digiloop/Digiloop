import axios from 'axios';
import { BASE_URL } from './../settings';


export { wasteprocessorRegister, companyUser };


function wasteprocessorRegister(regData) {


  return fetch(BASE_URL + '/signupCompany', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: regData
  })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

function companyUser(compUser) {
  return axios.post(BASE_URL + '/signupCompanyUser', {
    fname: compUser.fname,
    lname: compUser.lname,
    email: compUser.email,
    phone: compUser.phone,
    password: compUser.password,
    address: compUser.address,
    zipcode: compUser.zipcode,
    city: compUser.city
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
