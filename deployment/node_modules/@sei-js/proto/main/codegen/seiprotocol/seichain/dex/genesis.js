"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenesisState = exports.ContractState = exports.ContractPairPrices = void 0;
var _params = require("./params");
var _contract = require("./contract");
var _long_book = require("./long_book");
var _short_book = require("./short_book");
var _order = require("./order");
var _pair = require("./pair");
var _price = require("./price");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseGenesisState() {
  return {
    params: undefined,
    contractState: [],
    lastEpoch: _helpers.Long.UZERO
  };
}
var GenesisState = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.params !== undefined) {
      _params.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    var _iterator = _createForOfIteratorHelper(message.contractState),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        ContractState.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (!message.lastEpoch.isZero()) {
      writer.uint32(24).uint64(message.lastEpoch);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseGenesisState();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = _params.Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.contractState.push(ContractState.decode(reader, reader.uint32()));
          break;
        case 3:
          message.lastEpoch = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractState;
    var message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? _params.Params.fromPartial(object.params) : undefined;
    message.contractState = ((_object$contractState = object.contractState) === null || _object$contractState === void 0 ? void 0 : _object$contractState.map(function (e) {
      return ContractState.fromPartial(e);
    })) || [];
    message.lastEpoch = object.lastEpoch !== undefined && object.lastEpoch !== null ? _helpers.Long.fromValue(object.lastEpoch) : _helpers.Long.UZERO;
    return message;
  }
};
exports.GenesisState = GenesisState;
function createBaseContractState() {
  return {
    contractInfo: undefined,
    longBookList: [],
    shortBookList: [],
    triggeredOrdersList: [],
    pairList: [],
    priceList: []
  };
}
var ContractState = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractInfo !== undefined) {
      _contract.ContractInfoV2.encode(message.contractInfo, writer.uint32(10).fork()).ldelim();
    }
    var _iterator2 = _createForOfIteratorHelper(message.longBookList),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        _long_book.LongBook.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var _iterator3 = _createForOfIteratorHelper(message.shortBookList),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _v = _step3.value;
        _short_book.ShortBook.encode(_v, writer.uint32(26).fork()).ldelim();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var _iterator4 = _createForOfIteratorHelper(message.triggeredOrdersList),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _v2 = _step4.value;
        _order.Order.encode(_v2, writer.uint32(34).fork()).ldelim();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var _iterator5 = _createForOfIteratorHelper(message.pairList),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _v3 = _step5.value;
        _pair.Pair.encode(_v3, writer.uint32(42).fork()).ldelim();
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var _iterator6 = _createForOfIteratorHelper(message.priceList),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _v4 = _step6.value;
        ContractPairPrices.encode(_v4, writer.uint32(50).fork()).ldelim();
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseContractState();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractInfo = _contract.ContractInfoV2.decode(reader, reader.uint32());
          break;
        case 2:
          message.longBookList.push(_long_book.LongBook.decode(reader, reader.uint32()));
          break;
        case 3:
          message.shortBookList.push(_short_book.ShortBook.decode(reader, reader.uint32()));
          break;
        case 4:
          message.triggeredOrdersList.push(_order.Order.decode(reader, reader.uint32()));
          break;
        case 5:
          message.pairList.push(_pair.Pair.decode(reader, reader.uint32()));
          break;
        case 6:
          message.priceList.push(ContractPairPrices.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$longBookList, _object$shortBookList, _object$triggeredOrde, _object$pairList, _object$priceList;
    var message = createBaseContractState();
    message.contractInfo = object.contractInfo !== undefined && object.contractInfo !== null ? _contract.ContractInfoV2.fromPartial(object.contractInfo) : undefined;
    message.longBookList = ((_object$longBookList = object.longBookList) === null || _object$longBookList === void 0 ? void 0 : _object$longBookList.map(function (e) {
      return _long_book.LongBook.fromPartial(e);
    })) || [];
    message.shortBookList = ((_object$shortBookList = object.shortBookList) === null || _object$shortBookList === void 0 ? void 0 : _object$shortBookList.map(function (e) {
      return _short_book.ShortBook.fromPartial(e);
    })) || [];
    message.triggeredOrdersList = ((_object$triggeredOrde = object.triggeredOrdersList) === null || _object$triggeredOrde === void 0 ? void 0 : _object$triggeredOrde.map(function (e) {
      return _order.Order.fromPartial(e);
    })) || [];
    message.pairList = ((_object$pairList = object.pairList) === null || _object$pairList === void 0 ? void 0 : _object$pairList.map(function (e) {
      return _pair.Pair.fromPartial(e);
    })) || [];
    message.priceList = ((_object$priceList = object.priceList) === null || _object$priceList === void 0 ? void 0 : _object$priceList.map(function (e) {
      return ContractPairPrices.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.ContractState = ContractState;
function createBaseContractPairPrices() {
  return {
    pricePair: undefined,
    prices: []
  };
}
var ContractPairPrices = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.pricePair !== undefined) {
      _pair.Pair.encode(message.pricePair, writer.uint32(10).fork()).ldelim();
    }
    var _iterator7 = _createForOfIteratorHelper(message.prices),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var v = _step7.value;
        _price.Price.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseContractPairPrices();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pricePair = _pair.Pair.decode(reader, reader.uint32());
          break;
        case 2:
          message.prices.push(_price.Price.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$prices;
    var message = createBaseContractPairPrices();
    message.pricePair = object.pricePair !== undefined && object.pricePair !== null ? _pair.Pair.fromPartial(object.pricePair) : undefined;
    message.prices = ((_object$prices = object.prices) === null || _object$prices === void 0 ? void 0 : _object$prices.map(function (e) {
      return _price.Price.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.ContractPairPrices = ContractPairPrices;