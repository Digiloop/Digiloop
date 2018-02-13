import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://193.166.72.18';

export {getJunkData};

function getJunkData() {
  const url = 'http://193.166.72.18/items';
  return axios.get(url).then(response => response.data);
}
