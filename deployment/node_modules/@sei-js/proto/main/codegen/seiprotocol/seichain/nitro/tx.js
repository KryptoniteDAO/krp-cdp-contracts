"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgSubmitFraudChallengeResponse = exports.MsgSubmitFraudChallenge = exports.MsgRecordTransactionDataResponse = exports.MsgRecordTransactionData = void 0;
var _data = require("./data");
var _account = require("./account");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseMsgRecordTransactionData() {
  return {
    sender: "",
    slot: _helpers.Long.UZERO,
    stateRoot: "",
    txs: []
  };
}
var MsgRecordTransactionData = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.slot.isZero()) {
      writer.uint32(16).uint64(message.slot);
    }
    if (message.stateRoot !== "") {
      writer.uint32(26).string(message.stateRoot);
    }
    var _iterator = _createForOfIteratorHelper(message.txs),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        writer.uint32(34).string(v);
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
    var message = createBaseMsgRecordTransactionData();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.slot = reader.uint64();
          break;
        case 3:
          message.stateRoot = reader.string();
          break;
        case 4:
          message.txs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$sender, _object$stateRoot, _object$txs;
    var message = createBaseMsgRecordTransactionData();
    message.sender = (_object$sender = object.sender) !== null && _object$sender !== void 0 ? _object$sender : "";
    message.slot = object.slot !== undefined && object.slot !== null ? _helpers.Long.fromValue(object.slot) : _helpers.Long.UZERO;
    message.stateRoot = (_object$stateRoot = object.stateRoot) !== null && _object$stateRoot !== void 0 ? _object$stateRoot : "";
    message.txs = ((_object$txs = object.txs) === null || _object$txs === void 0 ? void 0 : _object$txs.map(function (e) {
      return e;
    })) || [];
    return message;
  }
};
exports.MsgRecordTransactionData = MsgRecordTransactionData;
function createBaseMsgSubmitFraudChallenge() {
  return {
    sender: "",
    startSlot: _helpers.Long.UZERO,
    endSlot: _helpers.Long.UZERO,
    fraudStatePubKey: "",
    merkleProof: undefined,
    accountStates: [],
    programs: [],
    sysvarAccounts: []
  };
}
var MsgSubmitFraudChallenge = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.startSlot.isZero()) {
      writer.uint32(16).uint64(message.startSlot);
    }
    if (!message.endSlot.isZero()) {
      writer.uint32(24).uint64(message.endSlot);
    }
    if (message.fraudStatePubKey !== "") {
      writer.uint32(34).string(message.fraudStatePubKey);
    }
    if (message.merkleProof !== undefined) {
      _data.MerkleProof.encode(message.merkleProof, writer.uint32(42).fork()).ldelim();
    }
    var _iterator2 = _createForOfIteratorHelper(message.accountStates),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        _account.Account.encode(v, writer.uint32(50).fork()).ldelim();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var _iterator3 = _createForOfIteratorHelper(message.programs),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _v = _step3.value;
        _account.Account.encode(_v, writer.uint32(58).fork()).ldelim();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var _iterator4 = _createForOfIteratorHelper(message.sysvarAccounts),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _v2 = _step4.value;
        _account.Account.encode(_v2, writer.uint32(66).fork()).ldelim();
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
    var message = createBaseMsgSubmitFraudChallenge();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.startSlot = reader.uint64();
          break;
        case 3:
          message.endSlot = reader.uint64();
          break;
        case 4:
          message.fraudStatePubKey = reader.string();
          break;
        case 5:
          message.merkleProof = _data.MerkleProof.decode(reader, reader.uint32());
          break;
        case 6:
          message.accountStates.push(_account.Account.decode(reader, reader.uint32()));
          break;
        case 7:
          message.programs.push(_account.Account.decode(reader, reader.uint32()));
          break;
        case 8:
          message.sysvarAccounts.push(_account.Account.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$sender2, _object$fraudStatePub, _object$accountStates, _object$programs, _object$sysvarAccount;
    var message = createBaseMsgSubmitFraudChallenge();
    message.sender = (_object$sender2 = object.sender) !== null && _object$sender2 !== void 0 ? _object$sender2 : "";
    message.startSlot = object.startSlot !== undefined && object.startSlot !== null ? _helpers.Long.fromValue(object.startSlot) : _helpers.Long.UZERO;
    message.endSlot = object.endSlot !== undefined && object.endSlot !== null ? _helpers.Long.fromValue(object.endSlot) : _helpers.Long.UZERO;
    message.fraudStatePubKey = (_object$fraudStatePub = object.fraudStatePubKey) !== null && _object$fraudStatePub !== void 0 ? _object$fraudStatePub : "";
    message.merkleProof = object.merkleProof !== undefined && object.merkleProof !== null ? _data.MerkleProof.fromPartial(object.merkleProof) : undefined;
    message.accountStates = ((_object$accountStates = object.accountStates) === null || _object$accountStates === void 0 ? void 0 : _object$accountStates.map(function (e) {
      return _account.Account.fromPartial(e);
    })) || [];
    message.programs = ((_object$programs = object.programs) === null || _object$programs === void 0 ? void 0 : _object$programs.map(function (e) {
      return _account.Account.fromPartial(e);
    })) || [];
    message.sysvarAccounts = ((_object$sysvarAccount = object.sysvarAccounts) === null || _object$sysvarAccount === void 0 ? void 0 : _object$sysvarAccount.map(function (e) {
      return _account.Account.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.MsgSubmitFraudChallenge = MsgSubmitFraudChallenge;
function createBaseMsgRecordTransactionDataResponse() {
  return {};
}
var MsgRecordTransactionDataResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgRecordTransactionDataResponse();
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
    var message = createBaseMsgRecordTransactionDataResponse();
    return message;
  }
};
exports.MsgRecordTransactionDataResponse = MsgRecordTransactionDataResponse;
function createBaseMsgSubmitFraudChallengeResponse() {
  return {};
}
var MsgSubmitFraudChallengeResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgSubmitFraudChallengeResponse();
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
    var message = createBaseMsgSubmitFraudChallengeResponse();
    return message;
  }
};
exports.MsgSubmitFraudChallengeResponse = MsgSubmitFraudChallengeResponse;