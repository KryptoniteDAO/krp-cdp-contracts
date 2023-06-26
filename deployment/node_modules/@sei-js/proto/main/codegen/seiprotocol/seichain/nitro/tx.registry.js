"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.load = exports.MessageComposer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _tx = require("./tx");
var registry = [["/seiprotocol.seichain.nitro.MsgRecordTransactionData", _tx.MsgRecordTransactionData], ["/seiprotocol.seichain.nitro.MsgSubmitFraudChallenge", _tx.MsgSubmitFraudChallenge]];
exports.registry = registry;
var load = function load(protoRegistry) {
  registry.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      typeUrl = _ref2[0],
      mod = _ref2[1];
    protoRegistry.register(typeUrl, mod);
  });
};
exports.load = load;
var MessageComposer = {
  encoded: {
    recordTransactionData: function recordTransactionData(value) {
      return {
        typeUrl: "/seiprotocol.seichain.nitro.MsgRecordTransactionData",
        value: _tx.MsgRecordTransactionData.encode(value).finish()
      };
    },
    submitFraudChallenge: function submitFraudChallenge(value) {
      return {
        typeUrl: "/seiprotocol.seichain.nitro.MsgSubmitFraudChallenge",
        value: _tx.MsgSubmitFraudChallenge.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    recordTransactionData: function recordTransactionData(value) {
      return {
        typeUrl: "/seiprotocol.seichain.nitro.MsgRecordTransactionData",
        value: value
      };
    },
    submitFraudChallenge: function submitFraudChallenge(value) {
      return {
        typeUrl: "/seiprotocol.seichain.nitro.MsgSubmitFraudChallenge",
        value: value
      };
    }
  },
  fromPartial: {
    recordTransactionData: function recordTransactionData(value) {
      return {
        typeUrl: "/seiprotocol.seichain.nitro.MsgRecordTransactionData",
        value: _tx.MsgRecordTransactionData.fromPartial(value)
      };
    },
    submitFraudChallenge: function submitFraudChallenge(value) {
      return {
        typeUrl: "/seiprotocol.seichain.nitro.MsgSubmitFraudChallenge",
        value: _tx.MsgSubmitFraudChallenge.fromPartial(value)
      };
    }
  }
};
exports.MessageComposer = MessageComposer;