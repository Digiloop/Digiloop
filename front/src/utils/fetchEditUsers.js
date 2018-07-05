import axios from 'axios';
import { BASE_URL } from '../settings';

export {getUsers, changeStatus};

function getUsers() {
    return axios.get(BASE_URL + '/users')
    .then(response => response.data)
    .catch(function (error) {
        return error;
    });
}

function changeStatus(id) {
    return axios.post(BASE_URL + '/deleteUser', {
        id
    })
    .then(response => response.data)
    .catch(function (error) {
        return error;
    });
}