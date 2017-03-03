'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _agent = require('../agent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('buildSuffix', function () {

  it('should correctly build the url suffix when simple params are provided', function () {
    (0, _expect2.default)((0, _agent.buildSuffix)('p', 1, 'foo=bar')).toEqual('?foo=bar&p=1');
  });

  it('should correctly build the url suffix when less simple params are provided', function () {
    (0, _expect2.default)((0, _agent.buildSuffix)('p', 1, 'foo=bar&baz=foo')).toEqual('?baz=foo&foo=bar&p=1');
  });

  it('should correctly build the url suffix when params contains no extractable query params', function () {
    (0, _expect2.default)((0, _agent.buildSuffix)('p', 1, 'foo/bar')).toEqual('foo/bar?p=1');
  });

  it('should correctly build the url suffix when "params" is not provided', function () {
    (0, _expect2.default)((0, _agent.buildSuffix)('p', 1, '')).toEqual('?p=1');
  });

  it('should correctly build the url suffix when complex params are provided', function () {
    (0, _expect2.default)((0, _agent.buildSuffix)('p', 1, 'foo/bar?bar=biz&baz=foo')).toEqual('foo/bar?baz=foo&bar=biz&p=1');
  });
});