import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'




// Entire file is pretty much a test, don't include in prod
const consoleTest = store => next => action => {

  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  //console.log('Login:', store.getState().login)

  result = next(action)
  console.groupEnd()
  return result
}

export default (initialState={}) => {
  return applyMiddleware(consoleTest)(createStore)(appReducer, initialState)
}
