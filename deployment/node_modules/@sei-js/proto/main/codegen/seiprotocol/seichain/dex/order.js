"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Order = exports.Cancellation = exports.ActiveOrders = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseOrder() {
  return {
    id: undefined,
    status: undefined,
    account: undefined,
    contractAddr: undefined,
    price: "",
    quantity: "",
    priceDenom: "",
    assetDenom: "",
    orderType: 0,
    positionDirection: 0,
    data: "",
    statusDescription: "",
    nominal: "",
    triggerPrice: "",
    triggerStatus: false
  };
}
var Order = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.id !== undefined) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.status !== undefined) {
      writer.uint32(16).int32(message.status);
    }
    if (message.account !== undefined) {
      writer.uint32(26).string(message.account);
    }
    if (message.contractAddr !== undefined) {
      writer.uint32(34).string(message.contractAddr);
    }
    if (message.price !== "") {
      writer.uint32(42).string(message.price);
    }
    if (message.quantity !== "") {
      writer.uint32(50).string(message.quantity);
    }
    if (message.priceDenom !== "") {
      writer.uint32(58).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(66).string(message.assetDenom);
    }
    if (message.orderType !== 0) {
      writer.uint32(72).int32(message.orderType);
    }
    if (message.positionDirection !== 0) {
      writer.uint32(80).int32(message.positionDirection);
    }
    if (message.data !== "") {
      writer.uint32(90).string(message.data);
    }
    if (message.statusDescription !== "") {
      writer.uint32(98).string(message.statusDescription);
    }
    if (message.nominal !== "") {
      writer.uint32(106).string(message.nominal);
    }
    if (message.triggerPrice !== "") {
      writer.uint32(114).string(message.triggerPrice);
    }
    if (message.triggerStatus === true) {
      writer.uint32(120).bool(message.triggerStatus);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseOrder();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.status = reader.int32();
          break;
        case 3:
          message.account = reader.string();
          break;
        case 4:
          message.contractAddr = reader.string();
          break;
        case 5:
          message.price = reader.string();
          break;
        case 6:
          message.quantity = reader.string();
          break;
        case 7:
          message.priceDenom = reader.string();
          break;
        case 8:
          message.assetDenom = reader.string();
          break;
        case 9:
          message.orderType = reader.int32();
          break;
        case 10:
          message.positionDirection = reader.int32();
          break;
        case 11:
          message.data = reader.string();
          break;
        case 12:
          message.statusDescription = reader.string();
          break;
        case 13:
          message.nominal = reader.string();
          break;
        case 14:
          message.triggerPrice = reader.string();
          break;
        case 15:
          message.triggerStatus = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$status, _object$account, _object$contractAddr, _object$price, _object$quantity, _object$priceDenom, _object$assetDenom, _object$orderType, _object$positionDirec, _object$data, _object$statusDescrip, _object$nominal, _object$triggerPrice, _object$triggerStatus;
    var message = createBaseOrder();
    message.id = object.id !== undefined && object.id !== null ? _helpers.Long.fromValue(object.id) : undefined;
    message.status = (_object$status = object.status) !== null && _object$status !== void 0 ? _object$status : undefined;
    message.account = (_object$account = object.account) !== null && _object$account !== void 0 ? _object$account : undefined;
    message.contractAddr = (_object$contractAddr = object.contractAddr) !== null && _object$contractAddr !== void 0 ? _object$contractAddr : undefined;
    message.price = (_object$price = object.price) !== null && _object$price !== void 0 ? _object$price : "";
    message.quantity = (_object$quantity = object.quantity) !== null && _object$quantity !== void 0 ? _object$quantity : "";
    message.priceDenom = (_object$priceDenom = object.priceDenom) !== null && _object$priceDenom !== void 0 ? _object$priceDenom : "";
    message.assetDenom = (_object$assetDenom = object.assetDenom) !== null && _object$assetDenom !== void 0 ? _object$assetDenom : "";
    message.orderType = (_object$orderType = object.orderType) !== null && _object$orderType !== void 0 ? _object$orderType : 0;
    message.positionDirection = (_object$positionDirec = object.positionDirection) !== null && _object$positionDirec !== void 0 ? _object$positionDirec : 0;
    message.data = (_object$data = object.data) !== null && _object$data !== void 0 ? _object$data : "";
    message.statusDescription = (_object$statusDescrip = object.statusDescription) !== null && _object$statusDescrip !== void 0 ? _object$statusDescrip : "";
    message.nominal = (_object$nominal = object.nominal) !== null && _object$nominal !== void 0 ? _object$nominal : "";
    message.triggerPrice = (_object$triggerPrice = object.triggerPrice) !== null && _object$triggerPrice !== void 0 ? _object$triggerPrice : "";
    message.triggerStatus = (_object$triggerStatus = object.triggerStatus) !== null && _object$triggerStatus !== void 0 ? _object$triggerStatus : false;
    return message;
  }
};
exports.Order = Order;
function createBaseCancellation() {
  return {
    id: _helpers.Long.UZERO,
    initiator: 0,
    creator: undefined,
    contractAddr: "",
    priceDenom: "",
    assetDenom: "",
    positionDirection: 0,
    price: ""
  };
}
var Cancellation = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.initiator !== 0) {
      writer.uint32(16).int32(message.initiator);
    }
    if (message.creator !== undefined) {
      writer.uint32(26).string(message.creator);
    }
    if (message.contractAddr !== "") {
      writer.uint32(34).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(42).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(50).string(message.assetDenom);
    }
    if (message.positionDirection !== 0) {
      writer.uint32(56).int32(message.positionDirection);
    }
    if (message.price !== "") {
      writer.uint32(66).string(message.price);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseCancellation();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.initiator = reader.int32();
          break;
        case 3:
          message.creator = reader.string();
          break;
        case 4:
          message.contractAddr = reader.string();
          break;
        case 5:
          message.priceDenom = reader.string();
          break;
        case 6:
          message.assetDenom = reader.string();
          break;
        case 7:
          message.positionDirection = reader.int32();
          break;
        case 8:
          message.price = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$initiator, _object$creator, _object$contractAddr2, _object$priceDenom2, _object$assetDenom2, _object$positionDirec2, _object$price2;
    var message = createBaseCancellation();
    message.id = object.id !== undefined && object.id !== null ? _helpers.Long.fromValue(object.id) : _helpers.Long.UZERO;
    message.initiator = (_object$initiator = object.initiator) !== null && _object$initiator !== void 0 ? _object$initiator : 0;
    message.creator = (_object$creator = object.creator) !== null && _object$creator !== void 0 ? _object$creator : undefined;
    message.contractAddr = (_object$contractAddr2 = object.contractAddr) !== null && _object$contractAddr2 !== void 0 ? _object$contractAddr2 : "";
    message.priceDenom = (_object$priceDenom2 = object.priceDenom) !== null && _object$priceDenom2 !== void 0 ? _object$priceDenom2 : "";
    message.assetDenom = (_object$assetDenom2 = object.assetDenom) !== null && _object$assetDenom2 !== void 0 ? _object$assetDenom2 : "";
    message.positionDirection = (_object$positionDirec2 = object.positionDirection) !== null && _object$positionDirec2 !== void 0 ? _object$positionDirec2 : 0;
    message.price = (_object$price2 = object.price) !== null && _object$price2 !== void 0 ? _object$price2 : "";
    return message;
  }
};
exports.Cancellation = Cancellation;
function createBaseActiveOrders() {
  return {
    ids: []
  };
}
var ActiveOrders = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    writer.uint32(10).fork();
    var _iterator = _createForOfIteratorHelper(message.ids),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        writer.uint64(v);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    writer.ldelim();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseActiveOrders();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(reader.uint64());
            }
          } else {
            message.ids.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$ids;
    var message = createBaseActiveOrders();
    message.ids = ((_object$ids = object.ids) === null || _object$ids === void 0 ? void 0 : _object$ids.map(function (e) {
      return _helpers.Long.fromValue(e);
    })) || [];
    return message;
  }
};
exports.ActiveOrders = ActiveOrders;