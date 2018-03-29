import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://193.166.72.18';

export {getNotifications};

function getNotifications() {
  const url = 'http://193.166.72.18/announcements';
  return axios.get(url).then(response => response.data);
}
