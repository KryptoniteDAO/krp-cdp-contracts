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
var LCDQueryClient = /*#__PURE__*/function () {
  function LCDQueryClient(_ref) {
    var requestClient = _ref.requestClient;
    (0, _classCallCheck2["default"])(this, LCDQueryClient);
    (0, _defineProperty2["default"])(this, "req", void 0);
    this.req = requestClient;
    this.exchangeRate = this.exchangeRate.bind(this);
    this.exchangeRates = this.exchangeRates.bind(this);
    this.actives = this.actives.bind(this);
    this.voteTargets = this.voteTargets.bind(this);
    this.priceSnapshotHistory = this.priceSnapshotHistory.bind(this);
    this.twaps = this.twaps.bind(this);
    this.feederDelegation = this.feederDelegation.bind(this);
    this.votePenaltyCounter = this.votePenaltyCounter.bind(this);
    this.aggregateVote = this.aggregateVote.bind(this);
    this.aggregateVotes = this.aggregateVotes.bind(this);
    this.params = this.params.bind(this);
  }
  /* ExchangeRate returns exchange rate of a denom */
  (0, _createClass2["default"])(LCDQueryClient, [{
    key: "exchangeRate",
    value: function () {
      var _exchangeRate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              endpoint = "sei-protocol/sei-chain/oracle/denoms/".concat(params.denom, "/exchange_rate");
              _context.next = 3;
              return this.req.get(endpoint);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function exchangeRate(_x) {
        return _exchangeRate.apply(this, arguments);
      }
      return exchangeRate;
    }() /* ExchangeRates returns exchange rates of all denoms */
  }, {
    key: "exchangeRates",
    value: function () {
      var _exchangeRates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _params,
          endpoint,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              endpoint = "sei-protocol/sei-chain/oracle/denoms/exchange_rates";
              _context2.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context2.abrupt("return", _context2.sent);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function exchangeRates() {
        return _exchangeRates.apply(this, arguments);
      }
      return exchangeRates;
    }() /* Actives returns all active denoms */
  }, {
    key: "actives",
    value: function () {
      var _actives = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _params,
          endpoint,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              endpoint = "sei-protocol/sei-chain/oracle/denoms/actives";
              _context3.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context3.abrupt("return", _context3.sent);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function actives() {
        return _actives.apply(this, arguments);
      }
      return actives;
    }() /* VoteTargets returns all vote target denoms */
  }, {
    key: "voteTargets",
    value: function () {
      var _voteTargets = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var _params,
          endpoint,
          _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              endpoint = "sei-protocol/sei-chain/oracle/denoms/vote_targets";
              _context4.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context4.abrupt("return", _context4.sent);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function voteTargets() {
        return _voteTargets.apply(this, arguments);
      }
      return voteTargets;
    }() /* PriceSnapshotHistory returns the history of price snapshots for all assets */
  }, {
    key: "priceSnapshotHistory",
    value: function () {
      var _priceSnapshotHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var _params,
          endpoint,
          _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
              endpoint = "sei-protocol/sei-chain/oracle/denoms/price_snapshot_history";
              _context5.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context5.abrupt("return", _context5.sent);
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function priceSnapshotHistory() {
        return _priceSnapshotHistory.apply(this, arguments);
      }
      return priceSnapshotHistory;
    }() /* Twaps */
  }, {
    key: "twaps",
    value: function () {
      var _twaps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(params) {
        var options, endpoint;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              options = {
                params: {}
              };
              if (typeof (params === null || params === void 0 ? void 0 : params.lookbackSeconds) !== "undefined") {
                options.params.lookback_seconds = params.lookbackSeconds;
              }
              endpoint = "sei-protocol/sei-chain/oracle/denoms/twaps";
              _context6.next = 5;
              return this.req.get(endpoint, options);
            case 5:
              return _context6.abrupt("return", _context6.sent);
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function twaps(_x2) {
        return _twaps.apply(this, arguments);
      }
      return twaps;
    }() /* FeederDelegation returns feeder delegation of a validator */
  }, {
    key: "feederDelegation",
    value: function () {
      var _feederDelegation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              endpoint = "sei-protocol/sei-chain/oracle/validators/".concat(params.validatorAddr, "/feeder");
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
      function feederDelegation(_x3) {
        return _feederDelegation.apply(this, arguments);
      }
      return feederDelegation;
    }() /* MissCounter returns oracle miss counter of a validator */
  }, {
    key: "votePenaltyCounter",
    value: function () {
      var _votePenaltyCounter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              endpoint = "sei-protocol/sei-chain/oracle/validators/".concat(params.validatorAddr, "/vote_penalty_counter");
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
      function votePenaltyCounter(_x4) {
        return _votePenaltyCounter.apply(this, arguments);
      }
      return votePenaltyCounter;
    }() /* AggregateVote returns an aggregate vote of a validator */
  }, {
    key: "aggregateVote",
    value: function () {
      var _aggregateVote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              endpoint = "sei-protocol/sei-chain/oracle/validators/".concat(params.validatorAddr, "/aggregate_vote");
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
      function aggregateVote(_x5) {
        return _aggregateVote.apply(this, arguments);
      }
      return aggregateVote;
    }() /* AggregateVotes returns aggregate votes of all validators */
  }, {
    key: "aggregateVotes",
    value: function () {
      var _aggregateVotes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var _params,
          endpoint,
          _args10 = arguments;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _params = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
              endpoint = "sei-protocol/sei-chain/oracle/validators/aggregate_votes";
              _context10.next = 4;
              return this.req.get(endpoint);
            case 4:
              return _context10.abrupt("return", _context10.sent);
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function aggregateVotes() {
        return _aggregateVotes.apply(this, arguments);
      }
      return aggregateVotes;
    }() /* Params queries all parameters. */
  }, {
    key: "params",
    value: function () {
      var _params2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var _params,
          endpoint,
          _args11 = arguments;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _params = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
              endpoint = "sei-protocol/sei-chain/oracle/params";
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
      function params() {
        return _params2.apply(this, arguments);
      }
      return params;
    }()
  }]);
  return LCDQueryClient;
}();
exports.LCDQueryClient = LCDQueryClient;