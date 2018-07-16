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

function changePassword(passwordChange) {
    return axios.post(BASE_URL + '/changePassword', {
        oldpassword: passwordChange.oldPassword,
        password: passwordChange.newPassword
    })
        .then(function(response) {
            return response.status;
        })
        .catch(function (error) {
            return error;
        });
}


