import C from '../constants'
import { combineReducers } from 'redux'


export const loggedIn = (state=[], action) => {
  //(action.type === C.LOG_IN) ? action.payload : state
  (action.type === C.LOG_IN) ? true : false
}

export default combineReducers({
  loggedIn
})
