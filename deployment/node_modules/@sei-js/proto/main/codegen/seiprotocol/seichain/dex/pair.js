"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pair = exports.BatchContractPair = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBasePair() {
  return {
    priceDenom: "",
    assetDenom: "",
    priceTicksize: undefined,
    quantityTicksize: undefined
  };
}
var Pair = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.priceDenom !== "") {
      writer.uint32(10).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(18).string(message.assetDenom);
    }
    if (message.priceTicksize !== undefined) {
      writer.uint32(26).string(message.priceTicksize);
    }
    if (message.quantityTicksize !== undefined) {
      writer.uint32(34).string(message.quantityTicksize);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBasePair();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.priceDenom = reader.string();
          break;
        case 2:
          message.assetDenom = reader.string();
          break;
        case 3:
          message.priceTicksize = reader.string();
          break;
        case 4:
          message.quantityTicksize = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$priceDenom, _object$assetDenom, _object$priceTicksize, _object$quantityTicks;
    var message = createBasePair();
    message.priceDenom = (_object$priceDenom = object.priceDenom) !== null && _object$priceDenom !== void 0 ? _object$priceDenom : "";
    message.assetDenom = (_object$assetDenom = object.assetDenom) !== null && _object$assetDenom !== void 0 ? _object$assetDenom : "";
    message.priceTicksize = (_object$priceTicksize = object.priceTicksize) !== null && _object$priceTicksize !== void 0 ? _object$priceTicksize : undefined;
    message.quantityTicksize = (_object$quantityTicks = object.quantityTicksize) !== null && _object$quantityTicks !== void 0 ? _object$quantityTicks : undefined;
    return message;
  }
};
exports.Pair = Pair;
function createBaseBatchContractPair() {
  return {
    contractAddr: "",
    pairs: []
  };
}
var BatchContractPair = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    var _iterator = _createForOfIteratorHelper(message.pairs),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        Pair.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseBatchContractPair();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
          message.pairs.push(Pair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr, _object$pairs;
    var message = createBaseBatchContractPair();
    message.contractAddr = (_object$contractAddr = object.contractAddr) !== null && _object$contractAddr !== void 0 ? _object$contractAddr : "";
    message.pairs = ((_object$pairs = object.pairs) === null || _object$pairs === void 0 ? void 0 : _object$pairs.map(function (e) {
      return Pair.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.BatchContractPair = BatchContractPair;