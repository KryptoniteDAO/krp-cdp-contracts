"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScheduledTokenRelease = exports.Params = exports.Minter = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseMinter() {
  return {
    lastMintAmount: "",
    lastMintDate: "",
    lastMintHeight: _helpers.Long.ZERO,
    denom: ""
  };
}
var Minter = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.lastMintAmount !== "") {
      writer.uint32(10).string(message.lastMintAmount);
    }
    if (message.lastMintDate !== "") {
      writer.uint32(18).string(message.lastMintDate);
    }
    if (!message.lastMintHeight.isZero()) {
      writer.uint32(24).int64(message.lastMintHeight);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMinter();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastMintAmount = reader.string();
          break;
        case 2:
          message.lastMintDate = reader.string();
          break;
        case 3:
          message.lastMintHeight = reader.int64();
          break;
        case 4:
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
    var _object$lastMintAmoun, _object$lastMintDate, _object$denom;
    var message = createBaseMinter();
    message.lastMintAmount = (_object$lastMintAmoun = object.lastMintAmount) !== null && _object$lastMintAmoun !== void 0 ? _object$lastMintAmoun : "";
    message.lastMintDate = (_object$lastMintDate = object.lastMintDate) !== null && _object$lastMintDate !== void 0 ? _object$lastMintDate : "";
    message.lastMintHeight = object.lastMintHeight !== undefined && object.lastMintHeight !== null ? _helpers.Long.fromValue(object.lastMintHeight) : _helpers.Long.ZERO;
    message.denom = (_object$denom = object.denom) !== null && _object$denom !== void 0 ? _object$denom : "";
    return message;
  }
};
exports.Minter = Minter;
function createBaseScheduledTokenRelease() {
  return {
    date: "",
    tokenReleaseAmount: _helpers.Long.ZERO
  };
}
var ScheduledTokenRelease = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.date !== "") {
      writer.uint32(10).string(message.date);
    }
    if (!message.tokenReleaseAmount.isZero()) {
      writer.uint32(16).int64(message.tokenReleaseAmount);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseScheduledTokenRelease();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = reader.string();
          break;
        case 2:
          message.tokenReleaseAmount = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$date;
    var message = createBaseScheduledTokenRelease();
    message.date = (_object$date = object.date) !== null && _object$date !== void 0 ? _object$date : "";
    message.tokenReleaseAmount = object.tokenReleaseAmount !== undefined && object.tokenReleaseAmount !== null ? _helpers.Long.fromValue(object.tokenReleaseAmount) : _helpers.Long.ZERO;
    return message;
  }
};
exports.ScheduledTokenRelease = ScheduledTokenRelease;
function createBaseParams() {
  return {
    mintDenom: "",
    tokenReleaseSchedule: []
  };
}
var Params = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    var _iterator = _createForOfIteratorHelper(message.tokenReleaseSchedule),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        ScheduledTokenRelease.encode(v, writer.uint32(18).fork()).ldelim();
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
    var message = createBaseParams();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintDenom = reader.string();
          break;
        case 2:
          message.tokenReleaseSchedule.push(ScheduledTokenRelease.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$mintDenom, _object$tokenReleaseS;
    var message = createBaseParams();
    message.mintDenom = (_object$mintDenom = object.mintDenom) !== null && _object$mintDenom !== void 0 ? _object$mintDenom : "";
    message.tokenReleaseSchedule = ((_object$tokenReleaseS = object.tokenReleaseSchedule) === null || _object$tokenReleaseS === void 0 ? void 0 : _object$tokenReleaseS.map(function (e) {
      return ScheduledTokenRelease.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.Params = Params;