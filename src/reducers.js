import {
  REQUEST_PAGE,
  RECEIVE_PAGE,
  RESET_PAGINATION
} from './actionTypes'
import { buildSuffix } from './agent'

const getPageUrlFromAction = ({ meta: { pageArgName }, payload: { params, page } }) =>
  buildSuffix(pageArgName, page, params)

export const params = (params = {}, action = {}) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_PAGE:
      return {
        ...params,
        [payload.params]: undefined
      }
    case RECEIVE_PAGE:
      return {
        ...params,
        [payload.params]: payload.count
      }
    case RESET:
      return {}
    default:
      return params
  }
}

export const pages = (pages = {}, action = {}) => {
  const { type, meta, payload } = action
  let pageUrl
  switch (type) {
    case REQUEST_PAGE:
      pageUrl = getPageUrlFromAction(action)

      if(payload.page === 0 ){
        pages = {}
      }

      return {
        ...pages,
        [pageUrl]: {
          ids: [],
          params: payload.params,
          number: payload.page,
          fetching: true
        }
      }
    case RECEIVE_PAGE:
      pageUrl = getPageUrlFromAction(action)
      return {
        ...pages,
        [pageUrl]: {
          ids: payload.items.map(i => i[meta.idKey]),
          fetching: false
        }
      }
    case RESET:
      return {}
    default:
      return pages
  }
}

export const currentPages = (currentPages = {}, action = {}) => {
  const { type, meta } = action
  let pageUrl
  switch (type) {
    case REQUEST_PAGE:
      pageUrl = getPageUrlFromAction(action)
      return {
        ...currentPages,
        [meta.name]: pageUrl
      }
    case RESET:
      return {
        ...currentPages,
        [meta.name]: ''
      }
    default:
      return currentPages
  }
}

export const cursor = (cursor = {}, action = {}) => {
  const { type, meta } = action
  switch (type) {
    case RECEIVE_PAGE:
      return {
        ...cursor,
        [meta.name]: meta.cursor
      }
    case RESET:
      return {
        ...cursor,
        [meta.name]: {}
      }
    default:
      return cursor
  }
}

export const items = (items = {}, action = {}) => {
  const { type, payload, meta } = action
  switch (type) {
    case RECEIVE_PAGE: {
      let _items = {}
      if (meta.fromCache === false) {
        for (let item of payload.items) {
          _items[item[meta.idKey]] = {
            ...meta.initialItem,
            ...item
          }
        }
      }
      return {
        ...items,
        ..._items
      }
    }
    case RESET:
      return {}
    default:
      return items
  }
}
