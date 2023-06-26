"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.load = exports.MessageComposer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _tx = require("./tx");
var registry = [["/seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote", _tx.MsgAggregateExchangeRateVote], ["/seiprotocol.seichain.oracle.MsgDelegateFeedConsent", _tx.MsgDelegateFeedConsent]];
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
    aggregateExchangeRateVote: function aggregateExchangeRateVote(value) {
      return {
        typeUrl: "/seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote",
        value: _tx.MsgAggregateExchangeRateVote.encode(value).finish()
      };
    },
    delegateFeedConsent: function delegateFeedConsent(value) {
      return {
        typeUrl: "/seiprotocol.seichain.oracle.MsgDelegateFeedConsent",
        value: _tx.MsgDelegateFeedConsent.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    aggregateExchangeRateVote: function aggregateExchangeRateVote(value) {
      return {
        typeUrl: "/seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote",
        value: value
      };
    },
    delegateFeedConsent: function delegateFeedConsent(value) {
      return {
        typeUrl: "/seiprotocol.seichain.oracle.MsgDelegateFeedConsent",
        value: value
      };
    }
  },
  fromPartial: {
    aggregateExchangeRateVote: function aggregateExchangeRateVote(value) {
      return {
        typeUrl: "/seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote",
        value: _tx.MsgAggregateExchangeRateVote.fromPartial(value)
      };
    },
    delegateFeedConsent: function delegateFeedConsent(value) {
      return {
        typeUrl: "/seiprotocol.seichain.oracle.MsgDelegateFeedConsent",
        value: _tx.MsgDelegateFeedConsent.fromPartial(value)
      };
    }
  }
};
exports.MessageComposer = MessageComposer;