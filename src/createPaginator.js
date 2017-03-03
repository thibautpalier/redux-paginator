import { combineReducers } from 'redux'

import {
  params as paramsReducer,
  pages as pagesReducer,
  cursor as cursorReducer,
  currentPages as currentPagesReducer,
  items as itemsReducer
} from './reducers'
import { requestPage } from './actions'


export const onlyForEndpoint = (endpoint, reducer) => (state = {}, action = {}) =>
  typeof action.meta == 'undefined' ? state : action.meta.endpoint == endpoint ? reducer(state, action) : state


export const requestPageActionCreatorForEndpoint = (
  endpoint,
  name,
  pageArgName,
  idKey,
  initialItem,
  resultsKey,
  countKey,
  headers
) =>
  (page, params) => requestPage(
    endpoint,
    name,
    initialItem,
    resultsKey,
    countKey,
    pageArgName,
    idKey,
    page,
    params,
    headers
  )

export const getRequestPageActionCreatorsFor = (
  endpoint,
  names,
  pageArgName,
  idKey,
  initialItem,
  resultsKey,
  countKey,
  headers
) => {
  let actions = {}
  for (let name of names) {
    actions = {
      ...actions,
      [name]: {
        requestPage:requestPageActionCreatorForEndpoint(
          endpoint,
          name,
          pageArgName,
          idKey,
          initialItem,
          resultsKey,
          countKey,
          headers
        )
      }
    }
  }
  return actions
}

export const paginator = (itemsReducer, params, pages, currentPages, cursor, requestPageActionCreators) => ({
  reducers: combineReducers({
    params,
    pages,
    currentPages,
    cursor
  }),
  itemsReducer,
  ...requestPageActionCreators
})


export const createPaginator = (endpoint, names, {
  initialItem,
  resultsKey,
  countKey,
  pageArgName = 'page',
  idKey = 'id',
  headers = {}
}) => {

  const params = onlyForEndpoint(endpoint, paramsReducer)

  const pages = onlyForEndpoint(endpoint, pagesReducer)

  const currentPages = onlyForEndpoint(endpoint, currentPagesReducer)

  const cursor = onlyForEndpoint(endpoint, cursorReducer)

  const requestPageActionCreators = getRequestPageActionCreatorsFor(
    endpoint,
    names,
    pageArgName,
    idKey,
    initialItem,
    resultsKey,
    countKey,
    headers
  )

  return paginator(itemsReducer, params, pages, currentPages, cursor, requestPageActionCreators)

}
