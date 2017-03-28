import {
  RECEIVE_PAGE,
  REQUEST_PAGE,
  RESET
} from './actionTypes'


export const reset = () => {
  type : RESET
}

export const requestPage = (
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
) => ({
  type: REQUEST_PAGE,
  meta: {
    endpoint,
    name,
    initialItem,
    resultsKey,
    countKey,
    pageArgName,
    idKey,
    headers
  },
  payload: {
    page,
    params
  }
})

export const receivePage = (
  endpoint,
  name,
  initialItem,
  pageArgName,
  idKey,
  page,
  cursor,
  params,
  items,
  count,
  raw,
  fromCache = false
) => ({
  type: RECEIVE_PAGE,
  meta: {
    cursor,
    endpoint,
    name,
    initialItem,
    pageArgName,
    idKey,
    fromCache
  },
  payload: {
    page,
    params,
    items,
    count,
    raw
  }
})
