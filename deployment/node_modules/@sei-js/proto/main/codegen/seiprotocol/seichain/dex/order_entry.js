"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderEntry = exports.Allocation = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseOrderEntry() {
  return {
    price: "",
    quantity: "",
    allocations: [],
    priceDenom: "",
    assetDenom: ""
  };
}
var OrderEntry = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    if (message.quantity !== "") {
      writer.uint32(18).string(message.quantity);
    }
    var _iterator = _createForOfIteratorHelper(message.allocations),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        Allocation.encode(v, writer.uint32(26).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (message.priceDenom !== "") {
      writer.uint32(34).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(42).string(message.assetDenom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseOrderEntry();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        case 2:
          message.quantity = reader.string();
          break;
        case 3:
          message.allocations.push(Allocation.decode(reader, reader.uint32()));
          break;
        case 4:
          message.priceDenom = reader.string();
          break;
        case 5:
          message.assetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$price, _object$quantity, _object$allocations, _object$priceDenom, _object$assetDenom;
    var message = createBaseOrderEntry();
    message.price = (_object$price = object.price) !== null && _object$price !== void 0 ? _object$price : "";
    message.quantity = (_object$quantity = object.quantity) !== null && _object$quantity !== void 0 ? _object$quantity : "";
    message.allocations = ((_object$allocations = object.allocations) === null || _object$allocations === void 0 ? void 0 : _object$allocations.map(function (e) {
      return Allocation.fromPartial(e);
    })) || [];
    message.priceDenom = (_object$priceDenom = object.priceDenom) !== null && _object$priceDenom !== void 0 ? _object$priceDenom : "";
    message.assetDenom = (_object$assetDenom = object.assetDenom) !== null && _object$assetDenom !== void 0 ? _object$assetDenom : "";
    return message;
  }
};
exports.OrderEntry = OrderEntry;
function createBaseAllocation() {
  return {
    orderId: _helpers.Long.UZERO,
    quantity: "",
    account: ""
  };
}
var Allocation = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.orderId.isZero()) {
      writer.uint32(8).uint64(message.orderId);
    }
    if (message.quantity !== "") {
      writer.uint32(18).string(message.quantity);
    }
    if (message.account !== "") {
      writer.uint32(26).string(message.account);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseAllocation();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        case 2:
          message.quantity = reader.string();
          break;
        case 3:
          message.account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$quantity2, _object$account;
    var message = createBaseAllocation();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? _helpers.Long.fromValue(object.orderId) : _helpers.Long.UZERO;
    message.quantity = (_object$quantity2 = object.quantity) !== null && _object$quantity2 !== void 0 ? _object$quantity2 : "";
    message.account = (_object$account = object.account) !== null && _object$account !== void 0 ? _object$account : "";
    return message;
  }
};
exports.Allocation = Allocation;