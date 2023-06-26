"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriceCandlestick = exports.Price = void 0;
var _pair = require("./pair");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBasePrice() {
  return {
    snapshotTimestampInSeconds: _helpers.Long.UZERO,
    price: "",
    pair: undefined
  };
}
var Price = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.snapshotTimestampInSeconds.isZero()) {
      writer.uint32(8).uint64(message.snapshotTimestampInSeconds);
    }
    if (message.price !== "") {
      writer.uint32(18).string(message.price);
    }
    if (message.pair !== undefined) {
      _pair.Pair.encode(message.pair, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBasePrice();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshotTimestampInSeconds = reader.uint64();
          break;
        case 2:
          message.price = reader.string();
          break;
        case 3:
          message.pair = _pair.Pair.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$price;
    var message = createBasePrice();
    message.snapshotTimestampInSeconds = object.snapshotTimestampInSeconds !== undefined && object.snapshotTimestampInSeconds !== null ? _helpers.Long.fromValue(object.snapshotTimestampInSeconds) : _helpers.Long.UZERO;
    message.price = (_object$price = object.price) !== null && _object$price !== void 0 ? _object$price : "";
    message.pair = object.pair !== undefined && object.pair !== null ? _pair.Pair.fromPartial(object.pair) : undefined;
    return message;
  }
};
exports.Price = Price;
function createBasePriceCandlestick() {
  return {
    beginTimestamp: _helpers.Long.UZERO,
    endTimestamp: _helpers.Long.UZERO,
    open: "",
    high: "",
    low: "",
    close: "",
    volume: ""
  };
}
var PriceCandlestick = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.beginTimestamp.isZero()) {
      writer.uint32(8).uint64(message.beginTimestamp);
    }
    if (!message.endTimestamp.isZero()) {
      writer.uint32(16).uint64(message.endTimestamp);
    }
    if (message.open !== "") {
      writer.uint32(26).string(message.open);
    }
    if (message.high !== "") {
      writer.uint32(34).string(message.high);
    }
    if (message.low !== "") {
      writer.uint32(42).string(message.low);
    }
    if (message.close !== "") {
      writer.uint32(50).string(message.close);
    }
    if (message.volume !== "") {
      writer.uint32(58).string(message.volume);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBasePriceCandlestick();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.beginTimestamp = reader.uint64();
          break;
        case 2:
          message.endTimestamp = reader.uint64();
          break;
        case 3:
          message.open = reader.string();
          break;
        case 4:
          message.high = reader.string();
          break;
        case 5:
          message.low = reader.string();
          break;
        case 6:
          message.close = reader.string();
          break;
        case 7:
          message.volume = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$open, _object$high, _object$low, _object$close, _object$volume;
    var message = createBasePriceCandlestick();
    message.beginTimestamp = object.beginTimestamp !== undefined && object.beginTimestamp !== null ? _helpers.Long.fromValue(object.beginTimestamp) : _helpers.Long.UZERO;
    message.endTimestamp = object.endTimestamp !== undefined && object.endTimestamp !== null ? _helpers.Long.fromValue(object.endTimestamp) : _helpers.Long.UZERO;
    message.open = (_object$open = object.open) !== null && _object$open !== void 0 ? _object$open : "";
    message.high = (_object$high = object.high) !== null && _object$high !== void 0 ? _object$high : "";
    message.low = (_object$low = object.low) !== null && _object$low !== void 0 ? _object$low : "";
    message.close = (_object$close = object.close) !== null && _object$close !== void 0 ? _object$close : "";
    message.volume = (_object$volume = object.volume) !== null && _object$volume !== void 0 ? _object$volume : "";
    return message;
  }
};
exports.PriceCandlestick = PriceCandlestick;