'use strict';

exports.__esModule = true;
exports.receivePage = exports.requestPage = exports.reset = undefined;

var _actionTypes = require('./actionTypes');

var reset = exports.reset = function reset() {
  type: _actionTypes.RESET;
};

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

var receivePage = exports.receivePage = function receivePage(endpoint, name, initialItem, pageArgName, idKey, page, cursor, params, items, count, raw) {
  var fromCache = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;
  return {
    type: _actionTypes.RECEIVE_PAGE,
    meta: {
      cursor: cursor,
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