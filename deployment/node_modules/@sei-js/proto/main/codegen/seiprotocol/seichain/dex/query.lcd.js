"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LCDQueryClient = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _helpers = require("@osmonauts/helpers");
var LCDQueryClient = /*#__PURE__*/function () {
  function LCDQueryClient(_ref) {
    var requestClient = _ref.requestClient;
    (0, _classCallCheck2["default"])(this, LCDQueryClient);
    (0, _defineProperty2["default"])(this, "req", void 0);
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.longBook = this.longBook.bind(this);
    this.longBookAll = this.longBookAll.bind(this);
    this.shortBook = this.shortBook.bind(this);
    this.shortBookAll = this.shortBookAll.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getLatestPrice = this.getLatestPrice.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.getTwaps = this.getTwaps.bind(this);
    this.assetMetadata = this.assetMetadata.bind(this);
    this.assetList = this.assetList.bind(this);
    this.getRegisteredPairs = this.getRegisteredPairs.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getHistoricalPrices = this.getHistoricalPrices.bind(this);
    this.getMarketSummary = this.getMarketSummary.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  (0, _createClass2["default"])(LCDQueryClient, [{
    key: "params",
    value: function () {
      var _params2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _params,
          endpoint,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              endpoint = "sei-protocol/seichain/dex/params";
              _context.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context.abrupt("return", _context.sent);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function params() {
        return _params2.apply(this, arguments);
      }
      return params;
    }() /* Queries a LongBook by id. */
  }, {
    key: "longBook",
    value: function () {
      var _longBook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/long_book/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom, "/").concat(params.price);
              _context2.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function longBook(_x) {
        return _longBook.apply(this, arguments);
      }
      return longBook;
    }() /* Queries a list of LongBook items. */
  }, {
    key: "longBookAll",
    value: function () {
      var _longBookAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(params) {
        var options, endpoint;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = {
                params: {}
              };
              if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                (0, _helpers.setPaginationParams)(options, params.pagination);
              }
              endpoint = "sei-protocol/seichain/dex/long_book/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom);
              _context3.next = 5;
              return this.req.get(endpoint, options);
            case 5:
              return _context3.abrupt("return", _context3.sent);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function longBookAll(_x2) {
        return _longBookAll.apply(this, arguments);
      }
      return longBookAll;
    }() /* Queries a ShortBook by id. */
  }, {
    key: "shortBook",
    value: function () {
      var _shortBook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/short_book/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom, "/").concat(params.price);
              _context4.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function shortBook(_x3) {
        return _shortBook.apply(this, arguments);
      }
      return shortBook;
    }() /* Queries a list of ShortBook items. */
  }, {
    key: "shortBookAll",
    value: function () {
      var _shortBookAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(params) {
        var options, endpoint;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              options = {
                params: {}
              };
              if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                (0, _helpers.setPaginationParams)(options, params.pagination);
              }
              endpoint = "sei-protocol/seichain/dex/short_book/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom);
              _context5.next = 5;
              return this.req.get(endpoint, options);
            case 5:
              return _context5.abrupt("return", _context5.sent);
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function shortBookAll(_x4) {
        return _shortBookAll.apply(this, arguments);
      }
      return shortBookAll;
    }() /* GetPrice */
  }, {
    key: "getPrice",
    value: function () {
      var _getPrice = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_price/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom, "/").concat(params.timestamp);
              _context6.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context6.abrupt("return", _context6.sent);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getPrice(_x5) {
        return _getPrice.apply(this, arguments);
      }
      return getPrice;
    }() /* GetLatestPrice */
  }, {
    key: "getLatestPrice",
    value: function () {
      var _getLatestPrice = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_latest_price/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom);
              _context7.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context7.abrupt("return", _context7.sent);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getLatestPrice(_x6) {
        return _getLatestPrice.apply(this, arguments);
      }
      return getLatestPrice;
    }() /* GetPrices */
  }, {
    key: "getPrices",
    value: function () {
      var _getPrices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_prices/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom);
              _context8.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context8.abrupt("return", _context8.sent);
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getPrices(_x7) {
        return _getPrices.apply(this, arguments);
      }
      return getPrices;
    }() /* GetTwaps */
  }, {
    key: "getTwaps",
    value: function () {
      var _getTwaps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_twaps/".concat(params.contractAddr, "/").concat(params.lookbackSeconds);
              _context9.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context9.abrupt("return", _context9.sent);
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function getTwaps(_x8) {
        return _getTwaps.apply(this, arguments);
      }
      return getTwaps;
    }() /* Returns the metadata for a specified denom / display type */
  }, {
    key: "assetMetadata",
    value: function () {
      var _assetMetadata = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/asset_list/".concat(params.denom);
              _context10.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context10.abrupt("return", _context10.sent);
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function assetMetadata(_x9) {
        return _assetMetadata.apply(this, arguments);
      }
      return assetMetadata;
    }() /* Returns metadata for all the assets */
  }, {
    key: "assetList",
    value: function () {
      var _assetList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var _params,
          endpoint,
          _args11 = arguments;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _params = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
              endpoint = "sei-protocol/seichain/dex/asset_list";
              _context11.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context11.abrupt("return", _context11.sent);
            case 5:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function assetList() {
        return _assetList.apply(this, arguments);
      }
      return assetList;
    }() /* Returns all registered pairs for specified contract address */
  }, {
    key: "getRegisteredPairs",
    value: function () {
      var _getRegisteredPairs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(params) {
        var options, endpoint;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              options = {
                params: {}
              };
              if (typeof (params === null || params === void 0 ? void 0 : params.contractAddr) !== "undefined") {
                options.params.contractAddr = params.contractAddr;
              }
              endpoint = "sei-protocol/seichain/dex/registered_pairs";
              _context12.next = 5;
              return this.req.get(endpoint, options);
            case 5:
              return _context12.abrupt("return", _context12.sent);
            case 6:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function getRegisteredPairs(_x10) {
        return _getRegisteredPairs.apply(this, arguments);
      }
      return getRegisteredPairs;
    }() /* GetOrders */
  }, {
    key: "getOrders",
    value: function () {
      var _getOrders = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_orders/".concat(params.contractAddr, "/").concat(params.account);
              _context13.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context13.abrupt("return", _context13.sent);
            case 4:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function getOrders(_x11) {
        return _getOrders.apply(this, arguments);
      }
      return getOrders;
    }() /* GetOrder */
  }, {
    key: "getOrder",
    value: function () {
      var _getOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_order_by_id/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom, "/").concat(params.id);
              _context14.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context14.abrupt("return", _context14.sent);
            case 4:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function getOrder(_x12) {
        return _getOrder.apply(this, arguments);
      }
      return getOrder;
    }() /* GetHistoricalPrices */
  }, {
    key: "getHistoricalPrices",
    value: function () {
      var _getHistoricalPrices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_historical_prices/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom, "/").concat(params.periodLengthInSeconds, "/").concat(params.numOfPeriods);
              _context15.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context15.abrupt("return", _context15.sent);
            case 4:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function getHistoricalPrices(_x13) {
        return _getHistoricalPrices.apply(this, arguments);
      }
      return getHistoricalPrices;
    }() /* GetMarketSummary */
  }, {
    key: "getMarketSummary",
    value: function () {
      var _getMarketSummary = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              endpoint = "sei-protocol/seichain/dex/get_market_summary/".concat(params.contractAddr, "/").concat(params.priceDenom, "/").concat(params.assetDenom, "/").concat(params.lookbackInSeconds);
              _context16.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context16.abrupt("return", _context16.sent);
            case 4:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function getMarketSummary(_x14) {
        return _getMarketSummary.apply(this, arguments);
      }
      return getMarketSummary;
    }()
  }]);
  return LCDQueryClient;
}();
exports.LCDQueryClient = LCDQueryClient;