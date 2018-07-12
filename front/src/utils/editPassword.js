import axios from 'axios';
import { BASE_URL } from './../settings';

export { resetPassword, changePassword };

function resetPassword(maili) {
    return axios.post(BASE_URL + '/recoverPassword', {
        email: maili
    })
        .then(response => response.data)
        .catch(function (error) {
            return error;
        });
}

function changePassword(oldPassword, newPassword) {
    return axios.post(BASE_URL + '/', {
        oldPassword, newPassword
    })
        .then(response => response.data)
        .catch(function (error) {
            return error;
        });
}


