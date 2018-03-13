import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://193.166.72.18';

export {getJunkCatData, getSubCatData};

function getJunkCatData() {
  const url = 'http://193.166.72.18/categories';
  return axios.get(url).then(response => response.data);
}

function getSubCatData() {
  const url = 'http://193.166.72.18/subcat';
  return axios.get(url).then(response => response.data);
}
