"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Params = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseParams() {
  return {
    priceSnapshotRetention: _helpers.Long.UZERO,
    sudoCallGasPrice: "",
    beginBlockGasLimit: _helpers.Long.UZERO,
    endBlockGasLimit: _helpers.Long.UZERO,
    defaultGasPerOrder: _helpers.Long.UZERO,
    defaultGasPerCancel: _helpers.Long.UZERO
  };
}
var Params = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.priceSnapshotRetention.isZero()) {
      writer.uint32(8).uint64(message.priceSnapshotRetention);
    }
    if (message.sudoCallGasPrice !== "") {
      writer.uint32(18).string(message.sudoCallGasPrice);
    }
    if (!message.beginBlockGasLimit.isZero()) {
      writer.uint32(24).uint64(message.beginBlockGasLimit);
    }
    if (!message.endBlockGasLimit.isZero()) {
      writer.uint32(32).uint64(message.endBlockGasLimit);
    }
    if (!message.defaultGasPerOrder.isZero()) {
      writer.uint32(40).uint64(message.defaultGasPerOrder);
    }
    if (!message.defaultGasPerCancel.isZero()) {
      writer.uint32(48).uint64(message.defaultGasPerCancel);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseParams();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.priceSnapshotRetention = reader.uint64();
          break;
        case 2:
          message.sudoCallGasPrice = reader.string();
          break;
        case 3:
          message.beginBlockGasLimit = reader.uint64();
          break;
        case 4:
          message.endBlockGasLimit = reader.uint64();
          break;
        case 5:
          message.defaultGasPerOrder = reader.uint64();
          break;
        case 6:
          message.defaultGasPerCancel = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$sudoCallGasPr;
    var message = createBaseParams();
    message.priceSnapshotRetention = object.priceSnapshotRetention !== undefined && object.priceSnapshotRetention !== null ? _helpers.Long.fromValue(object.priceSnapshotRetention) : _helpers.Long.UZERO;
    message.sudoCallGasPrice = (_object$sudoCallGasPr = object.sudoCallGasPrice) !== null && _object$sudoCallGasPr !== void 0 ? _object$sudoCallGasPr : "";
    message.beginBlockGasLimit = object.beginBlockGasLimit !== undefined && object.beginBlockGasLimit !== null ? _helpers.Long.fromValue(object.beginBlockGasLimit) : _helpers.Long.UZERO;
    message.endBlockGasLimit = object.endBlockGasLimit !== undefined && object.endBlockGasLimit !== null ? _helpers.Long.fromValue(object.endBlockGasLimit) : _helpers.Long.UZERO;
    message.defaultGasPerOrder = object.defaultGasPerOrder !== undefined && object.defaultGasPerOrder !== null ? _helpers.Long.fromValue(object.defaultGasPerOrder) : _helpers.Long.UZERO;
    message.defaultGasPerCancel = object.defaultGasPerCancel !== undefined && object.defaultGasPerCancel !== null ? _helpers.Long.fromValue(object.defaultGasPerCancel) : _helpers.Long.UZERO;
    return message;
  }
};
exports.Params = Params;