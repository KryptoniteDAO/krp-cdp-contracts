"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VotePenaltyCounter = exports.PriceSnapshotItem = exports.PriceSnapshot = exports.Params = exports.OracleTwap = exports.OracleExchangeRate = exports.ExchangeRateTuple = exports.Denom = exports.AggregateExchangeRateVote = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseParams() {
  return {
    votePeriod: _helpers.Long.UZERO,
    voteThreshold: "",
    rewardBand: "",
    whitelist: [],
    slashFraction: "",
    slashWindow: _helpers.Long.UZERO,
    minValidPerWindow: "",
    lookbackDuration: _helpers.Long.UZERO
  };
}
var Params = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.votePeriod.isZero()) {
      writer.uint32(8).uint64(message.votePeriod);
    }
    if (message.voteThreshold !== "") {
      writer.uint32(18).string(message.voteThreshold);
    }
    if (message.rewardBand !== "") {
      writer.uint32(26).string(message.rewardBand);
    }
    var _iterator = _createForOfIteratorHelper(message.whitelist),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        Denom.encode(v, writer.uint32(34).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (message.slashFraction !== "") {
      writer.uint32(42).string(message.slashFraction);
    }
    if (!message.slashWindow.isZero()) {
      writer.uint32(48).uint64(message.slashWindow);
    }
    if (message.minValidPerWindow !== "") {
      writer.uint32(58).string(message.minValidPerWindow);
    }
    if (!message.lookbackDuration.isZero()) {
      writer.uint32(72).uint64(message.lookbackDuration);
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
          message.votePeriod = reader.uint64();
          break;
        case 2:
          message.voteThreshold = reader.string();
          break;
        case 3:
          message.rewardBand = reader.string();
          break;
        case 4:
          message.whitelist.push(Denom.decode(reader, reader.uint32()));
          break;
        case 5:
          message.slashFraction = reader.string();
          break;
        case 6:
          message.slashWindow = reader.uint64();
          break;
        case 7:
          message.minValidPerWindow = reader.string();
          break;
        case 9:
          message.lookbackDuration = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$voteThreshold, _object$rewardBand, _object$whitelist, _object$slashFraction, _object$minValidPerWi;
    var message = createBaseParams();
    message.votePeriod = object.votePeriod !== undefined && object.votePeriod !== null ? _helpers.Long.fromValue(object.votePeriod) : _helpers.Long.UZERO;
    message.voteThreshold = (_object$voteThreshold = object.voteThreshold) !== null && _object$voteThreshold !== void 0 ? _object$voteThreshold : "";
    message.rewardBand = (_object$rewardBand = object.rewardBand) !== null && _object$rewardBand !== void 0 ? _object$rewardBand : "";
    message.whitelist = ((_object$whitelist = object.whitelist) === null || _object$whitelist === void 0 ? void 0 : _object$whitelist.map(function (e) {
      return Denom.fromPartial(e);
    })) || [];
    message.slashFraction = (_object$slashFraction = object.slashFraction) !== null && _object$slashFraction !== void 0 ? _object$slashFraction : "";
    message.slashWindow = object.slashWindow !== undefined && object.slashWindow !== null ? _helpers.Long.fromValue(object.slashWindow) : _helpers.Long.UZERO;
    message.minValidPerWindow = (_object$minValidPerWi = object.minValidPerWindow) !== null && _object$minValidPerWi !== void 0 ? _object$minValidPerWi : "";
    message.lookbackDuration = object.lookbackDuration !== undefined && object.lookbackDuration !== null ? _helpers.Long.fromValue(object.lookbackDuration) : _helpers.Long.UZERO;
    return message;
  }
};
exports.Params = Params;
function createBaseDenom() {
  return {
    name: ""
  };
}
var Denom = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseDenom();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$name;
    var message = createBaseDenom();
    message.name = (_object$name = object.name) !== null && _object$name !== void 0 ? _object$name : "";
    return message;
  }
};
exports.Denom = Denom;
function createBaseAggregateExchangeRateVote() {
  return {
    exchangeRateTuples: [],
    voter: ""
  };
}
var AggregateExchangeRateVote = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator2 = _createForOfIteratorHelper(message.exchangeRateTuples),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        ExchangeRateTuple.encode(v, writer.uint32(10).fork()).ldelim();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseAggregateExchangeRateVote();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRateTuples.push(ExchangeRateTuple.decode(reader, reader.uint32()));
          break;
        case 2:
          message.voter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$exchangeRateT, _object$voter;
    var message = createBaseAggregateExchangeRateVote();
    message.exchangeRateTuples = ((_object$exchangeRateT = object.exchangeRateTuples) === null || _object$exchangeRateT === void 0 ? void 0 : _object$exchangeRateT.map(function (e) {
      return ExchangeRateTuple.fromPartial(e);
    })) || [];
    message.voter = (_object$voter = object.voter) !== null && _object$voter !== void 0 ? _object$voter : "";
    return message;
  }
};
exports.AggregateExchangeRateVote = AggregateExchangeRateVote;
function createBaseExchangeRateTuple() {
  return {
    denom: "",
    exchangeRate: ""
  };
}
var ExchangeRateTuple = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.exchangeRate !== "") {
      writer.uint32(18).string(message.exchangeRate);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseExchangeRateTuple();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.exchangeRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$denom, _object$exchangeRate;
    var message = createBaseExchangeRateTuple();
    message.denom = (_object$denom = object.denom) !== null && _object$denom !== void 0 ? _object$denom : "";
    message.exchangeRate = (_object$exchangeRate = object.exchangeRate) !== null && _object$exchangeRate !== void 0 ? _object$exchangeRate : "";
    return message;
  }
};
exports.ExchangeRateTuple = ExchangeRateTuple;
function createBaseOracleExchangeRate() {
  return {
    exchangeRate: "",
    lastUpdate: ""
  };
}
var OracleExchangeRate = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.exchangeRate !== "") {
      writer.uint32(10).string(message.exchangeRate);
    }
    if (message.lastUpdate !== "") {
      writer.uint32(18).string(message.lastUpdate);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseOracleExchangeRate();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRate = reader.string();
          break;
        case 2:
          message.lastUpdate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$exchangeRate2, _object$lastUpdate;
    var message = createBaseOracleExchangeRate();
    message.exchangeRate = (_object$exchangeRate2 = object.exchangeRate) !== null && _object$exchangeRate2 !== void 0 ? _object$exchangeRate2 : "";
    message.lastUpdate = (_object$lastUpdate = object.lastUpdate) !== null && _object$lastUpdate !== void 0 ? _object$lastUpdate : "";
    return message;
  }
};
exports.OracleExchangeRate = OracleExchangeRate;
function createBasePriceSnapshotItem() {
  return {
    denom: "",
    oracleExchangeRate: undefined
  };
}
var PriceSnapshotItem = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oracleExchangeRate !== undefined) {
      OracleExchangeRate.encode(message.oracleExchangeRate, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBasePriceSnapshotItem();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oracleExchangeRate = OracleExchangeRate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$denom2;
    var message = createBasePriceSnapshotItem();
    message.denom = (_object$denom2 = object.denom) !== null && _object$denom2 !== void 0 ? _object$denom2 : "";
    message.oracleExchangeRate = object.oracleExchangeRate !== undefined && object.oracleExchangeRate !== null ? OracleExchangeRate.fromPartial(object.oracleExchangeRate) : undefined;
    return message;
  }
};
exports.PriceSnapshotItem = PriceSnapshotItem;
function createBasePriceSnapshot() {
  return {
    snapshotTimestamp: _helpers.Long.ZERO,
    priceSnapshotItems: []
  };
}
var PriceSnapshot = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.snapshotTimestamp.isZero()) {
      writer.uint32(8).int64(message.snapshotTimestamp);
    }
    var _iterator3 = _createForOfIteratorHelper(message.priceSnapshotItems),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var v = _step3.value;
        PriceSnapshotItem.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBasePriceSnapshot();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshotTimestamp = reader.int64();
          break;
        case 2:
          message.priceSnapshotItems.push(PriceSnapshotItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$priceSnapshot;
    var message = createBasePriceSnapshot();
    message.snapshotTimestamp = object.snapshotTimestamp !== undefined && object.snapshotTimestamp !== null ? _helpers.Long.fromValue(object.snapshotTimestamp) : _helpers.Long.ZERO;
    message.priceSnapshotItems = ((_object$priceSnapshot = object.priceSnapshotItems) === null || _object$priceSnapshot === void 0 ? void 0 : _object$priceSnapshot.map(function (e) {
      return PriceSnapshotItem.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.PriceSnapshot = PriceSnapshot;
function createBaseOracleTwap() {
  return {
    denom: "",
    twap: "",
    lookbackSeconds: _helpers.Long.ZERO
  };
}
var OracleTwap = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.twap !== "") {
      writer.uint32(18).string(message.twap);
    }
    if (!message.lookbackSeconds.isZero()) {
      writer.uint32(24).int64(message.lookbackSeconds);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseOracleTwap();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.twap = reader.string();
          break;
        case 3:
          message.lookbackSeconds = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$denom3, _object$twap;
    var message = createBaseOracleTwap();
    message.denom = (_object$denom3 = object.denom) !== null && _object$denom3 !== void 0 ? _object$denom3 : "";
    message.twap = (_object$twap = object.twap) !== null && _object$twap !== void 0 ? _object$twap : "";
    message.lookbackSeconds = object.lookbackSeconds !== undefined && object.lookbackSeconds !== null ? _helpers.Long.fromValue(object.lookbackSeconds) : _helpers.Long.ZERO;
    return message;
  }
};
exports.OracleTwap = OracleTwap;
function createBaseVotePenaltyCounter() {
  return {
    missCount: _helpers.Long.UZERO,
    abstainCount: _helpers.Long.UZERO
  };
}
var VotePenaltyCounter = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.missCount.isZero()) {
      writer.uint32(8).uint64(message.missCount);
    }
    if (!message.abstainCount.isZero()) {
      writer.uint32(16).uint64(message.abstainCount);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseVotePenaltyCounter();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.missCount = reader.uint64();
          break;
        case 2:
          message.abstainCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseVotePenaltyCounter();
    message.missCount = object.missCount !== undefined && object.missCount !== null ? _helpers.Long.fromValue(object.missCount) : _helpers.Long.UZERO;
    message.abstainCount = object.abstainCount !== undefined && object.abstainCount !== null ? _helpers.Long.fromValue(object.abstainCount) : _helpers.Long.UZERO;
    return message;
  }
};
exports.VotePenaltyCounter = VotePenaltyCounter;