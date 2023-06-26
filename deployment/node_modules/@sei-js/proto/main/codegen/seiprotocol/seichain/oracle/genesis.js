"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PenaltyCounter = exports.GenesisState = exports.FeederDelegation = void 0;
var _oracle = require("./oracle");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseGenesisState() {
  return {
    params: undefined,
    feederDelegations: [],
    exchangeRates: [],
    penaltyCounters: [],
    aggregateExchangeRateVotes: [],
    priceSnapshots: []
  };
}
var GenesisState = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.params !== undefined) {
      _oracle.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    var _iterator = _createForOfIteratorHelper(message.feederDelegations),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        FeederDelegation.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(message.exchangeRates),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _v = _step2.value;
        _oracle.ExchangeRateTuple.encode(_v, writer.uint32(26).fork()).ldelim();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var _iterator3 = _createForOfIteratorHelper(message.penaltyCounters),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _v2 = _step3.value;
        PenaltyCounter.encode(_v2, writer.uint32(34).fork()).ldelim();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var _iterator4 = _createForOfIteratorHelper(message.aggregateExchangeRateVotes),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _v3 = _step4.value;
        _oracle.AggregateExchangeRateVote.encode(_v3, writer.uint32(50).fork()).ldelim();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var _iterator5 = _createForOfIteratorHelper(message.priceSnapshots),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _v4 = _step5.value;
        _oracle.PriceSnapshot.encode(_v4, writer.uint32(58).fork()).ldelim();
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
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
          message.params = _oracle.Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.feederDelegations.push(FeederDelegation.decode(reader, reader.uint32()));
          break;
        case 3:
          message.exchangeRates.push(_oracle.ExchangeRateTuple.decode(reader, reader.uint32()));
          break;
        case 4:
          message.penaltyCounters.push(PenaltyCounter.decode(reader, reader.uint32()));
          break;
        case 6:
          message.aggregateExchangeRateVotes.push(_oracle.AggregateExchangeRateVote.decode(reader, reader.uint32()));
          break;
        case 7:
          message.priceSnapshots.push(_oracle.PriceSnapshot.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$feederDelegat, _object$exchangeRates, _object$penaltyCounte, _object$aggregateExch, _object$priceSnapshot;
    var message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? _oracle.Params.fromPartial(object.params) : undefined;
    message.feederDelegations = ((_object$feederDelegat = object.feederDelegations) === null || _object$feederDelegat === void 0 ? void 0 : _object$feederDelegat.map(function (e) {
      return FeederDelegation.fromPartial(e);
    })) || [];
    message.exchangeRates = ((_object$exchangeRates = object.exchangeRates) === null || _object$exchangeRates === void 0 ? void 0 : _object$exchangeRates.map(function (e) {
      return _oracle.ExchangeRateTuple.fromPartial(e);
    })) || [];
    message.penaltyCounters = ((_object$penaltyCounte = object.penaltyCounters) === null || _object$penaltyCounte === void 0 ? void 0 : _object$penaltyCounte.map(function (e) {
      return PenaltyCounter.fromPartial(e);
    })) || [];
    message.aggregateExchangeRateVotes = ((_object$aggregateExch = object.aggregateExchangeRateVotes) === null || _object$aggregateExch === void 0 ? void 0 : _object$aggregateExch.map(function (e) {
      return _oracle.AggregateExchangeRateVote.fromPartial(e);
    })) || [];
    message.priceSnapshots = ((_object$priceSnapshot = object.priceSnapshots) === null || _object$priceSnapshot === void 0 ? void 0 : _object$priceSnapshot.map(function (e) {
      return _oracle.PriceSnapshot.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.GenesisState = GenesisState;
function createBaseFeederDelegation() {
  return {
    feederAddress: "",
    validatorAddress: ""
  };
}
var FeederDelegation = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.feederAddress !== "") {
      writer.uint32(10).string(message.feederAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseFeederDelegation();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feederAddress = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$feederAddress, _object$validatorAddr;
    var message = createBaseFeederDelegation();
    message.feederAddress = (_object$feederAddress = object.feederAddress) !== null && _object$feederAddress !== void 0 ? _object$feederAddress : "";
    message.validatorAddress = (_object$validatorAddr = object.validatorAddress) !== null && _object$validatorAddr !== void 0 ? _object$validatorAddr : "";
    return message;
  }
};
exports.FeederDelegation = FeederDelegation;
function createBasePenaltyCounter() {
  return {
    validatorAddress: "",
    votePenaltyCounter: undefined
  };
}
var PenaltyCounter = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.votePenaltyCounter !== undefined) {
      _oracle.VotePenaltyCounter.encode(message.votePenaltyCounter, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBasePenaltyCounter();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.votePenaltyCounter = _oracle.VotePenaltyCounter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$validatorAddr2;
    var message = createBasePenaltyCounter();
    message.validatorAddress = (_object$validatorAddr2 = object.validatorAddress) !== null && _object$validatorAddr2 !== void 0 ? _object$validatorAddr2 : "";
    message.votePenaltyCounter = object.votePenaltyCounter !== undefined && object.votePenaltyCounter !== null ? _oracle.VotePenaltyCounter.fromPartial(object.votePenaltyCounter) : undefined;
    return message;
  }
};
exports.PenaltyCounter = PenaltyCounter;