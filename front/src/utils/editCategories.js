import axios from 'axios';
import { BASE_URL } from './../settings';

export { addNewCat, addNewSubCat, addNewFakeCat, sendStatus, sendNewCatName, sendImage };

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

function sendNewCatName(renameData) {
  return axios.post(BASE_URL + '/catUpdate', {
    catType: renameData.catType,
    id: renameData.id,
    name: renameData.name
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}

function sendImage(image, catType, id) {
  let fd = new FormData();

  console.log(image.length)
  console.log(image)

  fd.set('pic', image);
  fd.set('catType', catType)
  fd.set('id', id);

  return axios({
    method: 'post',
    url: BASE_URL + '/imageCatAdd',
    data: fd,
    config: {headers: { 'Content-Type': 'multipart/form-data' }}
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}