import C from './constants'
import fetch from 'isomorphic-fetch'

export const login = ( username='Seppo Dangerous', password='DangerIsMyMiddleName12' ) =>
  ({
    type: C.LOG_IN,
    payload: {username, password}
  })

export const setResOpt = (ser=false, batteries=false, showRes=false, weight=0) => 
  ({
    type: C.SET_RESOPT,
    payload: {ser, batteries, showRes, weight}
  })

  

export const setResList = (resList) =>
  ({
      type: C.SET_RLI,
      payload: resList
  })




