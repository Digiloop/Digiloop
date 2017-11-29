import C from './constants'
import fetch from 'isomorphic-fetch'

export const login = ( loginInfo ) =>
  ({
    type: C.LOG_IN,
    payload: loginInfo
  })

export const setResOpt = (ser=false, batteries=false, showRes=false) =>
  ({
      type: C.SET_RESOPT,
      payload: {ser, batteries, showRes}
  })

export const setResList = (resList) =>
  ({
      type: C.SET_RLI,
      payload: {resList}
  })

export const fetchResList = value => dispatch => {
  dispatch({
    type: C.FETCH_RESERVATION_LIST_ITEMS
  })
}
