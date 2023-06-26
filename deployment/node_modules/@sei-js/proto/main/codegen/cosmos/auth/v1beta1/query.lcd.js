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
    this.accounts = this.accounts.bind(this);
    this.account = this.account.bind(this);
    this.params = this.params.bind(this);
    this.moduleAccounts = this.moduleAccounts.bind(this);
    this.bech32Prefix = this.bech32Prefix.bind(this);
    this.addressBytesToString = this.addressBytesToString.bind(this);
    this.addressStringToBytes = this.addressStringToBytes.bind(this);
  }
  /* Accounts returns all the existing accounts
  
   Since: cosmos-sdk 0.43 */
  (0, _createClass2["default"])(LCDQueryClient, [{
    key: "accounts",
    value: function () {
      var _accounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var params,
          options,
          endpoint,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {
                pagination: undefined
              };
              options = {
                params: {}
              };
              if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                (0, _helpers.setPaginationParams)(options, params.pagination);
              }
              endpoint = "cosmos/auth/v1beta1/accounts";
              _context.next = 6;
              return this.req.get(endpoint, options);
            case 6:
              return _context.abrupt("return", _context.sent);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function accounts() {
        return _accounts.apply(this, arguments);
      }
      return accounts;
    }() /* Account returns account details based on address. */
  }, {
    key: "account",
    value: function () {
      var _account = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              endpoint = "cosmos/auth/v1beta1/accounts/".concat(params.address);
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
      function account(_x) {
        return _account.apply(this, arguments);
      }
      return account;
    }() /* Params queries all parameters. */
  }, {
    key: "params",
    value: function () {
      var _params2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _params,
          endpoint,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              endpoint = "cosmos/auth/v1beta1/params";
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
      function params() {
        return _params2.apply(this, arguments);
      }
      return params;
    }() /* ModuleAccounts returns all the existing module accounts. */
  }, {
    key: "moduleAccounts",
    value: function () {
      var _moduleAccounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var _params,
          endpoint,
          _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              endpoint = "cosmos/auth/v1beta1/module_accounts";
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
      function moduleAccounts() {
        return _moduleAccounts.apply(this, arguments);
      }
      return moduleAccounts;
    }() /* Bech32 queries bech32Prefix */
  }, {
    key: "bech32Prefix",
    value: function () {
      var _bech32Prefix = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var _params,
          endpoint,
          _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
              endpoint = "cosmos/auth/v1beta1/bech32";
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
      function bech32Prefix() {
        return _bech32Prefix.apply(this, arguments);
      }
      return bech32Prefix;
    }() /* AddressBytesToString converts Account Address bytes to string */
  }, {
    key: "addressBytesToString",
    value: function () {
      var _addressBytesToString = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              endpoint = "cosmos/auth/v1beta1/bech32/".concat(params.addressBytes);
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
      function addressBytesToString(_x2) {
        return _addressBytesToString.apply(this, arguments);
      }
      return addressBytesToString;
    }() /* AddressStringToBytes converts Address string to bytes */
  }, {
    key: "addressStringToBytes",
    value: function () {
      var _addressStringToBytes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(params) {
        var endpoint;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              endpoint = "cosmos/auth/v1beta1/bech32/".concat(params.addressString);
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
      function addressStringToBytes(_x3) {
        return _addressStringToBytes.apply(this, arguments);
      }
      return addressStringToBytes;
    }()
  }]);
  return LCDQueryClient;
}();
exports.LCDQueryClient = LCDQueryClient;