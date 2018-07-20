import axios from 'axios';
import { BASE_URL } from '../settings';


export { getJunkData, updateJunkData, getJunkOwnerData };

function getJunkData() {
  return axios.get(BASE_URL + '/items').then(response => response.data);
}

function updateJunkData(listLength) {
  return axios.post(BASE_URL + '/itemRefresh', {
    listLength
  })
    .then(response => response.data)
    .catch(function (error) {
      // return the error to the component, so that a proper error message can be displayed
      return error;
    });
}


function getJunkOwnerData(id) {
  return axios.get(BASE_URL + '/fetcher/' + id)
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
} 
