"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Twap = void 0;
var _pair = require("./pair");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseTwap() {
  return {
    pair: undefined,
    twap: "",
    lookbackSeconds: _helpers.Long.UZERO
  };
}
var Twap = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.pair !== undefined) {
      _pair.Pair.encode(message.pair, writer.uint32(10).fork()).ldelim();
    }
    if (message.twap !== "") {
      writer.uint32(18).string(message.twap);
    }
    if (!message.lookbackSeconds.isZero()) {
      writer.uint32(24).uint64(message.lookbackSeconds);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseTwap();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = _pair.Pair.decode(reader, reader.uint32());
          break;
        case 2:
          message.twap = reader.string();
          break;
        case 3:
          message.lookbackSeconds = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$twap;
    var message = createBaseTwap();
    message.pair = object.pair !== undefined && object.pair !== null ? _pair.Pair.fromPartial(object.pair) : undefined;
    message.twap = (_object$twap = object.twap) !== null && _object$twap !== void 0 ? _object$twap : "";
    message.lookbackSeconds = object.lookbackSeconds !== undefined && object.lookbackSeconds !== null ? _helpers.Long.fromValue(object.lookbackSeconds) : _helpers.Long.UZERO;
    return message;
  }
};
exports.Twap = Twap;