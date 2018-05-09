import C from './constants'

export const login = (loginInfo) =>
  ({
    type: C.LOG_IN,
    payload: loginInfo
  })

export const setResOpt = (options) =>
  ({
    type: C.SET_RESOPT,
    payload: options
  })

export const setCategories = (cats) =>
  ({
    type: C.SET_CATEGORIES,
    payload: cats
  })

export const setSubCategories = (subCats) =>
  ({
    type: C.SET_SUB_CATEGORIES,
    payload: subCats
  })

export const setResList = (resList) =>
  ({
    type: C.SET_RLI,
    payload: resList
  })

export const setNotifications = (notifications) =>
  ({
    type: C.SET_NOTIF,
    payload: notifications
  })

  export const setCurrentPage = (pageName) =>
  ({
    type: C.SET_CURRENTPAGENAME,
    payload: pageName
  })
