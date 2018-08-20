import axios from 'axios'
import { BASE_URL } from './../settings'

export { getFeedback, addFeedback };

function getFeedback() {
    return axios.get(BASE_URL + '/getFeedback')
        .then(response => response.data)
        .catch(function (error) {
            return error;
        });
}

function addFeedback(title, text) {
    return axios.post(BASE_URL + '/sendFeedback', {
        title: title,
        text: text
    })
        .then(response => response.data)
        .catch(function (error) {
            return error;
        });
}