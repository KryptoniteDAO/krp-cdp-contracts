"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgDelegateFeedConsentResponse = exports.MsgDelegateFeedConsent = exports.MsgAggregateExchangeRateVoteResponse = exports.MsgAggregateExchangeRateVote = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseMsgAggregateExchangeRateVote() {
  return {
    exchangeRates: "",
    feeder: "",
    validator: ""
  };
}
var MsgAggregateExchangeRateVote = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.exchangeRates !== "") {
      writer.uint32(18).string(message.exchangeRates);
    }
    if (message.feeder !== "") {
      writer.uint32(26).string(message.feeder);
    }
    if (message.validator !== "") {
      writer.uint32(34).string(message.validator);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgAggregateExchangeRateVote();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.exchangeRates = reader.string();
          break;
        case 3:
          message.feeder = reader.string();
          break;
        case 4:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$exchangeRates, _object$feeder, _object$validator;
    var message = createBaseMsgAggregateExchangeRateVote();
    message.exchangeRates = (_object$exchangeRates = object.exchangeRates) !== null && _object$exchangeRates !== void 0 ? _object$exchangeRates : "";
    message.feeder = (_object$feeder = object.feeder) !== null && _object$feeder !== void 0 ? _object$feeder : "";
    message.validator = (_object$validator = object.validator) !== null && _object$validator !== void 0 ? _object$validator : "";
    return message;
  }
};
exports.MsgAggregateExchangeRateVote = MsgAggregateExchangeRateVote;
function createBaseMsgAggregateExchangeRateVoteResponse() {
  return {};
}
var MsgAggregateExchangeRateVoteResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgAggregateExchangeRateVoteResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseMsgAggregateExchangeRateVoteResponse();
    return message;
  }
};
exports.MsgAggregateExchangeRateVoteResponse = MsgAggregateExchangeRateVoteResponse;
function createBaseMsgDelegateFeedConsent() {
  return {
    operator: "",
    delegate: ""
  };
}
var MsgDelegateFeedConsent = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.operator !== "") {
      writer.uint32(10).string(message.operator);
    }
    if (message.delegate !== "") {
      writer.uint32(18).string(message.delegate);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgDelegateFeedConsent();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operator = reader.string();
          break;
        case 2:
          message.delegate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$operator, _object$delegate;
    var message = createBaseMsgDelegateFeedConsent();
    message.operator = (_object$operator = object.operator) !== null && _object$operator !== void 0 ? _object$operator : "";
    message.delegate = (_object$delegate = object.delegate) !== null && _object$delegate !== void 0 ? _object$delegate : "";
    return message;
  }
};
exports.MsgDelegateFeedConsent = MsgDelegateFeedConsent;
function createBaseMsgDelegateFeedConsentResponse() {
  return {};
}
var MsgDelegateFeedConsentResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgDelegateFeedConsentResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseMsgDelegateFeedConsentResponse();
    return message;
  }
};
exports.MsgDelegateFeedConsentResponse = MsgDelegateFeedConsentResponse;