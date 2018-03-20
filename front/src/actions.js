import C from './constants'
import fetch from 'isomorphic-fetch'

export const login = ( loginInfo ) =>
  ({
    type: C.LOG_IN,
    payload: {loginInfo}
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
