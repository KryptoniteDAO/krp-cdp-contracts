"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Value = exports.Struct_FieldsEntry = exports.Struct = exports.NullValueSDKType = exports.NullValue = exports.ListValue = void 0;
exports.nullValueFromJSON = nullValueFromJSON;
exports.nullValueToJSON = nullValueToJSON;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 */
var NullValue;
/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 */
exports.NullValue = NullValue;
(function (NullValue) {
  NullValue[NullValue["NULL_VALUE"] = 0] = "NULL_VALUE";
  NullValue[NullValue["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(NullValue || (exports.NullValue = NullValue = {}));
var NullValueSDKType;
exports.NullValueSDKType = NullValueSDKType;
(function (NullValueSDKType) {
  NullValueSDKType[NullValueSDKType["NULL_VALUE"] = 0] = "NULL_VALUE";
  NullValueSDKType[NullValueSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(NullValueSDKType || (exports.NullValueSDKType = NullValueSDKType = {}));
function nullValueFromJSON(object) {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return NullValue.NULL_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NullValue.UNRECOGNIZED;
  }
}
function nullValueToJSON(object) {
  switch (object) {
    case NullValue.NULL_VALUE:
      return "NULL_VALUE";
    default:
      return "UNKNOWN";
  }
}
function createBaseStruct_FieldsEntry() {
  return {
    key: "",
    value: undefined
  };
}
var Struct_FieldsEntry = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseStruct_FieldsEntry();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$key;
    var message = createBaseStruct_FieldsEntry();
    message.key = (_object$key = object.key) !== null && _object$key !== void 0 ? _object$key : "";
    message.value = object.value !== undefined && object.value !== null ? Value.fromPartial(object.value) : undefined;
    return message;
  }
};
exports.Struct_FieldsEntry = Struct_FieldsEntry;
function createBaseStruct() {
  return {
    fields: {}
  };
}
var Struct = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    Object.entries(message.fields).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      Struct_FieldsEntry.encode({
        key: key,
        value: value
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseStruct();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          var entry1 = Struct_FieldsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.fields[entry1.key] = entry1.value;
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
    var _object$fields;
    var message = createBaseStruct();
    message.fields = Object.entries((_object$fields = object.fields) !== null && _object$fields !== void 0 ? _object$fields : {}).reduce(function (acc, _ref3) {
      var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];
      if (value !== undefined) {
        acc[key] = Value.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  }
};
exports.Struct = Struct;
function createBaseValue() {
  return {
    nullValue: undefined,
    numberValue: undefined,
    stringValue: undefined,
    boolValue: undefined,
    structValue: undefined,
    listValue: undefined
  };
}
var Value = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.nullValue !== undefined) {
      writer.uint32(8).int32(message.nullValue);
    }
    if (message.numberValue !== undefined) {
      writer.uint32(17)["double"](message.numberValue);
    }
    if (message.stringValue !== undefined) {
      writer.uint32(26).string(message.stringValue);
    }
    if (message.boolValue !== undefined) {
      writer.uint32(32).bool(message.boolValue);
    }
    if (message.structValue !== undefined) {
      Struct.encode(message.structValue, writer.uint32(42).fork()).ldelim();
    }
    if (message.listValue !== undefined) {
      ListValue.encode(message.listValue, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nullValue = reader.int32();
          break;
        case 2:
          message.numberValue = reader["double"]();
          break;
        case 3:
          message.stringValue = reader.string();
          break;
        case 4:
          message.boolValue = reader.bool();
          break;
        case 5:
          message.structValue = Struct.decode(reader, reader.uint32());
          break;
        case 6:
          message.listValue = ListValue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$nullValue, _object$numberValue, _object$stringValue, _object$boolValue;
    var message = createBaseValue();
    message.nullValue = (_object$nullValue = object.nullValue) !== null && _object$nullValue !== void 0 ? _object$nullValue : undefined;
    message.numberValue = (_object$numberValue = object.numberValue) !== null && _object$numberValue !== void 0 ? _object$numberValue : undefined;
    message.stringValue = (_object$stringValue = object.stringValue) !== null && _object$stringValue !== void 0 ? _object$stringValue : undefined;
    message.boolValue = (_object$boolValue = object.boolValue) !== null && _object$boolValue !== void 0 ? _object$boolValue : undefined;
    message.structValue = object.structValue !== undefined && object.structValue !== null ? Struct.fromPartial(object.structValue) : undefined;
    message.listValue = object.listValue !== undefined && object.listValue !== null ? ListValue.fromPartial(object.listValue) : undefined;
    return message;
  }
};
exports.Value = Value;
function createBaseListValue() {
  return {
    values: []
  };
}
var ListValue = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator = _createForOfIteratorHelper(message.values),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        Value.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseListValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.values.push(Value.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$values;
    var message = createBaseListValue();
    message.values = ((_object$values = object.values) === null || _object$values === void 0 ? void 0 : _object$values.map(function (e) {
      return Value.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.ListValue = ListValue;