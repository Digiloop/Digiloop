import C from './constants'
import fetch from 'isomorphic-fetch'

export const login = ( username='Seppo Dangerous', password='DangerIsMyMiddleName12' ) =>
  ({
    type: C.LOG_IN,
    payload: {username, password}
  })

export const setResOpt = (options) => 
  ({
    type: C.SET_RESOPT,
    payload: options
  })

  

export const setResList = (resList) =>
  ({
      type: C.SET_RLI,
      payload: resList
  })




