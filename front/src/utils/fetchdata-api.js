import axios from 'axios';
import { BASE_URL } from '../settings';


export {getJunkData};

function getJunkData() {
  return axios.get(BASE_URL+'/items2').then(response => response.data);
}
