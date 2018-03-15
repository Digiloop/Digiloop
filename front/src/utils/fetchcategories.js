import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://193.166.72.18';

export {getCats, getSubCats, getAllCats};

// fetching cats and creating new fetches in .then() causes chrome to crash.
// might be some solution in axios.all?

function getCats() {
  const url = 'http://193.166.72.18/categories';
  return axios.get(url).then(response => response.data);
}

function getSubCats() {
  const url = 'http://193.166.72.18/subcat';
  return axios.get(url).then(response => response.data);
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