import axios from 'axios';
import { BASE_URL } from '../settings';


// credential true
axios.defaults.withCredentials = true;

export {getCats, getSubCats, getFakeCats};

function getCats() {
  return axios.get(BASE_URL+'/categories')
  .then(response => response.data)
  .catch(function (error) {
    return error;
  });
}

function getSubCats() {
  return axios.get(BASE_URL+'/subcat')
  .then(response => response.data)
  .catch(function (error) {
    return error;
  });
}

function getFakeCats() {
  return axios.get(BASE_URL + '/feikkiCat')
  .then(response => response.data)
  .catch(function (error) {
    return error;
  })
}


