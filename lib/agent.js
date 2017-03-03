'use strict';

exports.__esModule = true;
exports.fetchPage = exports.buildSuffix = exports.FROM_CACHE_FLAG = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// based on http://stackoverflow.com/a/7616484/1836434
var hashUrl = function hashUrl(url) {
  var hash = 0,
      i = void 0,
      chr = void 0,
      len = void 0;
  if (url.length == 0) return hash;
  for (i = 0, len = url.length; i < len; i++) {
    chr = url.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var _promises = {};

var FROM_CACHE_FLAG = exports.FROM_CACHE_FLAG = '@@redux-paginator/FROM_CACHE_FLAG';

var buildSuffix = exports.buildSuffix = function buildSuffix(pageArgName, page, params) {
  var _extends2;

  var parsedParams = _queryString2.default.parse(params);
  var finalParsedParams = {};
  var startString = '';
  for (var _iterator = Object.keys(parsedParams), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var key = _ref;

    if (parsedParams[key] == null) {
      startString += key;
    } else {
      var _extends3;

      finalParsedParams = _extends({}, finalParsedParams, (_extends3 = {}, _extends3[key] = parsedParams[key], _extends3));
    }
  }
  startString = startString == '' ? '?' : startString + '?';

  if (Object.keys(finalParsedParams).length > 0 && _queryString2.default.extract(params) != '') {
    startString = params.replace(_queryString2.default.extract(params), '');
  }
  return startString + _queryString2.default.stringify(_extends({}, finalParsedParams, (_extends2 = {}, _extends2[pageArgName] = page, _extends2)), { encode: false }).replace(startString, '');
};

var fetchPage = exports.fetchPage = function fetchPage(endpoint, pageArgName, page, params) {
  var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var suffix = buildSuffix(pageArgName, page, params);
  var url = endpoint + suffix;
  var hash = hashUrl(url);
  var fromCache = true;
  var promise = _promises[hash];
  // if (typeof promise == 'undefined') {
  fromCache = false;
  promise = new Promise(function (resolve, reject) {
    return _superagent2.default.get(url).set(headers).end(function (err, res) {
      return err ? reject(err) : resolve(res);
    });
  });
  _promises[hash] = promise;
  console.log(hash);
  // }

  return promise.then(function (res) {
    var _ref2;

    return fromCache ? (_ref2 = {
      response: res.body
    }, _ref2[FROM_CACHE_FLAG] = null, _ref2) : { response: res.body };
  });
};