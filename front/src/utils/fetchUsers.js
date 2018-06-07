import axios from 'axios';
import { BASE_URL } from '../settings';

export {getUsers};

function getUsers() {
    return axios.get(BASE_URL + '/users')
    .then(response => response.data)
    .catch(function (error) {
        return error;
    });
}