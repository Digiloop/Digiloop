import axios from 'axios';
import { BASE_URL } from '../settings';



export {getCats, getSubCats};

// fetching cats and creating new fetches in .then() causes chrome to crash.
// might be some solution in axios.all?

function getCats() {
  return axios.get(BASE_URL+'/categories').then(response => response.data);
}

function getSubCats() {
  return axios.get(BASE_URL+'/subcat')
  .then(response => response.data)
  .catch(function (error) {
    return error;
  });
}

/*
function getAllCats() {
  axios.all([
    axios.get('http://193.166.72.18/categories'),
    axios.get('http://193.166.72.18/subcat')
  ])
  .then(axios.spread((cats, subCats) => {
    const data = [cats, subCats];
    return data;
  }));
}
*/