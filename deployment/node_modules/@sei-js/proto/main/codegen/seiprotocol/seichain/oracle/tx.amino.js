"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AminoConverter = void 0;
var AminoConverter = {
  "/seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote": {
    aminoType: "/seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote",
    toAmino: function toAmino(_ref) {
      var exchangeRates = _ref.exchangeRates,
        feeder = _ref.feeder,
        validator = _ref.validator;
      return {
        exchange_rates: exchangeRates,
        feeder: feeder,
        validator: validator
      };
    },
    fromAmino: function fromAmino(_ref2) {
      var exchange_rates = _ref2.exchange_rates,
        feeder = _ref2.feeder,
        validator = _ref2.validator;
      return {
        exchangeRates: exchange_rates,
        feeder: feeder,
        validator: validator
      };
    }
  },
  "/seiprotocol.seichain.oracle.MsgDelegateFeedConsent": {
    aminoType: "/seiprotocol.seichain.oracle.MsgDelegateFeedConsent",
    toAmino: function toAmino(_ref3) {
      var operator = _ref3.operator,
        delegate = _ref3.delegate;
      return {
        operator: operator,
        delegate: delegate
      };
    },
    fromAmino: function fromAmino(_ref4) {
      var operator = _ref4.operator,
        delegate = _ref4.delegate;
      return {
        operator: operator,
        delegate: delegate
      };
    }
  }
};
exports.AminoConverter = AminoConverter;