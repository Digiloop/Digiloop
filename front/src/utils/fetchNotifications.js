import axios from 'axios';
import { BASE_URL } from '../settings';


export { getNotifications, editNotification };

function getNotifications() {
  return axios.get(BASE_URL + '/announcement').then(response => response.data);
}

function editNotification(metodi, notificationData) {
  return axios({
    method: metodi,
    url: BASE_URL + '/announcement',
    data: {
      title: notificationData.title,
      info: notificationData.info,
      dateBegin: notificationData.dateBegin,
      dateEnd: notificationData.dateEnd,
      id: notificationData.id
    }
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}
