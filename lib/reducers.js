'use strict';

exports.__esModule = true;
exports.items = exports.currentPages = exports.pages = exports.params = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./actionTypes');

var _agent = require('./agent');

var getPageUrlFromAction = function getPageUrlFromAction(_ref) {
  var pageArgName = _ref.meta.pageArgName,
      _ref$payload = _ref.payload,
      params = _ref$payload.params,
      page = _ref$payload.page;
  return (0, _agent.buildSuffix)(pageArgName, page, params);
};

var params = exports.params = function params() {
  var _extends2, _extends3;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case _actionTypes.REQUEST_PAGE:
      return _extends({}, params, (_extends2 = {}, _extends2[payload.params] = undefined, _extends2));
    case _actionTypes.RECEIVE_PAGE:
      return _extends({}, params, (_extends3 = {}, _extends3[payload.params] = payload.count, _extends3));
    default:
      return params;
  }
};

var pages = exports.pages = function pages() {
  var _extends4, _extends5;

  var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = action.type,
      meta = action.meta,
      payload = action.payload;

  var pageUrl = void 0;
  switch (type) {
    case _actionTypes.REQUEST_PAGE:
      pageUrl = getPageUrlFromAction(action);
      return _extends({}, pages, (_extends4 = {}, _extends4[pageUrl] = _extends({}, pages[pageUrl], {
        ids: [],
        params: payload.params,
        number: payload.page,
        fetching: true
      }), _extends4));
    case _actionTypes.RECEIVE_PAGE:
      pageUrl = getPageUrlFromAction(action);
      return _extends({}, pages, (_extends5 = {}, _extends5[pageUrl] = _extends({}, pages[pageUrl], {
        ids: payload.items.map(function (i) {
          return i[meta.idKey];
        }),
        fetching: false
      }), _extends5));
    default:
      return pages;
  }
};

var currentPages = exports.currentPages = function currentPages() {
  var _extends6;

  var currentPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = action.type,
      meta = action.meta;

  var pageUrl = void 0;
  switch (type) {
    case _actionTypes.REQUEST_PAGE:
      pageUrl = getPageUrlFromAction(action);
      return _extends({}, currentPages, (_extends6 = {}, _extends6[meta.name] = pageUrl, _extends6));
    default:
      return currentPages;
  }
};

var items = exports.items = function items() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = action.type,
      payload = action.payload,
      meta = action.meta;

  switch (type) {
    case _actionTypes.RECEIVE_PAGE:
      {
        var _items = {};
        if (meta.fromCache === false) {
          for (var _iterator = payload.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref2 = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref2 = _i.value;
            }

            var item = _ref2;

            _items[item[meta.idKey]] = _extends({}, meta.initialItem, item);
          }
        }
        return _extends({}, items, _items);
      }
    default:
      return items;
  }
};