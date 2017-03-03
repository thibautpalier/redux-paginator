'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _actions = require('../actions');

var _reducers = require('../reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestPageAction = (0, _actions.requestPage)('some/api/endpoint', 'name', { id: undefined, fooField: undefined }, 'results', 'count', 'p', 'id', 2, 'foo=bar');

var receivePageAction = (0, _actions.receivePage)('some/api/endpoint/', 'name', { id: undefined, fooField: undefined }, 'p', 'id', 2, 'foo=bar', [{ id: 'baz', fooField: 'bazValue' }, { id: 'bar', fooField: 'barValue' }], 42);

describe('params reducer', function () {

  it('should return the state by default', function () {
    var state = (0, _reducers.params)({ some: 'state' }, { type: 'some action' });
    (0, _expect2.default)(state).toEqual({ some: 'state' });
  });

  it('should initialize new params key with undefined count when requesting page', function () {
    var state = (0, _reducers.params)(undefined, requestPageAction);
    (0, _expect2.default)(state).toEqual({
      'foo=bar': undefined
    });
  });

  it('should update results count corresponding to the params when receiving page', function () {
    var state = (0, _reducers.params)({ 'foo=bar': undefined }, receivePageAction);
    (0, _expect2.default)(state).toEqual({
      'foo=bar': 42
    });
  });
});

describe('pages reducer', function () {

  it('should return the state by default', function () {
    var state = (0, _reducers.pages)({ some: 'state' }, { type: 'some action' });
    (0, _expect2.default)(state).toEqual({ some: 'state' });
  });

  it('should initialize the pages map with a new page entry when requesting new page', function () {
    var state = (0, _reducers.pages)(undefined, requestPageAction);
    (0, _expect2.default)(state).toEqual({
      '?foo=bar&p=2': {
        number: 2,
        params: 'foo=bar',
        ids: [],
        fetching: true
      }
    });
  });

  it('should populate the pages map at the page url key with the item ids', function () {
    var state = (0, _reducers.pages)({
      '?foo=bar&p=2': {
        number: 2,
        params: 'foo=bar',
        ids: [],
        fetching: true
      }
    }, receivePageAction);
    (0, _expect2.default)(state).toEqual({
      '?foo=bar&p=2': {
        number: 2,
        params: 'foo=bar',
        ids: ['baz', 'bar'],
        fetching: false
      }
    });
  });
});

describe('currentPages reducer', function () {

  it('should return the state by default', function () {
    var state = (0, _reducers.currentPages)({ some: 'state' }, { type: 'some action' });
    (0, _expect2.default)(state).toEqual({ some: 'state' });
  });

  it('should update the current pages map with an entry with the paginator slice name as key and the current page url as value when requesting a page', function () {
    var state = (0, _reducers.currentPages)(undefined, requestPageAction);
    (0, _expect2.default)(state).toEqual({
      name: '?foo=bar&p=2'
    });
  });
});

describe('items reducer', function () {

  it('should populate the items map with item received', function () {
    var state = (0, _reducers.items)(undefined, receivePageAction);
    (0, _expect2.default)(state).toEqual({
      'baz': {
        id: 'baz',
        fooField: 'bazValue'
      },
      'bar': {
        id: 'bar',
        fooField: 'barValue'
      }
    });
  });

  it('should NOT populate the items map with item received if the item is received from cache data', function () {
    var state = (0, _reducers.items)(undefined, (0, _actions.receivePage)('some/api/endpoint/', 'name', { id: undefined, fooField: undefined }, 'p', 'id', 2, 'foo=bar', [{ id: 'baz', fooField: 'bazValue' }, { id: 'bar', fooField: 'barValue' }], 42, {}, true));
    (0, _expect2.default)(state).toEqual({});
  });
});