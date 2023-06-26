"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyContractInfo = exports.ContractInfoV2 = exports.ContractInfo = exports.ContractDependencyInfo = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseContractInfo() {
  return {
    codeId: _helpers.Long.UZERO,
    contractAddr: "",
    needHook: false,
    needOrderMatching: false,
    dependencies: [],
    numIncomingDependencies: _helpers.Long.ZERO
  };
}
var ContractInfo = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.codeId.isZero()) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.needHook === true) {
      writer.uint32(24).bool(message.needHook);
    }
    if (message.needOrderMatching === true) {
      writer.uint32(32).bool(message.needOrderMatching);
    }
    var _iterator = _createForOfIteratorHelper(message.dependencies),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        ContractDependencyInfo.encode(v, writer.uint32(42).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (!message.numIncomingDependencies.isZero()) {
      writer.uint32(48).int64(message.numIncomingDependencies);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseContractInfo();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.needHook = reader.bool();
          break;
        case 4:
          message.needOrderMatching = reader.bool();
          break;
        case 5:
          message.dependencies.push(ContractDependencyInfo.decode(reader, reader.uint32()));
          break;
        case 6:
          message.numIncomingDependencies = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr, _object$needHook, _object$needOrderMatc, _object$dependencies;
    var message = createBaseContractInfo();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? _helpers.Long.fromValue(object.codeId) : _helpers.Long.UZERO;
    message.contractAddr = (_object$contractAddr = object.contractAddr) !== null && _object$contractAddr !== void 0 ? _object$contractAddr : "";
    message.needHook = (_object$needHook = object.needHook) !== null && _object$needHook !== void 0 ? _object$needHook : false;
    message.needOrderMatching = (_object$needOrderMatc = object.needOrderMatching) !== null && _object$needOrderMatc !== void 0 ? _object$needOrderMatc : false;
    message.dependencies = ((_object$dependencies = object.dependencies) === null || _object$dependencies === void 0 ? void 0 : _object$dependencies.map(function (e) {
      return ContractDependencyInfo.fromPartial(e);
    })) || [];
    message.numIncomingDependencies = object.numIncomingDependencies !== undefined && object.numIncomingDependencies !== null ? _helpers.Long.fromValue(object.numIncomingDependencies) : _helpers.Long.ZERO;
    return message;
  }
};
exports.ContractInfo = ContractInfo;
function createBaseContractInfoV2() {
  return {
    codeId: _helpers.Long.UZERO,
    contractAddr: "",
    needHook: false,
    needOrderMatching: false,
    dependencies: [],
    numIncomingDependencies: _helpers.Long.ZERO,
    creator: "",
    rentBalance: _helpers.Long.UZERO
  };
}
var ContractInfoV2 = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.codeId.isZero()) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.needHook === true) {
      writer.uint32(24).bool(message.needHook);
    }
    if (message.needOrderMatching === true) {
      writer.uint32(32).bool(message.needOrderMatching);
    }
    var _iterator2 = _createForOfIteratorHelper(message.dependencies),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        ContractDependencyInfo.encode(v, writer.uint32(42).fork()).ldelim();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (!message.numIncomingDependencies.isZero()) {
      writer.uint32(48).int64(message.numIncomingDependencies);
    }
    if (message.creator !== "") {
      writer.uint32(58).string(message.creator);
    }
    if (!message.rentBalance.isZero()) {
      writer.uint32(64).uint64(message.rentBalance);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseContractInfoV2();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.needHook = reader.bool();
          break;
        case 4:
          message.needOrderMatching = reader.bool();
          break;
        case 5:
          message.dependencies.push(ContractDependencyInfo.decode(reader, reader.uint32()));
          break;
        case 6:
          message.numIncomingDependencies = reader.int64();
          break;
        case 7:
          message.creator = reader.string();
          break;
        case 8:
          message.rentBalance = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr2, _object$needHook2, _object$needOrderMatc2, _object$dependencies2, _object$creator;
    var message = createBaseContractInfoV2();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? _helpers.Long.fromValue(object.codeId) : _helpers.Long.UZERO;
    message.contractAddr = (_object$contractAddr2 = object.contractAddr) !== null && _object$contractAddr2 !== void 0 ? _object$contractAddr2 : "";
    message.needHook = (_object$needHook2 = object.needHook) !== null && _object$needHook2 !== void 0 ? _object$needHook2 : false;
    message.needOrderMatching = (_object$needOrderMatc2 = object.needOrderMatching) !== null && _object$needOrderMatc2 !== void 0 ? _object$needOrderMatc2 : false;
    message.dependencies = ((_object$dependencies2 = object.dependencies) === null || _object$dependencies2 === void 0 ? void 0 : _object$dependencies2.map(function (e) {
      return ContractDependencyInfo.fromPartial(e);
    })) || [];
    message.numIncomingDependencies = object.numIncomingDependencies !== undefined && object.numIncomingDependencies !== null ? _helpers.Long.fromValue(object.numIncomingDependencies) : _helpers.Long.ZERO;
    message.creator = (_object$creator = object.creator) !== null && _object$creator !== void 0 ? _object$creator : "";
    message.rentBalance = object.rentBalance !== undefined && object.rentBalance !== null ? _helpers.Long.fromValue(object.rentBalance) : _helpers.Long.UZERO;
    return message;
  }
};
exports.ContractInfoV2 = ContractInfoV2;
function createBaseContractDependencyInfo() {
  return {
    dependency: "",
    immediateElderSibling: "",
    immediateYoungerSibling: ""
  };
}
var ContractDependencyInfo = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.dependency !== "") {
      writer.uint32(10).string(message.dependency);
    }
    if (message.immediateElderSibling !== "") {
      writer.uint32(18).string(message.immediateElderSibling);
    }
    if (message.immediateYoungerSibling !== "") {
      writer.uint32(26).string(message.immediateYoungerSibling);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseContractDependencyInfo();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dependency = reader.string();
          break;
        case 2:
          message.immediateElderSibling = reader.string();
          break;
        case 3:
          message.immediateYoungerSibling = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$dependency, _object$immediateElde, _object$immediateYoun;
    var message = createBaseContractDependencyInfo();
    message.dependency = (_object$dependency = object.dependency) !== null && _object$dependency !== void 0 ? _object$dependency : "";
    message.immediateElderSibling = (_object$immediateElde = object.immediateElderSibling) !== null && _object$immediateElde !== void 0 ? _object$immediateElde : "";
    message.immediateYoungerSibling = (_object$immediateYoun = object.immediateYoungerSibling) !== null && _object$immediateYoun !== void 0 ? _object$immediateYoun : "";
    return message;
  }
};
exports.ContractDependencyInfo = ContractDependencyInfo;
function createBaseLegacyContractInfo() {
  return {
    codeId: _helpers.Long.UZERO,
    contractAddr: "",
    needHook: false,
    needOrderMatching: false,
    dependentContractAddrs: []
  };
}
var LegacyContractInfo = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.codeId.isZero()) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.needHook === true) {
      writer.uint32(24).bool(message.needHook);
    }
    if (message.needOrderMatching === true) {
      writer.uint32(32).bool(message.needOrderMatching);
    }
    var _iterator3 = _createForOfIteratorHelper(message.dependentContractAddrs),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var v = _step3.value;
        writer.uint32(42).string(v);
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
    var message = createBaseLegacyContractInfo();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.needHook = reader.bool();
          break;
        case 4:
          message.needOrderMatching = reader.bool();
          break;
        case 5:
          message.dependentContractAddrs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr3, _object$needHook3, _object$needOrderMatc3, _object$dependentCont;
    var message = createBaseLegacyContractInfo();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? _helpers.Long.fromValue(object.codeId) : _helpers.Long.UZERO;
    message.contractAddr = (_object$contractAddr3 = object.contractAddr) !== null && _object$contractAddr3 !== void 0 ? _object$contractAddr3 : "";
    message.needHook = (_object$needHook3 = object.needHook) !== null && _object$needHook3 !== void 0 ? _object$needHook3 : false;
    message.needOrderMatching = (_object$needOrderMatc3 = object.needOrderMatching) !== null && _object$needOrderMatc3 !== void 0 ? _object$needOrderMatc3 : false;
    message.dependentContractAddrs = ((_object$dependentCont = object.dependentContractAddrs) === null || _object$dependentCont === void 0 ? void 0 : _object$dependentCont.map(function (e) {
      return e;
    })) || [];
    return message;
  }
};
exports.LegacyContractInfo = LegacyContractInfo;