"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgUpdateTickSizeResponse = exports.MsgUpdateQuantityTickSize = exports.MsgUpdatePriceTickSize = exports.MsgUnregisterContractResponse = exports.MsgUnregisterContract = exports.MsgRegisterPairsResponse = exports.MsgRegisterPairs = exports.MsgRegisterContractResponse = exports.MsgRegisterContract = exports.MsgPlaceOrdersResponse = exports.MsgPlaceOrders = exports.MsgContractDepositRentResponse = exports.MsgContractDepositRent = exports.MsgCancelOrdersResponse = exports.MsgCancelOrders = void 0;
var _order = require("./order");
var _coin = require("../../../cosmos/base/v1beta1/coin");
var _contract = require("./contract");
var _pair = require("./pair");
var _tick_size = require("./tick_size");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createBaseMsgPlaceOrders() {
  return {
    creator: "",
    orders: [],
    contractAddr: "",
    funds: []
  };
}
var MsgPlaceOrders = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    var _iterator = _createForOfIteratorHelper(message.orders),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        _order.Order.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    var _iterator2 = _createForOfIteratorHelper(message.funds),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _v = _step2.value;
        _coin.Coin.encode(_v, writer.uint32(34).fork()).ldelim();
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
    var message = createBaseMsgPlaceOrders();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.orders.push(_order.Order.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contractAddr = reader.string();
          break;
        case 4:
          message.funds.push(_coin.Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator, _object$orders, _object$contractAddr, _object$funds;
    var message = createBaseMsgPlaceOrders();
    message.creator = (_object$creator = object.creator) !== null && _object$creator !== void 0 ? _object$creator : "";
    message.orders = ((_object$orders = object.orders) === null || _object$orders === void 0 ? void 0 : _object$orders.map(function (e) {
      return _order.Order.fromPartial(e);
    })) || [];
    message.contractAddr = (_object$contractAddr = object.contractAddr) !== null && _object$contractAddr !== void 0 ? _object$contractAddr : "";
    message.funds = ((_object$funds = object.funds) === null || _object$funds === void 0 ? void 0 : _object$funds.map(function (e) {
      return _coin.Coin.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.MsgPlaceOrders = MsgPlaceOrders;
function createBaseMsgPlaceOrdersResponse() {
  return {
    orderIds: []
  };
}
var MsgPlaceOrdersResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    writer.uint32(10).fork();
    var _iterator3 = _createForOfIteratorHelper(message.orderIds),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var v = _step3.value;
        writer.uint64(v);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    writer.ldelim();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgPlaceOrdersResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.orderIds.push(reader.uint64());
            }
          } else {
            message.orderIds.push(reader.uint64());
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
    var _object$orderIds;
    var message = createBaseMsgPlaceOrdersResponse();
    message.orderIds = ((_object$orderIds = object.orderIds) === null || _object$orderIds === void 0 ? void 0 : _object$orderIds.map(function (e) {
      return _helpers.Long.fromValue(e);
    })) || [];
    return message;
  }
};
exports.MsgPlaceOrdersResponse = MsgPlaceOrdersResponse;
function createBaseMsgCancelOrders() {
  return {
    creator: "",
    cancellations: [],
    contractAddr: ""
  };
}
var MsgCancelOrders = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    var _iterator4 = _createForOfIteratorHelper(message.cancellations),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var v = _step4.value;
        _order.Cancellation.encode(v, writer.uint32(18).fork()).ldelim();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgCancelOrders();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cancellations.push(_order.Cancellation.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contractAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator2, _object$cancellations, _object$contractAddr2;
    var message = createBaseMsgCancelOrders();
    message.creator = (_object$creator2 = object.creator) !== null && _object$creator2 !== void 0 ? _object$creator2 : "";
    message.cancellations = ((_object$cancellations = object.cancellations) === null || _object$cancellations === void 0 ? void 0 : _object$cancellations.map(function (e) {
      return _order.Cancellation.fromPartial(e);
    })) || [];
    message.contractAddr = (_object$contractAddr2 = object.contractAddr) !== null && _object$contractAddr2 !== void 0 ? _object$contractAddr2 : "";
    return message;
  }
};
exports.MsgCancelOrders = MsgCancelOrders;
function createBaseMsgCancelOrdersResponse() {
  return {};
}
var MsgCancelOrdersResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgCancelOrdersResponse();
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
    var message = createBaseMsgCancelOrdersResponse();
    return message;
  }
};
exports.MsgCancelOrdersResponse = MsgCancelOrdersResponse;
function createBaseMsgRegisterContract() {
  return {
    creator: "",
    contract: undefined
  };
}
var MsgRegisterContract = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.contract !== undefined) {
      _contract.ContractInfoV2.encode(message.contract, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgRegisterContract();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.contract = _contract.ContractInfoV2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator3;
    var message = createBaseMsgRegisterContract();
    message.creator = (_object$creator3 = object.creator) !== null && _object$creator3 !== void 0 ? _object$creator3 : "";
    message.contract = object.contract !== undefined && object.contract !== null ? _contract.ContractInfoV2.fromPartial(object.contract) : undefined;
    return message;
  }
};
exports.MsgRegisterContract = MsgRegisterContract;
function createBaseMsgRegisterContractResponse() {
  return {};
}
var MsgRegisterContractResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgRegisterContractResponse();
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
    var message = createBaseMsgRegisterContractResponse();
    return message;
  }
};
exports.MsgRegisterContractResponse = MsgRegisterContractResponse;
function createBaseMsgContractDepositRent() {
  return {
    contractAddr: "",
    amount: _helpers.Long.UZERO,
    sender: ""
  };
}
var MsgContractDepositRent = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    if (!message.amount.isZero()) {
      writer.uint32(16).uint64(message.amount);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgContractDepositRent();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
          message.amount = reader.uint64();
          break;
        case 3:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr3, _object$sender;
    var message = createBaseMsgContractDepositRent();
    message.contractAddr = (_object$contractAddr3 = object.contractAddr) !== null && _object$contractAddr3 !== void 0 ? _object$contractAddr3 : "";
    message.amount = object.amount !== undefined && object.amount !== null ? _helpers.Long.fromValue(object.amount) : _helpers.Long.UZERO;
    message.sender = (_object$sender = object.sender) !== null && _object$sender !== void 0 ? _object$sender : "";
    return message;
  }
};
exports.MsgContractDepositRent = MsgContractDepositRent;
function createBaseMsgContractDepositRentResponse() {
  return {};
}
var MsgContractDepositRentResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgContractDepositRentResponse();
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
    var message = createBaseMsgContractDepositRentResponse();
    return message;
  }
};
exports.MsgContractDepositRentResponse = MsgContractDepositRentResponse;
function createBaseMsgUnregisterContract() {
  return {
    creator: "",
    contractAddr: ""
  };
}
var MsgUnregisterContract = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgUnregisterContract();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator4, _object$contractAddr4;
    var message = createBaseMsgUnregisterContract();
    message.creator = (_object$creator4 = object.creator) !== null && _object$creator4 !== void 0 ? _object$creator4 : "";
    message.contractAddr = (_object$contractAddr4 = object.contractAddr) !== null && _object$contractAddr4 !== void 0 ? _object$contractAddr4 : "";
    return message;
  }
};
exports.MsgUnregisterContract = MsgUnregisterContract;
function createBaseMsgUnregisterContractResponse() {
  return {};
}
var MsgUnregisterContractResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgUnregisterContractResponse();
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
    var message = createBaseMsgUnregisterContractResponse();
    return message;
  }
};
exports.MsgUnregisterContractResponse = MsgUnregisterContractResponse;
function createBaseMsgRegisterPairs() {
  return {
    creator: "",
    batchcontractpair: []
  };
}
var MsgRegisterPairs = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    var _iterator5 = _createForOfIteratorHelper(message.batchcontractpair),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var v = _step5.value;
        _pair.BatchContractPair.encode(v, writer.uint32(26).fork()).ldelim();
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
    var message = createBaseMsgRegisterPairs();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 3:
          message.batchcontractpair.push(_pair.BatchContractPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator5, _object$batchcontract;
    var message = createBaseMsgRegisterPairs();
    message.creator = (_object$creator5 = object.creator) !== null && _object$creator5 !== void 0 ? _object$creator5 : "";
    message.batchcontractpair = ((_object$batchcontract = object.batchcontractpair) === null || _object$batchcontract === void 0 ? void 0 : _object$batchcontract.map(function (e) {
      return _pair.BatchContractPair.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.MsgRegisterPairs = MsgRegisterPairs;
function createBaseMsgRegisterPairsResponse() {
  return {};
}
var MsgRegisterPairsResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgRegisterPairsResponse();
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
    var message = createBaseMsgRegisterPairsResponse();
    return message;
  }
};
exports.MsgRegisterPairsResponse = MsgRegisterPairsResponse;
function createBaseMsgUpdatePriceTickSize() {
  return {
    creator: "",
    tickSizeList: []
  };
}
var MsgUpdatePriceTickSize = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    var _iterator6 = _createForOfIteratorHelper(message.tickSizeList),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var v = _step6.value;
        _tick_size.TickSize.encode(v, writer.uint32(18).fork()).ldelim();
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
    var message = createBaseMsgUpdatePriceTickSize();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.tickSizeList.push(_tick_size.TickSize.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator6, _object$tickSizeList;
    var message = createBaseMsgUpdatePriceTickSize();
    message.creator = (_object$creator6 = object.creator) !== null && _object$creator6 !== void 0 ? _object$creator6 : "";
    message.tickSizeList = ((_object$tickSizeList = object.tickSizeList) === null || _object$tickSizeList === void 0 ? void 0 : _object$tickSizeList.map(function (e) {
      return _tick_size.TickSize.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.MsgUpdatePriceTickSize = MsgUpdatePriceTickSize;
function createBaseMsgUpdateQuantityTickSize() {
  return {
    creator: "",
    tickSizeList: []
  };
}
var MsgUpdateQuantityTickSize = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    var _iterator7 = _createForOfIteratorHelper(message.tickSizeList),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var v = _step7.value;
        _tick_size.TickSize.encode(v, writer.uint32(18).fork()).ldelim();
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
    var message = createBaseMsgUpdateQuantityTickSize();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.tickSizeList.push(_tick_size.TickSize.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$creator7, _object$tickSizeList2;
    var message = createBaseMsgUpdateQuantityTickSize();
    message.creator = (_object$creator7 = object.creator) !== null && _object$creator7 !== void 0 ? _object$creator7 : "";
    message.tickSizeList = ((_object$tickSizeList2 = object.tickSizeList) === null || _object$tickSizeList2 === void 0 ? void 0 : _object$tickSizeList2.map(function (e) {
      return _tick_size.TickSize.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.MsgUpdateQuantityTickSize = MsgUpdateQuantityTickSize;
function createBaseMsgUpdateTickSizeResponse() {
  return {};
}
var MsgUpdateTickSizeResponse = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseMsgUpdateTickSizeResponse();
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
    var message = createBaseMsgUpdateTickSizeResponse();
    return message;
  }
};
exports.MsgUpdateTickSizeResponse = MsgUpdateTickSizeResponse;