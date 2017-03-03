'use strict';

exports.__esModule = true;
exports.fetchPage = fetchPage;
exports.requestPageWatcher = requestPageWatcher;

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _actionTypes = require('./actionTypes');

var _agent = require('./agent');

var _marked = [fetchPage, requestPageWatcher].map(regeneratorRuntime.mark);

function fetchPage(endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, page, params, headers) {
  var results, count, _ref, response, fromCache;

  return regeneratorRuntime.wrap(function fetchPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          results = void 0, count = void 0;
          _context.next = 4;
          return (0, _effects.call)(_agent.fetchPage, endpoint, pageArgName, page, params, headers);

        case 4:
          _ref = _context.sent;
          response = _ref.response;
          fromCache = _ref[_agent.FROM_CACHE_FLAG];

          if (typeof resultsKey == 'undefined') {
            results = response;
          } else {
            results = response[resultsKey];
            count = response[countKey];
          }
          _context.next = 10;
          return (0, _effects.put)((0, _actions.receivePage)(endpoint, name, initialItem, pageArgName, idKey, page, params, results, count, response, !(typeof fromCache == 'undefined')));

        case 10:
          _context.next = 14;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context['catch'](0);

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[0, 12]]);
}

function requestPageWatcher() {
  var _ref2, _ref2$meta, endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, headers, _ref2$payload, page, params;

  return regeneratorRuntime.wrap(function requestPageWatcher$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 20;
            break;
          }

          _context2.next = 3;
          return (0, _effects.take)(_actionTypes.REQUEST_PAGE);

        case 3:
          _ref2 = _context2.sent;
          _ref2$meta = _ref2.meta;
          endpoint = _ref2$meta.endpoint;
          name = _ref2$meta.name;
          initialItem = _ref2$meta.initialItem;
          resultsKey = _ref2$meta.resultsKey;
          countKey = _ref2$meta.countKey;
          pageArgName = _ref2$meta.pageArgName;
          idKey = _ref2$meta.idKey;
          headers = _ref2$meta.headers;
          _ref2$payload = _ref2.payload;
          page = _ref2$payload.page;
          params = _ref2$payload.params;
          _context2.next = 18;
          return (0, _effects.fork)(fetchPage, endpoint, name, initialItem, resultsKey, countKey, pageArgName, idKey, page, params, headers);

        case 18:
          _context2.next = 0;
          break;

        case 20:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}