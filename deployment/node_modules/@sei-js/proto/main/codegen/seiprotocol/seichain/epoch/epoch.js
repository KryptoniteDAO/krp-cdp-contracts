"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Epoch = void 0;
var _timestamp = require("../../../google/protobuf/timestamp");
var _duration = require("../../../google/protobuf/duration");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseEpoch() {
  return {
    genesisTime: undefined,
    epochDuration: undefined,
    currentEpoch: _helpers.Long.UZERO,
    currentEpochStartTime: undefined,
    currentEpochHeight: _helpers.Long.ZERO
  };
}
var Epoch = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.genesisTime !== undefined) {
      _timestamp.Timestamp.encode((0, _helpers.toTimestamp)(message.genesisTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.epochDuration !== undefined) {
      _duration.Duration.encode(message.epochDuration, writer.uint32(18).fork()).ldelim();
    }
    if (!message.currentEpoch.isZero()) {
      writer.uint32(24).uint64(message.currentEpoch);
    }
    if (message.currentEpochStartTime !== undefined) {
      _timestamp.Timestamp.encode((0, _helpers.toTimestamp)(message.currentEpochStartTime), writer.uint32(34).fork()).ldelim();
    }
    if (!message.currentEpochHeight.isZero()) {
      writer.uint32(40).int64(message.currentEpochHeight);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseEpoch();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.genesisTime = (0, _helpers.fromTimestamp)(_timestamp.Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.epochDuration = _duration.Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.currentEpoch = reader.uint64();
          break;
        case 4:
          message.currentEpochStartTime = (0, _helpers.fromTimestamp)(_timestamp.Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.currentEpochHeight = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$genesisTime, _object$epochDuration, _object$currentEpochS;
    var message = createBaseEpoch();
    message.genesisTime = (_object$genesisTime = object.genesisTime) !== null && _object$genesisTime !== void 0 ? _object$genesisTime : undefined;
    message.epochDuration = (_object$epochDuration = object.epochDuration) !== null && _object$epochDuration !== void 0 ? _object$epochDuration : undefined;
    message.currentEpoch = object.currentEpoch !== undefined && object.currentEpoch !== null ? _helpers.Long.fromValue(object.currentEpoch) : _helpers.Long.UZERO;
    message.currentEpochStartTime = (_object$currentEpochS = object.currentEpochStartTime) !== null && _object$currentEpochS !== void 0 ? _object$currentEpochS : undefined;
    message.currentEpochHeight = object.currentEpochHeight !== undefined && object.currentEpochHeight !== null ? _helpers.Long.fromValue(object.currentEpochHeight) : _helpers.Long.ZERO;
    return message;
  }
};
exports.Epoch = Epoch;