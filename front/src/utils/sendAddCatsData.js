import axios from 'axios';
import { BASE_URL } from './../settings';

export { addNewCat, addNewSubCat };

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