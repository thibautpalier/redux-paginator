'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _effects = require('redux-saga/effects');

var _actionTypes = require('../actionTypes');

var _actions = require('../actions');

var _agent = require('../agent');

var _sagas = require('../sagas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('request page watcher', function () {

  it('should watch for every REQUEST_PAGE action and fork the fetchPage saga', function () {
    var saga = (0, _sagas.requestPageWatcher)();
    var next = saga.next();
    (0, _expect2.default)(next.value).toEqual((0, _effects.take)(_actionTypes.REQUEST_PAGE));

    next = saga.next((0, _actions.requestPage)('endpoint', 'name', { id: undefined, fooField: undefined }, 'resultsKey', 'countKey', 'p', 'id', 'page', 'params', { 'Accept': 'application/json' }));
    (0, _expect2.default)(next.value).toEqual((0, _effects.fork)(_sagas.fetchPage, 'endpoint', 'name', { id: undefined, fooField: undefined }, 'resultsKey', 'countKey', 'p', 'id', 'page', 'params', { 'Accept': 'application/json' }));

    next = saga.next();
    (0, _expect2.default)(next.value).toEqual((0, _effects.take)(_actionTypes.REQUEST_PAGE));
  });
});

describe('fetch page saga', function () {

  it('should fetch the page and put the receive page action', function () {
    var _saga$next;

    var saga = (0, _sagas.fetchPage)('endpoint', 'name', { id: undefined, fooField: undefined }, 'resultsKey', 'countKey', 'p', 'id', 'page', 'params', { 'Accept': 'application/json' });
    var response = {
      resultsKey: ['foo', 'bar'],
      countKey: 42
    };

    var next = saga.next();
    (0, _expect2.default)(next.value).toEqual((0, _effects.call)(_agent.fetchPage, 'endpoint', 'p', 'page', 'params', { 'Accept': 'application/json' }));

    next = saga.next((_saga$next = { response: response }, _saga$next[_agent.FROM_CACHE_FLAG] = null, _saga$next));
    (0, _expect2.default)(next.value).toEqual((0, _effects.put)((0, _actions.receivePage)('endpoint', 'name', { id: undefined, fooField: undefined }, 'p', 'id', 'page', 'params', ['foo', 'bar'], 42, response, true, { 'Accept': 'application/json' })));
  });
});