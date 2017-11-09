import C from '../constants'
import { combineReducers } from 'redux'


export const loggedIn = (state=false, action) =>
  (action.type === C.LOG_IN) ? true : state



export default combineReducers({
  loggedIn
})
