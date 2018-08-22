import axios from 'axios';
import { BASE_URL } from '../settings';


export { getJunkData, getOwnJunkData, getEnduserJunks, updateJunkData, getJunkOwnerData, deleteJunk };

// get all items
function getJunkData() {
  return axios.get(BASE_URL + '/items').then(response => response.data);
}

// get reserved items
function getOwnJunkData() {
  return axios.get(BASE_URL + '/itemReservations').then(response => response.data);
}

// get only own enduser items
function getEnduserJunks() {
  return axios.get(BASE_URL + '/itemHistory').then(response => response.data)
}

// enduser item delete
function deleteJunk(id) {
  return axios.delete(BASE_URL + '/items', {
    data: {id}
  })
  .then(response => response.data)
  .catch(function (error) {
    return error;
  });
}

function updateJunkData() {
  return axios.get(BASE_URL + '/itemStamp', {
  })
    .then(response => response.data)
    .catch(function (error) {
      // return the error to the component, so that a proper error message can be displayed
      return error;
    });
}

// not in use at this moment
function getJunkOwnerData(id) {
  return axios.get(BASE_URL + '/fetcher/' + id)
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
} 
