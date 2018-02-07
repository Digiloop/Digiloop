import C from '../constants'
import { combineReducers } from 'redux'


export const loggedIn = (state=[], action) =>
  (action.type === C.LOG_IN) ? action.payload : state

export const resListOpt = (state=[], action) =>
  (action.type === C.SET_RESOPT) ? action.payload : state


export const resList = (state=[], action) =>
  (action.type === C.SET_RLI) ? action.payload : state

export default combineReducers({
  loggedIn,
  resListOpt,
  resList
})
