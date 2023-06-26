"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetMetadata = exports.AssetIBCInfo = void 0;
var _bank = require("../../../cosmos/bank/v1beta1/bank");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseAssetIBCInfo() {
  return {
    sourceChannel: "",
    dstChannel: "",
    sourceDenom: "",
    sourceChainID: ""
  };
}
var AssetIBCInfo = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.sourceChannel !== "") {
      writer.uint32(10).string(message.sourceChannel);
    }
    if (message.dstChannel !== "") {
      writer.uint32(18).string(message.dstChannel);
    }
    if (message.sourceDenom !== "") {
      writer.uint32(26).string(message.sourceDenom);
    }
    if (message.sourceChainID !== "") {
      writer.uint32(34).string(message.sourceChainID);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseAssetIBCInfo();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sourceChannel = reader.string();
          break;
        case 2:
          message.dstChannel = reader.string();
          break;
        case 3:
          message.sourceDenom = reader.string();
          break;
        case 4:
          message.sourceChainID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$sourceChannel, _object$dstChannel, _object$sourceDenom, _object$sourceChainID;
    var message = createBaseAssetIBCInfo();
    message.sourceChannel = (_object$sourceChannel = object.sourceChannel) !== null && _object$sourceChannel !== void 0 ? _object$sourceChannel : "";
    message.dstChannel = (_object$dstChannel = object.dstChannel) !== null && _object$dstChannel !== void 0 ? _object$dstChannel : "";
    message.sourceDenom = (_object$sourceDenom = object.sourceDenom) !== null && _object$sourceDenom !== void 0 ? _object$sourceDenom : "";
    message.sourceChainID = (_object$sourceChainID = object.sourceChainID) !== null && _object$sourceChainID !== void 0 ? _object$sourceChainID : "";
    return message;
  }
};
exports.AssetIBCInfo = AssetIBCInfo;
function createBaseAssetMetadata() {
  return {
    ibcInfo: undefined,
    typeAsset: "",
    metadata: undefined
  };
}
var AssetMetadata = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.ibcInfo !== undefined) {
      AssetIBCInfo.encode(message.ibcInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.typeAsset !== "") {
      writer.uint32(18).string(message.typeAsset);
    }
    if (message.metadata !== undefined) {
      _bank.Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseAssetMetadata();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ibcInfo = AssetIBCInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.typeAsset = reader.string();
          break;
        case 3:
          message.metadata = _bank.Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$typeAsset;
    var message = createBaseAssetMetadata();
    message.ibcInfo = object.ibcInfo !== undefined && object.ibcInfo !== null ? AssetIBCInfo.fromPartial(object.ibcInfo) : undefined;
    message.typeAsset = (_object$typeAsset = object.typeAsset) !== null && _object$typeAsset !== void 0 ? _object$typeAsset : "";
    message.metadata = object.metadata !== undefined && object.metadata !== null ? _bank.Metadata.fromPartial(object.metadata) : undefined;
    return message;
  }
};
exports.AssetMetadata = AssetMetadata;