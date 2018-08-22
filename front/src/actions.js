import C from './constants'

export const login = (loginInfo) =>
  ({
    type: C.LOG_IN,
    payload: loginInfo
  })




// categories
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

export const setProxyCategories = (proxyCategories) =>
  ({
    type: C.SET_PROXY_CATEGORIES,
    payload: proxyCategories
  })





// Reservation list items
export const setResList = (resList) =>
  ({
    type: C.SET_RLI,
    payload: resList
  })

// Reservation list filter options
export const setResOpt = (options) =>
  ({
    type: C.SET_RESOPT,
    payload: options
  })

// Reserved list with owner and fetcher data
export const setReservedResList = (reservedResList) =>
({
  type: C.SET_RESERVED_LIST,
  payload: reservedResList
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
