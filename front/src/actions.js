import C from './constants'

export const login = ( loginInfo ) =>
  ({
    type: C.LOG_IN,
    payload: loginInfo
  })
