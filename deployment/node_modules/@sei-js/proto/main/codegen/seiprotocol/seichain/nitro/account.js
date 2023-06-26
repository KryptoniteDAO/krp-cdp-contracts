"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseAccount() {
  return {
    pubkey: "",
    owner: "",
    lamports: _helpers.Long.UZERO,
    slot: _helpers.Long.UZERO,
    executable: false,
    rentEpoch: _helpers.Long.UZERO,
    data: ""
  };
}
var Account = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.pubkey !== "") {
      writer.uint32(10).string(message.pubkey);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (!message.lamports.isZero()) {
      writer.uint32(24).uint64(message.lamports);
    }
    if (!message.slot.isZero()) {
      writer.uint32(32).uint64(message.slot);
    }
    if (message.executable === true) {
      writer.uint32(40).bool(message.executable);
    }
    if (!message.rentEpoch.isZero()) {
      writer.uint32(48).uint64(message.rentEpoch);
    }
    if (message.data !== "") {
      writer.uint32(58).string(message.data);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseAccount();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubkey = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.lamports = reader.uint64();
          break;
        case 4:
          message.slot = reader.uint64();
          break;
        case 5:
          message.executable = reader.bool();
          break;
        case 6:
          message.rentEpoch = reader.uint64();
          break;
        case 7:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$pubkey, _object$owner, _object$executable, _object$data;
    var message = createBaseAccount();
    message.pubkey = (_object$pubkey = object.pubkey) !== null && _object$pubkey !== void 0 ? _object$pubkey : "";
    message.owner = (_object$owner = object.owner) !== null && _object$owner !== void 0 ? _object$owner : "";
    message.lamports = object.lamports !== undefined && object.lamports !== null ? _helpers.Long.fromValue(object.lamports) : _helpers.Long.UZERO;
    message.slot = object.slot !== undefined && object.slot !== null ? _helpers.Long.fromValue(object.slot) : _helpers.Long.UZERO;
    message.executable = (_object$executable = object.executable) !== null && _object$executable !== void 0 ? _object$executable : false;
    message.rentEpoch = object.rentEpoch !== undefined && object.rentEpoch !== null ? _helpers.Long.fromValue(object.rentEpoch) : _helpers.Long.UZERO;
    message.data = (_object$data = object.data) !== null && _object$data !== void 0 ? _object$data : "";
    return message;
  }
};
exports.Account = Account;