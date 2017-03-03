'use strict';

exports.__esModule = true;
exports.isCurrentPageFetching = exports.getCurrentTotalResultsCount = exports.getAllResults = exports.getCurrentPageResults = exports.getCurrentPageNumber = exports.requestPageWatcher = exports.paginatorMiddleware = exports.createPaginator = undefined;

var _createPaginator = require('./createPaginator');

var _paginatorMiddleware = require('./paginatorMiddleware');

var _paginatorMiddleware2 = _interopRequireDefault(_paginatorMiddleware);

var _sagas = require('./sagas');

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createPaginator = _createPaginator.createPaginator;
exports.paginatorMiddleware = _paginatorMiddleware2.default;
exports.requestPageWatcher = _sagas.requestPageWatcher;
exports.getCurrentPageNumber = _selectors.getCurrentPageNumber;
exports.getCurrentPageResults = _selectors.getCurrentPageResults;
exports.getAllResults = _selectors.getAllResults;
exports.getCurrentTotalResultsCount = _selectors.getCurrentTotalResultsCount;
exports.isCurrentPageFetching = _selectors.isCurrentPageFetching;