'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _expectPredicate = require('expect-predicate');

var _expectPredicate2 = _interopRequireDefault(_expectPredicate);

var _fluxStandardAction = require('flux-standard-action');

var _actions = require('../actions');

var _actionTypes = require('../actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_expect2.default.extend(_expectPredicate2.default);

describe('actions', function () {

  it('should create receive page action', function () {
    (0, _expect2.default)((0, _actions.receivePage)('some/api/endpoint/', 'name', { id: undefined, fooField: undefined }, 'p', 'id', 2, 'foo=bar', ['foo', 'bar', 'baz'], 42)).toEqual({
      type: _actionTypes.RECEIVE_PAGE,
      meta: {
        endpoint: 'some/api/endpoint/',
        name: 'name',
        initialItem: {
          id: undefined,
          fooField: undefined
        },
        pageArgName: 'p',
        idKey: 'id',
        fromCache: false
      },
      payload: {
        params: 'foo=bar',
        page: 2,
        items: ['foo', 'bar', 'baz'],
        count: 42,
        raw: undefined
      }
    }).toPass(_fluxStandardAction.isFSA);
  });

  it('should create request page action', function () {
    (0, _expect2.default)((0, _actions.requestPage)('some/api/endpoint/', 'name', { id: undefined, fooField: undefined }, 'results', 'count', 'p', 'id', 2, 'foo=bar', { 'Accept': 'application/json' })).toEqual({
      type: _actionTypes.REQUEST_PAGE,
      meta: {
        endpoint: 'some/api/endpoint/',
        name: 'name',
        initialItem: {
          id: undefined,
          fooField: undefined
        },
        resultsKey: 'results',
        countKey: 'count',
        pageArgName: 'p',
        idKey: 'id',
        headers: { 'Accept': 'application/json' }
      },
      payload: {
        params: 'foo=bar',
        page: 2
      }
    }).toPass(_fluxStandardAction.isFSA);
  });
});