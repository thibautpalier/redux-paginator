'use strict';

exports.__esModule = true;

var _actionTypes = require('./actionTypes');

var _actions = require('./actions');

var _agent = require('./agent');

var paginatorMiddleware = function paginatorMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (action.type == _actionTypes.REQUEST_PAGE) {
        var _action$meta = action.meta,
            endpoint = _action$meta.endpoint,
            name = _action$meta.name,
            initialItem = _action$meta.initialItem,
            resultsKey = _action$meta.resultsKey,
            countKey = _action$meta.countKey,
            pageArgName = _action$meta.pageArgName,
            idKey = _action$meta.idKey,
            headers = _action$meta.headers,
            _action$payload = action.payload,
            page = _action$payload.page,
            params = _action$payload.params;

        dispatch(function (dispatch) {
          try {
            (0, _agent.fetchPage)(endpoint, pageArgName, page, params, headers).then(function (res) {
              var response = res.response,
                  fromCache = res[_agent.FROM_CACHE_FLAG];

              var results = void 0,
                  count = void 0;

              if (typeof resultsKey == 'undefined') {
                results = response;
              } else {
                results = response[resultsKey];
                count = response[countKey];
              }
              dispatch((0, _actions.receivePage)(endpoint, name, initialItem, pageArgName, idKey, page, params, results, count, res, !(typeof fromCache == 'undefined')));
            });
          } catch (err) {
            // TODO
          }
        });
      }
      return next(action);
    };
  };
};

exports.default = paginatorMiddleware;