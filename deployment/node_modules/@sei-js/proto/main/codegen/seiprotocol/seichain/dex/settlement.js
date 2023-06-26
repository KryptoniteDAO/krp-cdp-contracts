"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settlements = exports.SettlementEntry = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseSettlementEntry() {
  return {
    account: "",
    priceDenom: "",
    assetDenom: "",
    quantity: "",
    executionCostOrProceed: "",
    expectedCostOrProceed: "",
    positionDirection: "",
    orderType: "",
    orderId: _helpers.Long.UZERO,
    timestamp: _helpers.Long.UZERO,
    height: _helpers.Long.UZERO,
    settlementId: _helpers.Long.UZERO
  };
}
var SettlementEntry = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.priceDenom !== "") {
      writer.uint32(18).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(26).string(message.assetDenom);
    }
    if (message.quantity !== "") {
      writer.uint32(34).string(message.quantity);
    }
    if (message.executionCostOrProceed !== "") {
      writer.uint32(42).string(message.executionCostOrProceed);
    }
    if (message.expectedCostOrProceed !== "") {
      writer.uint32(50).string(message.expectedCostOrProceed);
    }
    if (message.positionDirection !== "") {
      writer.uint32(58).string(message.positionDirection);
    }
    if (message.orderType !== "") {
      writer.uint32(66).string(message.orderType);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(72).uint64(message.orderId);
    }
    if (!message.timestamp.isZero()) {
      writer.uint32(80).uint64(message.timestamp);
    }
    if (!message.height.isZero()) {
      writer.uint32(88).uint64(message.height);
    }
    if (!message.settlementId.isZero()) {
      writer.uint32(96).uint64(message.settlementId);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseSettlementEntry();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.priceDenom = reader.string();
          break;
        case 3:
          message.assetDenom = reader.string();
          break;
        case 4:
          message.quantity = reader.string();
          break;
        case 5:
          message.executionCostOrProceed = reader.string();
          break;
        case 6:
          message.expectedCostOrProceed = reader.string();
          break;
        case 7:
          message.positionDirection = reader.string();
          break;
        case 8:
          message.orderType = reader.string();
          break;
        case 9:
          message.orderId = reader.uint64();
          break;
        case 10:
          message.timestamp = reader.uint64();
          break;
        case 11:
          message.height = reader.uint64();
          break;
        case 12:
          message.settlementId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$account, _object$priceDenom, _object$assetDenom, _object$quantity, _object$executionCost, _object$expectedCostO, _object$positionDirec, _object$orderType;
    var message = createBaseSettlementEntry();
    message.account = (_object$account = object.account) !== null && _object$account !== void 0 ? _object$account : "";
    message.priceDenom = (_object$priceDenom = object.priceDenom) !== null && _object$priceDenom !== void 0 ? _object$priceDenom : "";
    message.assetDenom = (_object$assetDenom = object.assetDenom) !== null && _object$assetDenom !== void 0 ? _object$assetDenom : "";
    message.quantity = (_object$quantity = object.quantity) !== null && _object$quantity !== void 0 ? _object$quantity : "";
    message.executionCostOrProceed = (_object$executionCost = object.executionCostOrProceed) !== null && _object$executionCost !== void 0 ? _object$executionCost : "";
    message.expectedCostOrProceed = (_object$expectedCostO = object.expectedCostOrProceed) !== null && _object$expectedCostO !== void 0 ? _object$expectedCostO : "";
    message.positionDirection = (_object$positionDirec = object.positionDirection) !== null && _object$positionDirec !== void 0 ? _object$positionDirec : "";
    message.orderType = (_object$orderType = object.orderType) !== null && _object$orderType !== void 0 ? _object$orderType : "";
    message.orderId = object.orderId !== undefined && object.orderId !== null ? _helpers.Long.fromValue(object.orderId) : _helpers.Long.UZERO;
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? _helpers.Long.fromValue(object.timestamp) : _helpers.Long.UZERO;
    message.height = object.height !== undefined && object.height !== null ? _helpers.Long.fromValue(object.height) : _helpers.Long.UZERO;
    message.settlementId = object.settlementId !== undefined && object.settlementId !== null ? _helpers.Long.fromValue(object.settlementId) : _helpers.Long.UZERO;
    return message;
  }
};
exports.SettlementEntry = SettlementEntry;
function createBaseSettlements() {
  return {
    epoch: _helpers.Long.ZERO,
    entries: []
  };
}
var Settlements = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.epoch.isZero()) {
      writer.uint32(8).int64(message.epoch);
    }
    var _iterator = _createForOfIteratorHelper(message.entries),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        SettlementEntry.encode(v, writer.uint32(18).fork()).ldelim();
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
    var message = createBaseSettlements();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epoch = reader.int64();
          break;
        case 2:
          message.entries.push(SettlementEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$entries;
    var message = createBaseSettlements();
    message.epoch = object.epoch !== undefined && object.epoch !== null ? _helpers.Long.fromValue(object.epoch) : _helpers.Long.ZERO;
    message.entries = ((_object$entries = object.entries) === null || _object$entries === void 0 ? void 0 : _object$entries.map(function (e) {
      return SettlementEntry.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.Settlements = Settlements;