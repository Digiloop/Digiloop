import C from '../constants'
import { combineReducers } from 'redux'


export const loggedIn = (state=[], action) =>
  (action.type === C.LOG_IN) ? action.payload : state

export const resListOpt = (state=[], action) =>
  (action.type === C.SET_RESOPT) ? action.payload : state


export const resList = (state=[], action) =>
  (action.type === C.SET_RLI) ? action.payload : state

/*

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    reListItems: []
  },
  action
) {
  switch (action.type) {

    case "FETCH_ITEMS_REQUEST":
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case "RECEIVE_ITEMS":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        resListItems: action.items
      })
    default:
      return state
  }
}

function items(state = {}, action) {
  switch (action.type) {
    case "RECEIVE_ITEMS":
    case "FETCH_ITEMS_REQUEST":
      return Object.assign({}, state, {
        resList: posts(state, action)
      })
    default:
      return state
  }
}

*/


export default combineReducers({
  loggedIn,
  resListOpt,
  //items,
  resList
})
