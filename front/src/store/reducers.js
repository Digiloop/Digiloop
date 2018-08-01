import C from '../constants'
import { combineReducers } from 'redux'


export const loginInfo = (state = [], action) =>
  (action.type === C.LOG_IN) ? action.payload : state

export const resListOpt = (state = [], action) =>
  (action.type === C.SET_RESOPT) ? action.payload : state

export const resList = (state = [], action) =>
  (action.type === C.SET_RLI) ? action.payload : state

export const resListWithOwnersData = (state = [], action) =>
  (action.type === C.SET_RLI_WITH_OWNERS) ? action.payload : state

export const categories = (state = [], action) =>
  (action.type === C.SET_CATEGORIES) ? action.payload : state

export const subCategories = (state = [], action) =>
  (action.type === C.SET_SUB_CATEGORIES) ? action.payload : state

export const proxyCategories = (state = [], action) =>
  (action.type === C.SET_PROXY_CATEGORIES) ? action.payload : state


export const notifications = (state = [], action) =>
  (action.type === C.SET_NOTIF) ? action.payload : state

export const currentPageName = (state = "Etusivu", action) =>
  (action.type === C.SET_CURRENTPAGENAME) ? action.payload : state

export default combineReducers({
  loginInfo,
  resListOpt,
  resList,
  resListWithOwnersData,

  categories,
  subCategories,
  proxyCategories,

  notifications,
  currentPageName
})
