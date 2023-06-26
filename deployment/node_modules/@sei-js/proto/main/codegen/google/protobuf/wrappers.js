"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UInt64Value = exports.UInt32Value = exports.StringValue = exports.Int64Value = exports.Int32Value = exports.FloatValue = exports.DoubleValue = exports.BytesValue = exports.BoolValue = void 0;
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createBaseDoubleValue() {
  return {
    value: 0
  };
}
var DoubleValue = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value !== 0) {
      writer.uint32(9)["double"](message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseDoubleValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader["double"]();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value;
    var message = createBaseDoubleValue();
    message.value = (_object$value = object.value) !== null && _object$value !== void 0 ? _object$value : 0;
    return message;
  }
};
exports.DoubleValue = DoubleValue;
function createBaseFloatValue() {
  return {
    value: 0
  };
}
var FloatValue = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value !== 0) {
      writer.uint32(13)["float"](message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseFloatValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader["float"]();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value2;
    var message = createBaseFloatValue();
    message.value = (_object$value2 = object.value) !== null && _object$value2 !== void 0 ? _object$value2 : 0;
    return message;
  }
};
exports.FloatValue = FloatValue;
function createBaseInt64Value() {
  return {
    value: _helpers.Long.ZERO
  };
}
var Int64Value = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.value.isZero()) {
      writer.uint32(8).int64(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseInt64Value();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseInt64Value();
    message.value = object.value !== undefined && object.value !== null ? _helpers.Long.fromValue(object.value) : _helpers.Long.ZERO;
    return message;
  }
};
exports.Int64Value = Int64Value;
function createBaseUInt64Value() {
  return {
    value: _helpers.Long.UZERO
  };
}
var UInt64Value = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (!message.value.isZero()) {
      writer.uint32(8).uint64(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseUInt64Value();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseUInt64Value();
    message.value = object.value !== undefined && object.value !== null ? _helpers.Long.fromValue(object.value) : _helpers.Long.UZERO;
    return message;
  }
};
exports.UInt64Value = UInt64Value;
function createBaseInt32Value() {
  return {
    value: 0
  };
}
var Int32Value = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseInt32Value();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value3;
    var message = createBaseInt32Value();
    message.value = (_object$value3 = object.value) !== null && _object$value3 !== void 0 ? _object$value3 : 0;
    return message;
  }
};
exports.Int32Value = Int32Value;
function createBaseUInt32Value() {
  return {
    value: 0
  };
}
var UInt32Value = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value !== 0) {
      writer.uint32(8).uint32(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseUInt32Value();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value4;
    var message = createBaseUInt32Value();
    message.value = (_object$value4 = object.value) !== null && _object$value4 !== void 0 ? _object$value4 : 0;
    return message;
  }
};
exports.UInt32Value = UInt32Value;
function createBaseBoolValue() {
  return {
    value: false
  };
}
var BoolValue = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value === true) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseBoolValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value5;
    var message = createBaseBoolValue();
    message.value = (_object$value5 = object.value) !== null && _object$value5 !== void 0 ? _object$value5 : false;
    return message;
  }
};
exports.BoolValue = BoolValue;
function createBaseStringValue() {
  return {
    value: ""
  };
}
var StringValue = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseStringValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value6;
    var message = createBaseStringValue();
    message.value = (_object$value6 = object.value) !== null && _object$value6 !== void 0 ? _object$value6 : "";
    return message;
  }
};
exports.StringValue = StringValue;
function createBaseBytesValue() {
  return {
    value: new Uint8Array()
  };
}
var BytesValue = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseBytesValue();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$value7;
    var message = createBaseBytesValue();
    message.value = (_object$value7 = object.value) !== null && _object$value7 !== void 0 ? _object$value7 : new Uint8Array();
    return message;
  }
};
exports.BytesValue = BytesValue;