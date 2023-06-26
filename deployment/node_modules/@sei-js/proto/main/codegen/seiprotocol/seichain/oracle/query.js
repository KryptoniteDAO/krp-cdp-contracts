"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryVoteTargetsResponse = exports.QueryVoteTargetsRequest = exports.QueryVotePenaltyCounterResponse = exports.QueryVotePenaltyCounterRequest = exports.QueryTwapsResponse = exports.QueryTwapsRequest = exports.QueryPriceSnapshotHistoryResponse = exports.QueryPriceSnapshotHistoryRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.QueryFeederDelegationResponse = exports.QueryFeederDelegationRequest = exports.QueryExchangeRatesResponse = exports.QueryExchangeRatesRequest = exports.QueryExchangeRateResponse = exports.QueryExchangeRateRequest = exports.QueryAggregateVotesResponse = exports.QueryAggregateVotesRequest = exports.QueryAggregateVoteResponse = exports.QueryAggregateVoteRequest = exports.QueryActivesResponse = exports.QueryActivesRequest = exports.DenomOracleExchangeRatePair = void 0;
var _oracle = require("./oracle");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseQueryExchangeRateRequest() {
  return {
    denom: ""
  };
}
var QueryExchangeRateRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryExchangeRateRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$denom;
    var message = createBaseQueryExchangeRateRequest();
    message.denom = (_object$denom = object.denom) !== null && _object$denom !== void 0 ? _object$denom : "";
    return message;
  }
};
exports.QueryExchangeRateRequest = QueryExchangeRateRequest;
function createBaseQueryExchangeRateResponse() {
  return {
    oracleExchangeRate: undefined
  };
}
var QueryExchangeRateResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.oracleExchangeRate !== undefined) {
      _oracle.OracleExchangeRate.encode(message.oracleExchangeRate, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryExchangeRateResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracleExchangeRate = _oracle.OracleExchangeRate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryExchangeRateResponse();
    message.oracleExchangeRate = object.oracleExchangeRate !== undefined && object.oracleExchangeRate !== null ? _oracle.OracleExchangeRate.fromPartial(object.oracleExchangeRate) : undefined;
    return message;
  }
};
exports.QueryExchangeRateResponse = QueryExchangeRateResponse;
function createBaseQueryExchangeRatesRequest() {
  return {};
}
var QueryExchangeRatesRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryExchangeRatesRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseQueryExchangeRatesRequest();
    return message;
  }
};
exports.QueryExchangeRatesRequest = QueryExchangeRatesRequest;
function createBaseDenomOracleExchangeRatePair() {
  return {
    denom: "",
    oracleExchangeRate: undefined
  };
}
var DenomOracleExchangeRatePair = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oracleExchangeRate !== undefined) {
      _oracle.OracleExchangeRate.encode(message.oracleExchangeRate, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseDenomOracleExchangeRatePair();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oracleExchangeRate = _oracle.OracleExchangeRate.decode(reader, reader.uint32());
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
    var message = createBaseDenomOracleExchangeRatePair();
    message.denom = (_object$denom2 = object.denom) !== null && _object$denom2 !== void 0 ? _object$denom2 : "";
    message.oracleExchangeRate = object.oracleExchangeRate !== undefined && object.oracleExchangeRate !== null ? _oracle.OracleExchangeRate.fromPartial(object.oracleExchangeRate) : undefined;
    return message;
  }
};
exports.DenomOracleExchangeRatePair = DenomOracleExchangeRatePair;
function createBaseQueryExchangeRatesResponse() {
  return {
    denomOracleExchangeRatePairs: []
  };
}
var QueryExchangeRatesResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator = _createForOfIteratorHelper(message.denomOracleExchangeRatePairs),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        DenomOracleExchangeRatePair.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryExchangeRatesResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomOracleExchangeRatePairs.push(DenomOracleExchangeRatePair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$denomOracleEx;
    var message = createBaseQueryExchangeRatesResponse();
    message.denomOracleExchangeRatePairs = ((_object$denomOracleEx = object.denomOracleExchangeRatePairs) === null || _object$denomOracleEx === void 0 ? void 0 : _object$denomOracleEx.map(function (e) {
      return DenomOracleExchangeRatePair.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryExchangeRatesResponse = QueryExchangeRatesResponse;
function createBaseQueryActivesRequest() {
  return {};
}
var QueryActivesRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryActivesRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseQueryActivesRequest();
    return message;
  }
};
exports.QueryActivesRequest = QueryActivesRequest;
function createBaseQueryActivesResponse() {
  return {
    actives: []
  };
}
var QueryActivesResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator2 = _createForOfIteratorHelper(message.actives),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        writer.uint32(10).string(v);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryActivesResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actives.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$actives;
    var message = createBaseQueryActivesResponse();
    message.actives = ((_object$actives = object.actives) === null || _object$actives === void 0 ? void 0 : _object$actives.map(function (e) {
      return e;
    })) || [];
    return message;
  }
};
exports.QueryActivesResponse = QueryActivesResponse;
function createBaseQueryVoteTargetsRequest() {
  return {};
}
var QueryVoteTargetsRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryVoteTargetsRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseQueryVoteTargetsRequest();
    return message;
  }
};
exports.QueryVoteTargetsRequest = QueryVoteTargetsRequest;
function createBaseQueryVoteTargetsResponse() {
  return {
    voteTargets: []
  };
}
var QueryVoteTargetsResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator3 = _createForOfIteratorHelper(message.voteTargets),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var v = _step3.value;
        writer.uint32(10).string(v);
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
    var message = createBaseQueryVoteTargetsResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.voteTargets.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$voteTargets;
    var message = createBaseQueryVoteTargetsResponse();
    message.voteTargets = ((_object$voteTargets = object.voteTargets) === null || _object$voteTargets === void 0 ? void 0 : _object$voteTargets.map(function (e) {
      return e;
    })) || [];
    return message;
  }
};
exports.QueryVoteTargetsResponse = QueryVoteTargetsResponse;
function createBaseQueryPriceSnapshotHistoryRequest() {
  return {};
}
var QueryPriceSnapshotHistoryRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryPriceSnapshotHistoryRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseQueryPriceSnapshotHistoryRequest();
    return message;
  }
};
exports.QueryPriceSnapshotHistoryRequest = QueryPriceSnapshotHistoryRequest;
function createBaseQueryPriceSnapshotHistoryResponse() {
  return {
    priceSnapshots: []
  };
}
var QueryPriceSnapshotHistoryResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator4 = _createForOfIteratorHelper(message.priceSnapshots),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var v = _step4.value;
        _oracle.PriceSnapshot.encode(v, writer.uint32(10).fork()).ldelim();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryPriceSnapshotHistoryResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
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
    var _object$priceSnapshot;
    var message = createBaseQueryPriceSnapshotHistoryResponse();
    message.priceSnapshots = ((_object$priceSnapshot = object.priceSnapshots) === null || _object$priceSnapshot === void 0 ? void 0 : _object$priceSnapshot.map(function (e) {
      return _oracle.PriceSnapshot.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryPriceSnapshotHistoryResponse = QueryPriceSnapshotHistoryResponse;
function createBaseQueryTwapsRequest() {
  return {
    lookbackSeconds: _helpers.Long.UZERO
  };
}
var QueryTwapsRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.lookbackSeconds.isZero()) {
      writer.uint32(8).uint64(message.lookbackSeconds);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryTwapsRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lookbackSeconds = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryTwapsRequest();
    message.lookbackSeconds = object.lookbackSeconds !== undefined && object.lookbackSeconds !== null ? _helpers.Long.fromValue(object.lookbackSeconds) : _helpers.Long.UZERO;
    return message;
  }
};
exports.QueryTwapsRequest = QueryTwapsRequest;
function createBaseQueryTwapsResponse() {
  return {
    oracleTwaps: []
  };
}
var QueryTwapsResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator5 = _createForOfIteratorHelper(message.oracleTwaps),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var v = _step5.value;
        _oracle.OracleTwap.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryTwapsResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracleTwaps.push(_oracle.OracleTwap.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$oracleTwaps;
    var message = createBaseQueryTwapsResponse();
    message.oracleTwaps = ((_object$oracleTwaps = object.oracleTwaps) === null || _object$oracleTwaps === void 0 ? void 0 : _object$oracleTwaps.map(function (e) {
      return _oracle.OracleTwap.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryTwapsResponse = QueryTwapsResponse;
function createBaseQueryFeederDelegationRequest() {
  return {
    validatorAddr: ""
  };
}
var QueryFeederDelegationRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryFeederDelegationRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$validatorAddr;
    var message = createBaseQueryFeederDelegationRequest();
    message.validatorAddr = (_object$validatorAddr = object.validatorAddr) !== null && _object$validatorAddr !== void 0 ? _object$validatorAddr : "";
    return message;
  }
};
exports.QueryFeederDelegationRequest = QueryFeederDelegationRequest;
function createBaseQueryFeederDelegationResponse() {
  return {
    feederAddr: ""
  };
}
var QueryFeederDelegationResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.feederAddr !== "") {
      writer.uint32(10).string(message.feederAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryFeederDelegationResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feederAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$feederAddr;
    var message = createBaseQueryFeederDelegationResponse();
    message.feederAddr = (_object$feederAddr = object.feederAddr) !== null && _object$feederAddr !== void 0 ? _object$feederAddr : "";
    return message;
  }
};
exports.QueryFeederDelegationResponse = QueryFeederDelegationResponse;
function createBaseQueryVotePenaltyCounterRequest() {
  return {
    validatorAddr: ""
  };
}
var QueryVotePenaltyCounterRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryVotePenaltyCounterRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
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
    var message = createBaseQueryVotePenaltyCounterRequest();
    message.validatorAddr = (_object$validatorAddr2 = object.validatorAddr) !== null && _object$validatorAddr2 !== void 0 ? _object$validatorAddr2 : "";
    return message;
  }
};
exports.QueryVotePenaltyCounterRequest = QueryVotePenaltyCounterRequest;
function createBaseQueryVotePenaltyCounterResponse() {
  return {
    votePenaltyCounter: undefined
  };
}
var QueryVotePenaltyCounterResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.votePenaltyCounter !== undefined) {
      _oracle.VotePenaltyCounter.encode(message.votePenaltyCounter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryVotePenaltyCounterResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
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
    var message = createBaseQueryVotePenaltyCounterResponse();
    message.votePenaltyCounter = object.votePenaltyCounter !== undefined && object.votePenaltyCounter !== null ? _oracle.VotePenaltyCounter.fromPartial(object.votePenaltyCounter) : undefined;
    return message;
  }
};
exports.QueryVotePenaltyCounterResponse = QueryVotePenaltyCounterResponse;
function createBaseQueryAggregateVoteRequest() {
  return {
    validatorAddr: ""
  };
}
var QueryAggregateVoteRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAggregateVoteRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$validatorAddr3;
    var message = createBaseQueryAggregateVoteRequest();
    message.validatorAddr = (_object$validatorAddr3 = object.validatorAddr) !== null && _object$validatorAddr3 !== void 0 ? _object$validatorAddr3 : "";
    return message;
  }
};
exports.QueryAggregateVoteRequest = QueryAggregateVoteRequest;
function createBaseQueryAggregateVoteResponse() {
  return {
    aggregateVote: undefined
  };
}
var QueryAggregateVoteResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.aggregateVote !== undefined) {
      _oracle.AggregateExchangeRateVote.encode(message.aggregateVote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAggregateVoteResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregateVote = _oracle.AggregateExchangeRateVote.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryAggregateVoteResponse();
    message.aggregateVote = object.aggregateVote !== undefined && object.aggregateVote !== null ? _oracle.AggregateExchangeRateVote.fromPartial(object.aggregateVote) : undefined;
    return message;
  }
};
exports.QueryAggregateVoteResponse = QueryAggregateVoteResponse;
function createBaseQueryAggregateVotesRequest() {
  return {};
}
var QueryAggregateVotesRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAggregateVotesRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseQueryAggregateVotesRequest();
    return message;
  }
};
exports.QueryAggregateVotesRequest = QueryAggregateVotesRequest;
function createBaseQueryAggregateVotesResponse() {
  return {
    aggregateVotes: []
  };
}
var QueryAggregateVotesResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator6 = _createForOfIteratorHelper(message.aggregateVotes),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var v = _step6.value;
        _oracle.AggregateExchangeRateVote.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryAggregateVotesResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregateVotes.push(_oracle.AggregateExchangeRateVote.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$aggregateVote;
    var message = createBaseQueryAggregateVotesResponse();
    message.aggregateVotes = ((_object$aggregateVote = object.aggregateVotes) === null || _object$aggregateVote === void 0 ? void 0 : _object$aggregateVote.map(function (e) {
      return _oracle.AggregateExchangeRateVote.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryAggregateVotesResponse = QueryAggregateVotesResponse;
function createBaseQueryParamsRequest() {
  return {};
}
var QueryParamsRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(_) {
    var message = createBaseQueryParamsRequest();
    return message;
  }
};
exports.QueryParamsRequest = QueryParamsRequest;
function createBaseQueryParamsResponse() {
  return {
    params: undefined
  };
}
var QueryParamsResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.params !== undefined) {
      _oracle.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = _oracle.Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? _oracle.Params.fromPartial(object.params) : undefined;
    return message;
  }
};
exports.QueryParamsResponse = QueryParamsResponse;