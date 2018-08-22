import axios from 'axios';
import { BASE_URL } from './../settings';

export { reserveItem, cancelReservation, changeReservationStatus };

function reserveItem(junkId) { // id of item to be changed
  return axios.post(BASE_URL + '/itemReserve', {
    junkId
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // return the error to the component, so that a proper error message can be displayed
      return error;
    });
}

// cancel reservation by id
function cancelReservation(junkId) {
  return axios.post(BASE_URL + '/itemReserveCancel', {
    junkId
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}

// changes reserved item status
function changeReservationStatus(status, fetcher, junkId) {
  return axios.post(BASE_URL + '/itemStatus', {
    status, fetcher, junkId
  })
    .then(response => response.data)
    .catch(function (error) {
      return error;
    });
}