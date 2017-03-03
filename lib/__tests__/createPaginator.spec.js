'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _actions = require('../actions');

var _createPaginator = require('../createPaginator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('onlyForEndpoint', function () {

  it('should apply the provided reducer if actions meta endpoint is the same than the provided endpoint', function () {
    var fooReducer = function fooReducer() {
      return {
        foo: 'bar'
      };
    };
    var endpoint = 'some/endpoint/';
    var fooAction = {
      type: 'FOO',
      meta: {
        endpoint: endpoint
      }
    };
    var state = (0, _createPaginator.onlyForEndpoint)(endpoint, fooReducer)(undefined, fooAction);
    (0, _expect2.default)(state).toEqual({
      foo: 'bar'
    });
  });

  it('should NOT apply the provided reducer if actions meta endpoint differs from the provided one', function () {
    var fooReducer = function fooReducer() {
      return {
        foo: 'bar'
      };
    };
    var endpoint = 'some/endpoint/';
    var fooAction = {
      type: 'FOO',
      meta: {
        endpoint: 'some/other/endpoint/'
      }
    };
    var state = (0, _createPaginator.onlyForEndpoint)(endpoint, fooReducer)(undefined, fooAction);
    (0, _expect2.default)(state).toEqual({});
  });
});

describe('requestPageActionCreatorForEndpoint', function () {

  it('should create an action creator for provided options', function () {
    var actionCreator = (0, _createPaginator.requestPageActionCreatorForEndpoint)('some/endpoint/', 'some name', 'p', 'id', { id: undefined, fooField: undefined }, 'results', 'count');
    var action = actionCreator(2, 'foo=bar');
    (0, _expect2.default)(action).toEqual((0, _actions.requestPage)('some/endpoint/', 'some name', { id: undefined, fooField: undefined }, 'results', 'count', 'p', 'id', 2, 'foo=bar'));
  });
});

describe('getRequestPageActionCreatorsFor', function () {

  it('should create action creators for the given endpoint, pageNameArg, names and headers', function () {
    var actionCreators = (0, _createPaginator.getRequestPageActionCreatorsFor)('some/api/endpoint/', ['foo', 'bar'], 'p', 'id', { id: undefined, fooField: undefined }, 'results', 'count', { 'Accept': 'application/json' });
    var actionForFoo = actionCreators.foo.requestPage(42, 'foo=bar');
    var actionForBar = actionCreators.bar.requestPage(17, 'bar=foo');
    (0, _expect2.default)(actionForFoo).toEqual((0, _actions.requestPage)('some/api/endpoint/', 'foo', { id: undefined, fooField: undefined }, 'results', 'count', 'p', 'id', 42, 'foo=bar', { 'Accept': 'application/json' }));
    (0, _expect2.default)(actionForBar).toEqual((0, _actions.requestPage)('some/api/endpoint/', 'bar', { id: undefined, fooField: undefined }, 'results', 'count', 'p', 'id', 17, 'bar=foo', { 'Accept': 'application/json' }));
  });
});

describe('createPaginator', function () {

  it('should create correct request action creator', function () {
    var paginator = (0, _createPaginator.createPaginator)('some/api/endpoint', ['foo'], {
      initialItem: { id: undefined, fooField: undefined },
      pageArgName: 'p',
      idKey: 'id_field',
      resultsKey: 'results',
      countKey: 'count',
      headers: { 'Accept': 'application/json' }
    });
    var action = paginator.foo.requestPage(42, 'foo=bar');
    (0, _expect2.default)(action).toEqual((0, _actions.requestPage)('some/api/endpoint', 'foo', { id: undefined, fooField: undefined }, 'results', 'count', 'p', 'id_field', 42, 'foo=bar', { 'Accept': 'application/json' }));
  });
});