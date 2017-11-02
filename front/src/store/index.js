import C from '../constants'
import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'


// Entire file is pretty much a test, don't include in prod
const consoleTest = store => next => action => {

  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  console.log('Logged in', store.getState().loggedIn)
  result = next(action)
  console.log("test");
  console.groupEnd()
  return result
}

export default (initialState={}) => {
  return applyMiddleware(consoleTest)(createStore)(appReducer, initialState)
}
