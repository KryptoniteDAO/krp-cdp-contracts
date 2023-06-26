"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionData = exports.MessageHeader = exports.MessageAddressTableLookup = exports.Message = exports.MerkleProof = exports.LoadedMessage = exports.LoadedAddresses = exports.LegacyMessage = exports.CompiledInstruction = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseTransactionData() {
  return {
    slot: _helpers.Long.UZERO,
    signature: "",
    isVote: false,
    messageType: _helpers.Long.UZERO,
    legacyMessage: undefined,
    v0LoadedMessage: undefined,
    signatures: [],
    messageHash: "",
    writeVersion: _helpers.Long.UZERO
  };
}
var TransactionData = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.slot.isZero()) {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.signature !== "") {
      writer.uint32(18).string(message.signature);
    }
    if (message.isVote === true) {
      writer.uint32(24).bool(message.isVote);
    }
    if (!message.messageType.isZero()) {
      writer.uint32(32).uint64(message.messageType);
    }
    if (message.legacyMessage !== undefined) {
      LegacyMessage.encode(message.legacyMessage, writer.uint32(42).fork()).ldelim();
    }
    if (message.v0LoadedMessage !== undefined) {
      LoadedMessage.encode(message.v0LoadedMessage, writer.uint32(50).fork()).ldelim();
    }
    var _iterator = _createForOfIteratorHelper(message.signatures),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        writer.uint32(58).string(v);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (message.messageHash !== "") {
      writer.uint32(66).string(message.messageHash);
    }
    if (!message.writeVersion.isZero()) {
      writer.uint32(72).uint64(message.writeVersion);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseTransactionData();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slot = reader.uint64();
          break;
        case 2:
          message.signature = reader.string();
          break;
        case 3:
          message.isVote = reader.bool();
          break;
        case 4:
          message.messageType = reader.uint64();
          break;
        case 5:
          message.legacyMessage = LegacyMessage.decode(reader, reader.uint32());
          break;
        case 6:
          message.v0LoadedMessage = LoadedMessage.decode(reader, reader.uint32());
          break;
        case 7:
          message.signatures.push(reader.string());
          break;
        case 8:
          message.messageHash = reader.string();
          break;
        case 9:
          message.writeVersion = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$signature, _object$isVote, _object$signatures, _object$messageHash;
    var message = createBaseTransactionData();
    message.slot = object.slot !== undefined && object.slot !== null ? _helpers.Long.fromValue(object.slot) : _helpers.Long.UZERO;
    message.signature = (_object$signature = object.signature) !== null && _object$signature !== void 0 ? _object$signature : "";
    message.isVote = (_object$isVote = object.isVote) !== null && _object$isVote !== void 0 ? _object$isVote : false;
    message.messageType = object.messageType !== undefined && object.messageType !== null ? _helpers.Long.fromValue(object.messageType) : _helpers.Long.UZERO;
    message.legacyMessage = object.legacyMessage !== undefined && object.legacyMessage !== null ? LegacyMessage.fromPartial(object.legacyMessage) : undefined;
    message.v0LoadedMessage = object.v0LoadedMessage !== undefined && object.v0LoadedMessage !== null ? LoadedMessage.fromPartial(object.v0LoadedMessage) : undefined;
    message.signatures = ((_object$signatures = object.signatures) === null || _object$signatures === void 0 ? void 0 : _object$signatures.map(function (e) {
      return e;
    })) || [];
    message.messageHash = (_object$messageHash = object.messageHash) !== null && _object$messageHash !== void 0 ? _object$messageHash : "";
    message.writeVersion = object.writeVersion !== undefined && object.writeVersion !== null ? _helpers.Long.fromValue(object.writeVersion) : _helpers.Long.UZERO;
    return message;
  }
};
exports.TransactionData = TransactionData;
function createBaseLegacyMessage() {
  return {
    header: undefined,
    accountKeys: [],
    recentBlockhash: "",
    instructions: []
  };
}
var LegacyMessage = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.header !== undefined) {
      MessageHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    var _iterator2 = _createForOfIteratorHelper(message.accountKeys),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        writer.uint32(18).string(v);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (message.recentBlockhash !== "") {
      writer.uint32(26).string(message.recentBlockhash);
    }
    var _iterator3 = _createForOfIteratorHelper(message.instructions),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _v = _step3.value;
        CompiledInstruction.encode(_v, writer.uint32(34).fork()).ldelim();
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
    var message = createBaseLegacyMessage();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = MessageHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.accountKeys.push(reader.string());
          break;
        case 3:
          message.recentBlockhash = reader.string();
          break;
        case 4:
          message.instructions.push(CompiledInstruction.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$accountKeys, _object$recentBlockha, _object$instructions;
    var message = createBaseLegacyMessage();
    message.header = object.header !== undefined && object.header !== null ? MessageHeader.fromPartial(object.header) : undefined;
    message.accountKeys = ((_object$accountKeys = object.accountKeys) === null || _object$accountKeys === void 0 ? void 0 : _object$accountKeys.map(function (e) {
      return e;
    })) || [];
    message.recentBlockhash = (_object$recentBlockha = object.recentBlockhash) !== null && _object$recentBlockha !== void 0 ? _object$recentBlockha : "";
    message.instructions = ((_object$instructions = object.instructions) === null || _object$instructions === void 0 ? void 0 : _object$instructions.map(function (e) {
      return CompiledInstruction.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.LegacyMessage = LegacyMessage;
function createBaseLoadedMessage() {
  return {
    message: undefined,
    loadedAddresses: undefined
  };
}
var LoadedMessage = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(10).fork()).ldelim();
    }
    if (message.loadedAddresses !== undefined) {
      LoadedAddresses.encode(message.loadedAddresses, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseLoadedMessage();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = Message.decode(reader, reader.uint32());
          break;
        case 2:
          message.loadedAddresses = LoadedAddresses.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseLoadedMessage();
    message.message = object.message !== undefined && object.message !== null ? Message.fromPartial(object.message) : undefined;
    message.loadedAddresses = object.loadedAddresses !== undefined && object.loadedAddresses !== null ? LoadedAddresses.fromPartial(object.loadedAddresses) : undefined;
    return message;
  }
};
exports.LoadedMessage = LoadedMessage;
function createBaseMessage() {
  return {
    header: undefined,
    accountKeys: [],
    recentBlockhash: "",
    instructions: [],
    addressTableLookups: []
  };
}
var Message = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.header !== undefined) {
      MessageHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    var _iterator4 = _createForOfIteratorHelper(message.accountKeys),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var v = _step4.value;
        writer.uint32(18).string(v);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    if (message.recentBlockhash !== "") {
      writer.uint32(26).string(message.recentBlockhash);
    }
    var _iterator5 = _createForOfIteratorHelper(message.instructions),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _v2 = _step5.value;
        CompiledInstruction.encode(_v2, writer.uint32(34).fork()).ldelim();
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var _iterator6 = _createForOfIteratorHelper(message.addressTableLookups),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _v3 = _step6.value;
        MessageAddressTableLookup.encode(_v3, writer.uint32(42).fork()).ldelim();
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
    var message = createBaseMessage();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = MessageHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.accountKeys.push(reader.string());
          break;
        case 3:
          message.recentBlockhash = reader.string();
          break;
        case 4:
          message.instructions.push(CompiledInstruction.decode(reader, reader.uint32()));
          break;
        case 5:
          message.addressTableLookups.push(MessageAddressTableLookup.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$accountKeys2, _object$recentBlockha2, _object$instructions2, _object$addressTableL;
    var message = createBaseMessage();
    message.header = object.header !== undefined && object.header !== null ? MessageHeader.fromPartial(object.header) : undefined;
    message.accountKeys = ((_object$accountKeys2 = object.accountKeys) === null || _object$accountKeys2 === void 0 ? void 0 : _object$accountKeys2.map(function (e) {
      return e;
    })) || [];
    message.recentBlockhash = (_object$recentBlockha2 = object.recentBlockhash) !== null && _object$recentBlockha2 !== void 0 ? _object$recentBlockha2 : "";
    message.instructions = ((_object$instructions2 = object.instructions) === null || _object$instructions2 === void 0 ? void 0 : _object$instructions2.map(function (e) {
      return CompiledInstruction.fromPartial(e);
    })) || [];
    message.addressTableLookups = ((_object$addressTableL = object.addressTableLookups) === null || _object$addressTableL === void 0 ? void 0 : _object$addressTableL.map(function (e) {
      return MessageAddressTableLookup.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.Message = Message;
function createBaseMessageHeader() {
  return {
    numRequiredSignatures: 0,
    numReadonlySignedAccounts: 0,
    numReadonlyUnsignedAccounts: 0
  };
}
var MessageHeader = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.numRequiredSignatures !== 0) {
      writer.uint32(8).uint32(message.numRequiredSignatures);
    }
    if (message.numReadonlySignedAccounts !== 0) {
      writer.uint32(16).uint32(message.numReadonlySignedAccounts);
    }
    if (message.numReadonlyUnsignedAccounts !== 0) {
      writer.uint32(24).uint32(message.numReadonlyUnsignedAccounts);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMessageHeader();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numRequiredSignatures = reader.uint32();
          break;
        case 2:
          message.numReadonlySignedAccounts = reader.uint32();
          break;
        case 3:
          message.numReadonlyUnsignedAccounts = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$numRequiredSi, _object$numReadonlySi, _object$numReadonlyUn;
    var message = createBaseMessageHeader();
    message.numRequiredSignatures = (_object$numRequiredSi = object.numRequiredSignatures) !== null && _object$numRequiredSi !== void 0 ? _object$numRequiredSi : 0;
    message.numReadonlySignedAccounts = (_object$numReadonlySi = object.numReadonlySignedAccounts) !== null && _object$numReadonlySi !== void 0 ? _object$numReadonlySi : 0;
    message.numReadonlyUnsignedAccounts = (_object$numReadonlyUn = object.numReadonlyUnsignedAccounts) !== null && _object$numReadonlyUn !== void 0 ? _object$numReadonlyUn : 0;
    return message;
  }
};
exports.MessageHeader = MessageHeader;
function createBaseCompiledInstruction() {
  return {
    programIdIndex: 0,
    accounts: [],
    data: ""
  };
}
var CompiledInstruction = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.programIdIndex !== 0) {
      writer.uint32(8).uint32(message.programIdIndex);
    }
    writer.uint32(18).fork();
    var _iterator7 = _createForOfIteratorHelper(message.accounts),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var v = _step7.value;
        writer.uint32(v);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    writer.ldelim();
    if (message.data !== "") {
      writer.uint32(26).string(message.data);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseCompiledInstruction();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.programIdIndex = reader.uint32();
          break;
        case 2:
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.accounts.push(reader.uint32());
            }
          } else {
            message.accounts.push(reader.uint32());
          }
          break;
        case 3:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$programIdInde, _object$accounts, _object$data;
    var message = createBaseCompiledInstruction();
    message.programIdIndex = (_object$programIdInde = object.programIdIndex) !== null && _object$programIdInde !== void 0 ? _object$programIdInde : 0;
    message.accounts = ((_object$accounts = object.accounts) === null || _object$accounts === void 0 ? void 0 : _object$accounts.map(function (e) {
      return e;
    })) || [];
    message.data = (_object$data = object.data) !== null && _object$data !== void 0 ? _object$data : "";
    return message;
  }
};
exports.CompiledInstruction = CompiledInstruction;
function createBaseMessageAddressTableLookup() {
  return {
    accountKey: "",
    writableIndexes: [],
    readonlyIndexes: []
  };
}
var MessageAddressTableLookup = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.accountKey !== "") {
      writer.uint32(10).string(message.accountKey);
    }
    writer.uint32(18).fork();
    var _iterator8 = _createForOfIteratorHelper(message.writableIndexes),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var v = _step8.value;
        writer.uint32(v);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    writer.ldelim();
    writer.uint32(26).fork();
    var _iterator9 = _createForOfIteratorHelper(message.readonlyIndexes),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _v4 = _step9.value;
        writer.uint32(_v4);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    writer.ldelim();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMessageAddressTableLookup();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountKey = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.writableIndexes.push(reader.uint32());
            }
          } else {
            message.writableIndexes.push(reader.uint32());
          }
          break;
        case 3:
          if ((tag & 7) === 2) {
            var _end = reader.uint32() + reader.pos;
            while (reader.pos < _end) {
              message.readonlyIndexes.push(reader.uint32());
            }
          } else {
            message.readonlyIndexes.push(reader.uint32());
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
    var _object$accountKey, _object$writableIndex, _object$readonlyIndex;
    var message = createBaseMessageAddressTableLookup();
    message.accountKey = (_object$accountKey = object.accountKey) !== null && _object$accountKey !== void 0 ? _object$accountKey : "";
    message.writableIndexes = ((_object$writableIndex = object.writableIndexes) === null || _object$writableIndex === void 0 ? void 0 : _object$writableIndex.map(function (e) {
      return e;
    })) || [];
    message.readonlyIndexes = ((_object$readonlyIndex = object.readonlyIndexes) === null || _object$readonlyIndex === void 0 ? void 0 : _object$readonlyIndex.map(function (e) {
      return e;
    })) || [];
    return message;
  }
};
exports.MessageAddressTableLookup = MessageAddressTableLookup;
function createBaseLoadedAddresses() {
  return {
    writable: [],
    readonly: []
  };
}
var LoadedAddresses = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator10 = _createForOfIteratorHelper(message.writable),
      _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var v = _step10.value;
        writer.uint32(10).string(v);
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
    var _iterator11 = _createForOfIteratorHelper(message.readonly),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _v5 = _step11.value;
        writer.uint32(18).string(_v5);
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseLoadedAddresses();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.writable.push(reader.string());
          break;
        case 2:
          message.readonly.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$writable, _object$readonly;
    var message = createBaseLoadedAddresses();
    message.writable = ((_object$writable = object.writable) === null || _object$writable === void 0 ? void 0 : _object$writable.map(function (e) {
      return e;
    })) || [];
    message.readonly = ((_object$readonly = object.readonly) === null || _object$readonly === void 0 ? void 0 : _object$readonly.map(function (e) {
      return e;
    })) || [];
    return message;
  }
};
exports.LoadedAddresses = LoadedAddresses;
function createBaseMerkleProof() {
  return {
    commitment: "",
    hash: [],
    direction: []
  };
}
var MerkleProof = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.commitment !== "") {
      writer.uint32(10).string(message.commitment);
    }
    var _iterator12 = _createForOfIteratorHelper(message.hash),
      _step12;
    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var v = _step12.value;
        writer.uint32(18).string(v);
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
    writer.uint32(26).fork();
    var _iterator13 = _createForOfIteratorHelper(message.direction),
      _step13;
    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        var _v6 = _step13.value;
        writer.int64(_v6);
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }
    writer.ldelim();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMerkleProof();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commitment = reader.string();
          break;
        case 2:
          message.hash.push(reader.string());
          break;
        case 3:
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.direction.push(reader.int64());
            }
          } else {
            message.direction.push(reader.int64());
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
    var _object$commitment, _object$hash, _object$direction;
    var message = createBaseMerkleProof();
    message.commitment = (_object$commitment = object.commitment) !== null && _object$commitment !== void 0 ? _object$commitment : "";
    message.hash = ((_object$hash = object.hash) === null || _object$hash === void 0 ? void 0 : _object$hash.map(function (e) {
      return e;
    })) || [];
    message.direction = ((_object$direction = object.direction) === null || _object$direction === void 0 ? void 0 : _object$direction.map(function (e) {
      return _helpers.Long.fromValue(e);
    })) || [];
    return message;
  }
};
exports.MerkleProof = MerkleProof;