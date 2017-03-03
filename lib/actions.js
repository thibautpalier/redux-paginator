'use strict';

exports.__esModule = true;
exports.receivePage = exports.requestPage = undefined;

var _actionTypes = require('./actionTypes');

var requestPage = exports.requestPage = function requestPage(endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, page, params, headers) {
  return {
    type: _actionTypes.REQUEST_PAGE,
    meta: {
      endpoint: endpoint,
      name: name,
      initialItem: initialItem,
      resultsKey: resultsKey,
      countKey: countKey,
      pageArgName: pageArgName,
      idKey: idKey,
      headers: headers
    },
    payload: {
      page: page,
      params: params
    }
  };
};

var receivePage = exports.receivePage = function receivePage(endpoint, name, initialItem, pageArgName, idKey, page, params, items, count, raw) {
  var fromCache = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
  return {
    type: _actionTypes.RECEIVE_PAGE,
    meta: {
      endpoint: endpoint,
      name: name,
      initialItem: initialItem,
      pageArgName: pageArgName,
      idKey: idKey,
      fromCache: fromCache
    },
    payload: {
      page: page,
      params: params,
      items: items,
      count: count,
      raw: raw
    }
  };
};