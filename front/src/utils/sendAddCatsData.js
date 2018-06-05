import axios from 'axios';
import { BASE_URL } from './../settings';

export { addNewCat, addNewSubCat, addNewFakeCat, sendStatus };

function addNewCat(addCatName) {
  return fetch(BASE_URL + '/catADD', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: addCatName
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addNewSubCat(addSubCatName) {
  return fetch(BASE_URL + '/subcatADD', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: addSubCatName
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addNewFakeCat(addFakeCatName) {
  return fetch(BASE_URL + '/feikkiCatAdd', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: addFakeCatName
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendStatus(statusData) {
  return axios.post(BASE_URL + '/catStatus', {
    catType: statusData.catType,
    id: statusData.id,
    Status: statusData.Status
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}