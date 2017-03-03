'use strict';

exports.__esModule = true;
exports.isCurrentPageFetching = exports.getCurrentTotalResultsCount = exports.getAllResults = exports.getCurrentPageResults = exports.getCurrentPageNumber = undefined;

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrentPageNumber = exports.getCurrentPageNumber = function getCurrentPageNumber(pagination, name) {
  var currentPage = pagination.pages[pagination.currentPages[name]];
  return typeof currentPage == 'undefined' ? 1 : currentPage.number;
};

var getCurrentPageResults = exports.getCurrentPageResults = function getCurrentPageResults(items, pagination, name) {
  var currentPage = pagination.pages[pagination.currentPages[name]];
  return typeof currentPage == 'undefined' ? [] : Object.values((0, _lodash2.default)(items || [], currentPage.ids));
};

var getAllResults = exports.getAllResults = function getAllResults(items, pagination, name) {
  var currentPage = pagination.pages[pagination.currentPages[name]];
  if (typeof currentPage == 'undefined') {
    return [];
  }
  var allPagesKeys = Object.keys(pagination.pages);
  var allPagesIds = [];
  for (var _iterator = allPagesKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

    if (pagination.pages[key].params == currentPage.params) {
      allPagesIds = allPagesIds.concat(pagination.pages[key].ids);
    }
  }
  return Object.values((0, _lodash2.default)(items || [], allPagesIds));
};

var getCurrentTotalResultsCount = exports.getCurrentTotalResultsCount = function getCurrentTotalResultsCount(pagination, name) {
  var currentPageUrl = pagination.currentPages[name];
  var currentPage = pagination.pages[currentPageUrl];
  return typeof currentPageUrl == 'undefined' ? 0 : pagination.params[currentPage.params];
};

var isCurrentPageFetching = exports.isCurrentPageFetching = function isCurrentPageFetching(pagination, name) {
  return (pagination.pages[pagination.currentPages[name]] || { fetching: true }).fetching;
};