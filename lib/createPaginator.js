'use strict';

exports.__esModule = true;
exports.createPaginator = exports.paginator = exports.getRequestPageActionCreatorsFor = exports.requestPageActionCreatorForEndpoint = exports.onlyForEndpoint = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _reducers = require('./reducers');

var _actions = require('./actions');

var onlyForEndpoint = exports.onlyForEndpoint = function onlyForEndpoint(endpoint, reducer) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return typeof action.meta == 'undefined' ? state : action.meta.endpoint == endpoint ? reducer(state, action) : state;
  };
};

var requestPageActionCreatorForEndpoint = exports.requestPageActionCreatorForEndpoint = function requestPageActionCreatorForEndpoint(endpoint, name, pageArgName, idKey, initialItem, resultsKey, countKey, headers) {
  return function (page, params) {
    return (0, _actions.requestPage)(endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, page, params, headers);
  };
};

var getRequestPageActionCreatorsFor = exports.getRequestPageActionCreatorsFor = function getRequestPageActionCreatorsFor(endpoint, names, pageArgName, idKey, initialItem, resultsKey, countKey, headers) {
  var actions = {};
  for (var _iterator = names, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _extends2;

    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var name = _ref;

    actions = _extends({}, actions, (_extends2 = {}, _extends2[name] = {
      requestPage: requestPageActionCreatorForEndpoint(endpoint, name, pageArgName, idKey, initialItem, resultsKey, countKey, headers)
    }, _extends2));
  }
  return actions;
};

var paginator = exports.paginator = function paginator(itemsReducer, params, pages, currentPages, cursor, requestPageActionCreators) {
  return _extends({
    reducers: (0, _redux.combineReducers)({
      params: params,
      pages: pages,
      currentPages: currentPages,
      cursor: cursor
    }),
    itemsReducer: itemsReducer
  }, requestPageActionCreators);
};

var createPaginator = exports.createPaginator = function createPaginator(endpoint, names, _ref2) {
  var initialItem = _ref2.initialItem,
      resultsKey = _ref2.resultsKey,
      countKey = _ref2.countKey,
      _ref2$pageArgName = _ref2.pageArgName,
      pageArgName = _ref2$pageArgName === undefined ? 'page' : _ref2$pageArgName,
      _ref2$idKey = _ref2.idKey,
      idKey = _ref2$idKey === undefined ? 'id' : _ref2$idKey,
      _ref2$headers = _ref2.headers,
      headers = _ref2$headers === undefined ? {} : _ref2$headers;


  var params = onlyForEndpoint(endpoint, _reducers.params);

  var pages = onlyForEndpoint(endpoint, _reducers.pages);

  var currentPages = onlyForEndpoint(endpoint, _reducers.currentPages);

  var cursor = onlyForEndpoint(endpoint, _reducers.cursor);

  var requestPageActionCreators = getRequestPageActionCreatorsFor(endpoint, names, pageArgName, idKey, initialItem, resultsKey, countKey, headers);

  return paginator(_reducers.items, params, pages, currentPages, cursor, requestPageActionCreators);
};