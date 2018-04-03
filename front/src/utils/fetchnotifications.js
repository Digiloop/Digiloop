import axios from 'axios';
import { BASE_URL } from '../settings';


export {getNotifications};

function getNotifications() {
  return axios.get(BASE_URL+'/announcements').then(response => response.data);
}
