import C from './constants'
import fetch from 'isomorphic-fetch'

export const login = ( username='Seppo Dangerous', password='DangerIsMyMiddleName12' ) =>
  ({
    type: C.LOG_IN,
    payload: {username, password}
  })

export const setResOpt = (ser=false, batteries=false, showRes=false, weight=0) => {
  ({
    type: C.SET_RESOPT,
    payload: {ser, batteries, showRes, weight}
  })

  }
  

export const setResList = (resList) =>
  ({
      type: C.SET_RLI,
      payload: {resList}
  })

export const fetchResList = value => dispatch => {

  dispatch({
    type: C.FETCH_RESERVATION_LIST_ITEMS
  })
  

//TODO create fetching from backend, insert into store
// return fetch('193.166.72.18/items')
  fetch('193.166.72.18/items')
    //.then( response => response.json())
    .then(resList => {
      console.log("Reslist heti fetchin jälkeen: " + resList)
      dispatch({
        type: C.SET_RLI,
        payload: resList
      })
    })
    .catch(error => {
      console.log("errored")
      dispatch({
        type: C.CANCEL_RESLIST_FETCH
      })
    })
}
