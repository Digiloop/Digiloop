import axios from 'axios';
import { BASE_URL } from './../settings';

export { reserveItem };

function reserveItem(status, fetcher, subIdStatus) { // target status, id of who fetched, id of item to be changed
  return axios.post(BASE_URL + '/itemReserve', {
    status, fetcher, subIdStatus
  })
    .then(response => response.data)
    .catch(function (error) {
      // return the error to the component, so that a proper error message can be displayed
      return error;
    });
}