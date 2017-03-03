import { call, take, put, fork } from 'redux-saga/effects'

import { receivePage } from './actions'
import { REQUEST_PAGE } from './actionTypes'
import {
  FROM_CACHE_FLAG,
  fetchPage as fetchPageRequest
} from './agent'


export function *fetchPage(endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, page, params, headers) {
  try {
    let results, count, cursor
    const { response, [FROM_CACHE_FLAG]: fromCache } = yield call(fetchPageRequest, endpoint, pageArgName, page, params, headers)
    if (typeof resultsKey == 'undefined') {
      results = response
    }
    else {
      results = response[resultsKey]
      cursor = response.cursor
      count = response.cursor[countKey]
    }
    yield put(receivePage(endpoint, name, initialItem, pageArgName, idKey, page, cursor, params, results, count, response, !(typeof fromCache == 'undefined')))
  } catch(error) {
    // TODO
  }
}

export function *requestPageWatcher() {
  while (true) {  //  eslint-disable-line no-constant-condition
    const { meta: { endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, headers }, payload: { page, params } } = yield take(REQUEST_PAGE)
    yield fork(fetchPage, endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, page, params, headers)
  }
}
