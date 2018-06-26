import axios from 'axios';
import { BASE_URL } from '../settings';


export {getNotifications, addNotification};

function getNotifications() {
  return axios.get(BASE_URL+'/announcements').then(response => response.data);
}

function addNotification(notificationData) {
  return axios.post(BASE_URL + '/announcementAdd', {
    title: notificationData.title,
    info: notificationData.info,
    dateBegin: notificationData.dateBegin,
    dateEnd: notificationData.dateEnd
  })
  .then(response => response.data)
  .catch(function (error) {
    return error;
  });
}
