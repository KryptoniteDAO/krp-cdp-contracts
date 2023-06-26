"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryRegisteredPairsResponse = exports.QueryRegisteredPairsRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.QueryOrderSimulationResponse = exports.QueryOrderSimulationRequest = exports.QueryGetTwapsResponse = exports.QueryGetTwapsRequest = exports.QueryGetShortBookResponse = exports.QueryGetShortBookRequest = exports.QueryGetPricesResponse = exports.QueryGetPricesRequest = exports.QueryGetPriceResponse = exports.QueryGetPriceRequest = exports.QueryGetOrdersResponse = exports.QueryGetOrdersRequest = exports.QueryGetOrderByIDResponse = exports.QueryGetOrderByIDRequest = exports.QueryGetMatchResultResponse = exports.QueryGetMatchResultRequest = exports.QueryGetMarketSummaryResponse = exports.QueryGetMarketSummaryRequest = exports.QueryGetLongBookResponse = exports.QueryGetLongBookRequest = exports.QueryGetLatestPriceResponse = exports.QueryGetLatestPriceRequest = exports.QueryGetHistoricalPricesResponse = exports.QueryGetHistoricalPricesRequest = exports.QueryAssetMetadataResponse = exports.QueryAssetMetadataRequest = exports.QueryAssetListResponse = exports.QueryAssetListRequest = exports.QueryAllShortBookResponse = exports.QueryAllShortBookRequest = exports.QueryAllLongBookResponse = exports.QueryAllLongBookRequest = void 0;
var _pagination = require("../../../cosmos/base/query/v1beta1/pagination");
var _order = require("./order");
var _params = require("./params");
var _long_book = require("./long_book");
var _short_book = require("./short_book");
var _price = require("./price");
var _twap = require("./twap");
var _asset_list = require("./asset_list");
var _pair = require("./pair");
var _match_result = require("./match_result");
var _m0 = _interopRequireWildcard(require("protobufjs/minimal"));
var _helpers = require("@osmonauts/helpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      _params.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
          message.params = _params.Params.decode(reader, reader.uint32());
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
    message.params = object.params !== undefined && object.params !== null ? _params.Params.fromPartial(object.params) : undefined;
    return message;
  }
};
exports.QueryParamsResponse = QueryParamsResponse;
function createBaseQueryGetLongBookRequest() {
  return {
    price: "",
    contractAddr: "",
    priceDenom: "",
    assetDenom: ""
  };
}
var QueryGetLongBookRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(34).string(message.assetDenom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetLongBookRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.priceDenom = reader.string();
          break;
        case 4:
          message.assetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$price, _object$contractAddr, _object$priceDenom, _object$assetDenom;
    var message = createBaseQueryGetLongBookRequest();
    message.price = (_object$price = object.price) !== null && _object$price !== void 0 ? _object$price : "";
    message.contractAddr = (_object$contractAddr = object.contractAddr) !== null && _object$contractAddr !== void 0 ? _object$contractAddr : "";
    message.priceDenom = (_object$priceDenom = object.priceDenom) !== null && _object$priceDenom !== void 0 ? _object$priceDenom : "";
    message.assetDenom = (_object$assetDenom = object.assetDenom) !== null && _object$assetDenom !== void 0 ? _object$assetDenom : "";
    return message;
  }
};
exports.QueryGetLongBookRequest = QueryGetLongBookRequest;
function createBaseQueryGetLongBookResponse() {
  return {
    LongBook: undefined
  };
}
var QueryGetLongBookResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.LongBook !== undefined) {
      _long_book.LongBook.encode(message.LongBook, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetLongBookResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.LongBook = _long_book.LongBook.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryGetLongBookResponse();
    message.LongBook = object.LongBook !== undefined && object.LongBook !== null ? _long_book.LongBook.fromPartial(object.LongBook) : undefined;
    return message;
  }
};
exports.QueryGetLongBookResponse = QueryGetLongBookResponse;
function createBaseQueryAllLongBookRequest() {
  return {
    pagination: undefined,
    contractAddr: "",
    priceDenom: "",
    assetDenom: ""
  };
}
var QueryAllLongBookRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.pagination !== undefined) {
      _pagination.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(34).string(message.assetDenom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAllLongBookRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = _pagination.PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.priceDenom = reader.string();
          break;
        case 4:
          message.assetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr2, _object$priceDenom2, _object$assetDenom2;
    var message = createBaseQueryAllLongBookRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? _pagination.PageRequest.fromPartial(object.pagination) : undefined;
    message.contractAddr = (_object$contractAddr2 = object.contractAddr) !== null && _object$contractAddr2 !== void 0 ? _object$contractAddr2 : "";
    message.priceDenom = (_object$priceDenom2 = object.priceDenom) !== null && _object$priceDenom2 !== void 0 ? _object$priceDenom2 : "";
    message.assetDenom = (_object$assetDenom2 = object.assetDenom) !== null && _object$assetDenom2 !== void 0 ? _object$assetDenom2 : "";
    return message;
  }
};
exports.QueryAllLongBookRequest = QueryAllLongBookRequest;
function createBaseQueryAllLongBookResponse() {
  return {
    LongBook: [],
    pagination: undefined
  };
}
var QueryAllLongBookResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator = _createForOfIteratorHelper(message.LongBook),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        _long_book.LongBook.encode(v, writer.uint32(10).fork()).ldelim();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (message.pagination !== undefined) {
      _pagination.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAllLongBookResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.LongBook.push(_long_book.LongBook.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = _pagination.PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$LongBook;
    var message = createBaseQueryAllLongBookResponse();
    message.LongBook = ((_object$LongBook = object.LongBook) === null || _object$LongBook === void 0 ? void 0 : _object$LongBook.map(function (e) {
      return _long_book.LongBook.fromPartial(e);
    })) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? _pagination.PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  }
};
exports.QueryAllLongBookResponse = QueryAllLongBookResponse;
function createBaseQueryGetShortBookRequest() {
  return {
    price: "",
    contractAddr: "",
    priceDenom: "",
    assetDenom: ""
  };
}
var QueryGetShortBookRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(34).string(message.assetDenom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetShortBookRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.priceDenom = reader.string();
          break;
        case 4:
          message.assetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$price2, _object$contractAddr3, _object$priceDenom3, _object$assetDenom3;
    var message = createBaseQueryGetShortBookRequest();
    message.price = (_object$price2 = object.price) !== null && _object$price2 !== void 0 ? _object$price2 : "";
    message.contractAddr = (_object$contractAddr3 = object.contractAddr) !== null && _object$contractAddr3 !== void 0 ? _object$contractAddr3 : "";
    message.priceDenom = (_object$priceDenom3 = object.priceDenom) !== null && _object$priceDenom3 !== void 0 ? _object$priceDenom3 : "";
    message.assetDenom = (_object$assetDenom3 = object.assetDenom) !== null && _object$assetDenom3 !== void 0 ? _object$assetDenom3 : "";
    return message;
  }
};
exports.QueryGetShortBookRequest = QueryGetShortBookRequest;
function createBaseQueryGetShortBookResponse() {
  return {
    ShortBook: undefined
  };
}
var QueryGetShortBookResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.ShortBook !== undefined) {
      _short_book.ShortBook.encode(message.ShortBook, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetShortBookResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ShortBook = _short_book.ShortBook.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryGetShortBookResponse();
    message.ShortBook = object.ShortBook !== undefined && object.ShortBook !== null ? _short_book.ShortBook.fromPartial(object.ShortBook) : undefined;
    return message;
  }
};
exports.QueryGetShortBookResponse = QueryGetShortBookResponse;
function createBaseQueryAllShortBookRequest() {
  return {
    pagination: undefined,
    contractAddr: "",
    priceDenom: "",
    assetDenom: ""
  };
}
var QueryAllShortBookRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.pagination !== undefined) {
      _pagination.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(34).string(message.assetDenom);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAllShortBookRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = _pagination.PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.priceDenom = reader.string();
          break;
        case 4:
          message.assetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr4, _object$priceDenom4, _object$assetDenom4;
    var message = createBaseQueryAllShortBookRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? _pagination.PageRequest.fromPartial(object.pagination) : undefined;
    message.contractAddr = (_object$contractAddr4 = object.contractAddr) !== null && _object$contractAddr4 !== void 0 ? _object$contractAddr4 : "";
    message.priceDenom = (_object$priceDenom4 = object.priceDenom) !== null && _object$priceDenom4 !== void 0 ? _object$priceDenom4 : "";
    message.assetDenom = (_object$assetDenom4 = object.assetDenom) !== null && _object$assetDenom4 !== void 0 ? _object$assetDenom4 : "";
    return message;
  }
};
exports.QueryAllShortBookRequest = QueryAllShortBookRequest;
function createBaseQueryAllShortBookResponse() {
  return {
    ShortBook: [],
    pagination: undefined
  };
}
var QueryAllShortBookResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator2 = _createForOfIteratorHelper(message.ShortBook),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        _short_book.ShortBook.encode(v, writer.uint32(10).fork()).ldelim();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (message.pagination !== undefined) {
      _pagination.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAllShortBookResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ShortBook.push(_short_book.ShortBook.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = _pagination.PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$ShortBook;
    var message = createBaseQueryAllShortBookResponse();
    message.ShortBook = ((_object$ShortBook = object.ShortBook) === null || _object$ShortBook === void 0 ? void 0 : _object$ShortBook.map(function (e) {
      return _short_book.ShortBook.fromPartial(e);
    })) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? _pagination.PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  }
};
exports.QueryAllShortBookResponse = QueryAllShortBookResponse;
function createBaseQueryGetPricesRequest() {
  return {
    priceDenom: "",
    assetDenom: "",
    contractAddr: ""
  };
}
var QueryGetPricesRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.priceDenom !== "") {
      writer.uint32(10).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(18).string(message.assetDenom);
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetPricesRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.priceDenom = reader.string();
          break;
        case 2:
          message.assetDenom = reader.string();
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
    var _object$priceDenom5, _object$assetDenom5, _object$contractAddr5;
    var message = createBaseQueryGetPricesRequest();
    message.priceDenom = (_object$priceDenom5 = object.priceDenom) !== null && _object$priceDenom5 !== void 0 ? _object$priceDenom5 : "";
    message.assetDenom = (_object$assetDenom5 = object.assetDenom) !== null && _object$assetDenom5 !== void 0 ? _object$assetDenom5 : "";
    message.contractAddr = (_object$contractAddr5 = object.contractAddr) !== null && _object$contractAddr5 !== void 0 ? _object$contractAddr5 : "";
    return message;
  }
};
exports.QueryGetPricesRequest = QueryGetPricesRequest;
function createBaseQueryGetPricesResponse() {
  return {
    prices: []
  };
}
var QueryGetPricesResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator3 = _createForOfIteratorHelper(message.prices),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var v = _step3.value;
        _price.Price.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryGetPricesResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(_price.Price.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$prices;
    var message = createBaseQueryGetPricesResponse();
    message.prices = ((_object$prices = object.prices) === null || _object$prices === void 0 ? void 0 : _object$prices.map(function (e) {
      return _price.Price.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryGetPricesResponse = QueryGetPricesResponse;
function createBaseQueryGetPriceRequest() {
  return {
    priceDenom: "",
    assetDenom: "",
    contractAddr: "",
    timestamp: _helpers.Long.UZERO
  };
}
var QueryGetPriceRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.priceDenom !== "") {
      writer.uint32(10).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(18).string(message.assetDenom);
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    if (!message.timestamp.isZero()) {
      writer.uint32(32).uint64(message.timestamp);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetPriceRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.priceDenom = reader.string();
          break;
        case 2:
          message.assetDenom = reader.string();
          break;
        case 3:
          message.contractAddr = reader.string();
          break;
        case 4:
          message.timestamp = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$priceDenom6, _object$assetDenom6, _object$contractAddr6;
    var message = createBaseQueryGetPriceRequest();
    message.priceDenom = (_object$priceDenom6 = object.priceDenom) !== null && _object$priceDenom6 !== void 0 ? _object$priceDenom6 : "";
    message.assetDenom = (_object$assetDenom6 = object.assetDenom) !== null && _object$assetDenom6 !== void 0 ? _object$assetDenom6 : "";
    message.contractAddr = (_object$contractAddr6 = object.contractAddr) !== null && _object$contractAddr6 !== void 0 ? _object$contractAddr6 : "";
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? _helpers.Long.fromValue(object.timestamp) : _helpers.Long.UZERO;
    return message;
  }
};
exports.QueryGetPriceRequest = QueryGetPriceRequest;
function createBaseQueryGetPriceResponse() {
  return {
    price: undefined,
    found: false
  };
}
var QueryGetPriceResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.price !== undefined) {
      _price.Price.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    if (message.found === true) {
      writer.uint32(16).bool(message.found);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetPriceResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = _price.Price.decode(reader, reader.uint32());
          break;
        case 2:
          message.found = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$found;
    var message = createBaseQueryGetPriceResponse();
    message.price = object.price !== undefined && object.price !== null ? _price.Price.fromPartial(object.price) : undefined;
    message.found = (_object$found = object.found) !== null && _object$found !== void 0 ? _object$found : false;
    return message;
  }
};
exports.QueryGetPriceResponse = QueryGetPriceResponse;
function createBaseQueryGetLatestPriceRequest() {
  return {
    priceDenom: "",
    assetDenom: "",
    contractAddr: ""
  };
}
var QueryGetLatestPriceRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.priceDenom !== "") {
      writer.uint32(10).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(18).string(message.assetDenom);
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetLatestPriceRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.priceDenom = reader.string();
          break;
        case 2:
          message.assetDenom = reader.string();
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
    var _object$priceDenom7, _object$assetDenom7, _object$contractAddr7;
    var message = createBaseQueryGetLatestPriceRequest();
    message.priceDenom = (_object$priceDenom7 = object.priceDenom) !== null && _object$priceDenom7 !== void 0 ? _object$priceDenom7 : "";
    message.assetDenom = (_object$assetDenom7 = object.assetDenom) !== null && _object$assetDenom7 !== void 0 ? _object$assetDenom7 : "";
    message.contractAddr = (_object$contractAddr7 = object.contractAddr) !== null && _object$contractAddr7 !== void 0 ? _object$contractAddr7 : "";
    return message;
  }
};
exports.QueryGetLatestPriceRequest = QueryGetLatestPriceRequest;
function createBaseQueryGetLatestPriceResponse() {
  return {
    price: undefined
  };
}
var QueryGetLatestPriceResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.price !== undefined) {
      _price.Price.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetLatestPriceResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = _price.Price.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryGetLatestPriceResponse();
    message.price = object.price !== undefined && object.price !== null ? _price.Price.fromPartial(object.price) : undefined;
    return message;
  }
};
exports.QueryGetLatestPriceResponse = QueryGetLatestPriceResponse;
function createBaseQueryGetTwapsRequest() {
  return {
    contractAddr: "",
    lookbackSeconds: _helpers.Long.UZERO
  };
}
var QueryGetTwapsRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    if (!message.lookbackSeconds.isZero()) {
      writer.uint32(16).uint64(message.lookbackSeconds);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetTwapsRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
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
    var _object$contractAddr8;
    var message = createBaseQueryGetTwapsRequest();
    message.contractAddr = (_object$contractAddr8 = object.contractAddr) !== null && _object$contractAddr8 !== void 0 ? _object$contractAddr8 : "";
    message.lookbackSeconds = object.lookbackSeconds !== undefined && object.lookbackSeconds !== null ? _helpers.Long.fromValue(object.lookbackSeconds) : _helpers.Long.UZERO;
    return message;
  }
};
exports.QueryGetTwapsRequest = QueryGetTwapsRequest;
function createBaseQueryGetTwapsResponse() {
  return {
    twaps: []
  };
}
var QueryGetTwapsResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator4 = _createForOfIteratorHelper(message.twaps),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var v = _step4.value;
        _twap.Twap.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryGetTwapsResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.twaps.push(_twap.Twap.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$twaps;
    var message = createBaseQueryGetTwapsResponse();
    message.twaps = ((_object$twaps = object.twaps) === null || _object$twaps === void 0 ? void 0 : _object$twaps.map(function (e) {
      return _twap.Twap.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryGetTwapsResponse = QueryGetTwapsResponse;
function createBaseQueryAssetListRequest() {
  return {};
}
var QueryAssetListRequest = {
  encode: function encode(_) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAssetListRequest();
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
    var message = createBaseQueryAssetListRequest();
    return message;
  }
};
exports.QueryAssetListRequest = QueryAssetListRequest;
function createBaseQueryAssetListResponse() {
  return {
    assetList: []
  };
}
var QueryAssetListResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator5 = _createForOfIteratorHelper(message.assetList),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var v = _step5.value;
        _asset_list.AssetMetadata.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryAssetListResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetList.push(_asset_list.AssetMetadata.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$assetList;
    var message = createBaseQueryAssetListResponse();
    message.assetList = ((_object$assetList = object.assetList) === null || _object$assetList === void 0 ? void 0 : _object$assetList.map(function (e) {
      return _asset_list.AssetMetadata.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryAssetListResponse = QueryAssetListResponse;
function createBaseQueryAssetMetadataRequest() {
  return {
    denom: ""
  };
}
var QueryAssetMetadataRequest = {
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
    var message = createBaseQueryAssetMetadataRequest();
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
    var message = createBaseQueryAssetMetadataRequest();
    message.denom = (_object$denom = object.denom) !== null && _object$denom !== void 0 ? _object$denom : "";
    return message;
  }
};
exports.QueryAssetMetadataRequest = QueryAssetMetadataRequest;
function createBaseQueryAssetMetadataResponse() {
  return {
    metadata: undefined
  };
}
var QueryAssetMetadataResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.metadata !== undefined) {
      _asset_list.AssetMetadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryAssetMetadataResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = _asset_list.AssetMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryAssetMetadataResponse();
    message.metadata = object.metadata !== undefined && object.metadata !== null ? _asset_list.AssetMetadata.fromPartial(object.metadata) : undefined;
    return message;
  }
};
exports.QueryAssetMetadataResponse = QueryAssetMetadataResponse;
function createBaseQueryRegisteredPairsRequest() {
  return {
    contractAddr: ""
  };
}
var QueryRegisteredPairsRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryRegisteredPairsRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
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
    var _object$contractAddr9;
    var message = createBaseQueryRegisteredPairsRequest();
    message.contractAddr = (_object$contractAddr9 = object.contractAddr) !== null && _object$contractAddr9 !== void 0 ? _object$contractAddr9 : "";
    return message;
  }
};
exports.QueryRegisteredPairsRequest = QueryRegisteredPairsRequest;
function createBaseQueryRegisteredPairsResponse() {
  return {
    pairs: []
  };
}
var QueryRegisteredPairsResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator6 = _createForOfIteratorHelper(message.pairs),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var v = _step6.value;
        _pair.Pair.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryRegisteredPairsResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairs.push(_pair.Pair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$pairs;
    var message = createBaseQueryRegisteredPairsResponse();
    message.pairs = ((_object$pairs = object.pairs) === null || _object$pairs === void 0 ? void 0 : _object$pairs.map(function (e) {
      return _pair.Pair.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryRegisteredPairsResponse = QueryRegisteredPairsResponse;
function createBaseQueryGetOrdersRequest() {
  return {
    contractAddr: "",
    account: ""
  };
}
var QueryGetOrdersRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetOrdersRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr10, _object$account;
    var message = createBaseQueryGetOrdersRequest();
    message.contractAddr = (_object$contractAddr10 = object.contractAddr) !== null && _object$contractAddr10 !== void 0 ? _object$contractAddr10 : "";
    message.account = (_object$account = object.account) !== null && _object$account !== void 0 ? _object$account : "";
    return message;
  }
};
exports.QueryGetOrdersRequest = QueryGetOrdersRequest;
function createBaseQueryGetOrdersResponse() {
  return {
    orders: []
  };
}
var QueryGetOrdersResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator7 = _createForOfIteratorHelper(message.orders),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var v = _step7.value;
        _order.Order.encode(v, writer.uint32(10).fork()).ldelim();
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
    var message = createBaseQueryGetOrdersResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(_order.Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$orders;
    var message = createBaseQueryGetOrdersResponse();
    message.orders = ((_object$orders = object.orders) === null || _object$orders === void 0 ? void 0 : _object$orders.map(function (e) {
      return _order.Order.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryGetOrdersResponse = QueryGetOrdersResponse;
function createBaseQueryGetOrderByIDRequest() {
  return {
    contractAddr: "",
    priceDenom: "",
    assetDenom: "",
    id: _helpers.Long.UZERO
  };
}
var QueryGetOrderByIDRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(18).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(26).string(message.assetDenom);
    }
    if (!message.id.isZero()) {
      writer.uint32(32).uint64(message.id);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetOrderByIDRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
          message.priceDenom = reader.string();
          break;
        case 3:
          message.assetDenom = reader.string();
          break;
        case 4:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr11, _object$priceDenom8, _object$assetDenom8;
    var message = createBaseQueryGetOrderByIDRequest();
    message.contractAddr = (_object$contractAddr11 = object.contractAddr) !== null && _object$contractAddr11 !== void 0 ? _object$contractAddr11 : "";
    message.priceDenom = (_object$priceDenom8 = object.priceDenom) !== null && _object$priceDenom8 !== void 0 ? _object$priceDenom8 : "";
    message.assetDenom = (_object$assetDenom8 = object.assetDenom) !== null && _object$assetDenom8 !== void 0 ? _object$assetDenom8 : "";
    message.id = object.id !== undefined && object.id !== null ? _helpers.Long.fromValue(object.id) : _helpers.Long.UZERO;
    return message;
  }
};
exports.QueryGetOrderByIDRequest = QueryGetOrderByIDRequest;
function createBaseQueryGetOrderByIDResponse() {
  return {
    order: undefined
  };
}
var QueryGetOrderByIDResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.order !== undefined) {
      _order.Order.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetOrderByIDResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = _order.Order.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryGetOrderByIDResponse();
    message.order = object.order !== undefined && object.order !== null ? _order.Order.fromPartial(object.order) : undefined;
    return message;
  }
};
exports.QueryGetOrderByIDResponse = QueryGetOrderByIDResponse;
function createBaseQueryGetHistoricalPricesRequest() {
  return {
    contractAddr: "",
    priceDenom: "",
    assetDenom: "",
    periodLengthInSeconds: _helpers.Long.UZERO,
    numOfPeriods: _helpers.Long.UZERO
  };
}
var QueryGetHistoricalPricesRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(18).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(26).string(message.assetDenom);
    }
    if (!message.periodLengthInSeconds.isZero()) {
      writer.uint32(32).uint64(message.periodLengthInSeconds);
    }
    if (!message.numOfPeriods.isZero()) {
      writer.uint32(40).uint64(message.numOfPeriods);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetHistoricalPricesRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
          message.priceDenom = reader.string();
          break;
        case 3:
          message.assetDenom = reader.string();
          break;
        case 4:
          message.periodLengthInSeconds = reader.uint64();
          break;
        case 5:
          message.numOfPeriods = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr12, _object$priceDenom9, _object$assetDenom9;
    var message = createBaseQueryGetHistoricalPricesRequest();
    message.contractAddr = (_object$contractAddr12 = object.contractAddr) !== null && _object$contractAddr12 !== void 0 ? _object$contractAddr12 : "";
    message.priceDenom = (_object$priceDenom9 = object.priceDenom) !== null && _object$priceDenom9 !== void 0 ? _object$priceDenom9 : "";
    message.assetDenom = (_object$assetDenom9 = object.assetDenom) !== null && _object$assetDenom9 !== void 0 ? _object$assetDenom9 : "";
    message.periodLengthInSeconds = object.periodLengthInSeconds !== undefined && object.periodLengthInSeconds !== null ? _helpers.Long.fromValue(object.periodLengthInSeconds) : _helpers.Long.UZERO;
    message.numOfPeriods = object.numOfPeriods !== undefined && object.numOfPeriods !== null ? _helpers.Long.fromValue(object.numOfPeriods) : _helpers.Long.UZERO;
    return message;
  }
};
exports.QueryGetHistoricalPricesRequest = QueryGetHistoricalPricesRequest;
function createBaseQueryGetHistoricalPricesResponse() {
  return {
    prices: []
  };
}
var QueryGetHistoricalPricesResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    var _iterator8 = _createForOfIteratorHelper(message.prices),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var v = _step8.value;
        _price.PriceCandlestick.encode(v, writer.uint32(10).fork()).ldelim();
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetHistoricalPricesResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(_price.PriceCandlestick.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$prices2;
    var message = createBaseQueryGetHistoricalPricesResponse();
    message.prices = ((_object$prices2 = object.prices) === null || _object$prices2 === void 0 ? void 0 : _object$prices2.map(function (e) {
      return _price.PriceCandlestick.fromPartial(e);
    })) || [];
    return message;
  }
};
exports.QueryGetHistoricalPricesResponse = QueryGetHistoricalPricesResponse;
function createBaseQueryGetMarketSummaryRequest() {
  return {
    contractAddr: "",
    priceDenom: "",
    assetDenom: "",
    lookbackInSeconds: _helpers.Long.UZERO
  };
}
var QueryGetMarketSummaryRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    if (message.priceDenom !== "") {
      writer.uint32(18).string(message.priceDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(26).string(message.assetDenom);
    }
    if (!message.lookbackInSeconds.isZero()) {
      writer.uint32(32).uint64(message.lookbackInSeconds);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetMarketSummaryRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddr = reader.string();
          break;
        case 2:
          message.priceDenom = reader.string();
          break;
        case 3:
          message.assetDenom = reader.string();
          break;
        case 4:
          message.lookbackInSeconds = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$contractAddr13, _object$priceDenom10, _object$assetDenom10;
    var message = createBaseQueryGetMarketSummaryRequest();
    message.contractAddr = (_object$contractAddr13 = object.contractAddr) !== null && _object$contractAddr13 !== void 0 ? _object$contractAddr13 : "";
    message.priceDenom = (_object$priceDenom10 = object.priceDenom) !== null && _object$priceDenom10 !== void 0 ? _object$priceDenom10 : "";
    message.assetDenom = (_object$assetDenom10 = object.assetDenom) !== null && _object$assetDenom10 !== void 0 ? _object$assetDenom10 : "";
    message.lookbackInSeconds = object.lookbackInSeconds !== undefined && object.lookbackInSeconds !== null ? _helpers.Long.fromValue(object.lookbackInSeconds) : _helpers.Long.UZERO;
    return message;
  }
};
exports.QueryGetMarketSummaryRequest = QueryGetMarketSummaryRequest;
function createBaseQueryGetMarketSummaryResponse() {
  return {
    totalVolume: "",
    totalVolumeNotional: "",
    highPrice: "",
    lowPrice: "",
    lastPrice: ""
  };
}
var QueryGetMarketSummaryResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.totalVolume !== "") {
      writer.uint32(10).string(message.totalVolume);
    }
    if (message.totalVolumeNotional !== "") {
      writer.uint32(18).string(message.totalVolumeNotional);
    }
    if (message.highPrice !== "") {
      writer.uint32(26).string(message.highPrice);
    }
    if (message.lowPrice !== "") {
      writer.uint32(34).string(message.lowPrice);
    }
    if (message.lastPrice !== "") {
      writer.uint32(42).string(message.lastPrice);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetMarketSummaryResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalVolume = reader.string();
          break;
        case 2:
          message.totalVolumeNotional = reader.string();
          break;
        case 3:
          message.highPrice = reader.string();
          break;
        case 4:
          message.lowPrice = reader.string();
          break;
        case 5:
          message.lastPrice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$totalVolume, _object$totalVolumeNo, _object$highPrice, _object$lowPrice, _object$lastPrice;
    var message = createBaseQueryGetMarketSummaryResponse();
    message.totalVolume = (_object$totalVolume = object.totalVolume) !== null && _object$totalVolume !== void 0 ? _object$totalVolume : "";
    message.totalVolumeNotional = (_object$totalVolumeNo = object.totalVolumeNotional) !== null && _object$totalVolumeNo !== void 0 ? _object$totalVolumeNo : "";
    message.highPrice = (_object$highPrice = object.highPrice) !== null && _object$highPrice !== void 0 ? _object$highPrice : "";
    message.lowPrice = (_object$lowPrice = object.lowPrice) !== null && _object$lowPrice !== void 0 ? _object$lowPrice : "";
    message.lastPrice = (_object$lastPrice = object.lastPrice) !== null && _object$lastPrice !== void 0 ? _object$lastPrice : "";
    return message;
  }
};
exports.QueryGetMarketSummaryResponse = QueryGetMarketSummaryResponse;
function createBaseQueryOrderSimulationRequest() {
  return {
    order: undefined,
    contractAddr: ""
  };
}
var QueryOrderSimulationRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.order !== undefined) {
      _order.Order.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryOrderSimulationRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = _order.Order.decode(reader, reader.uint32());
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
    var _object$contractAddr14;
    var message = createBaseQueryOrderSimulationRequest();
    message.order = object.order !== undefined && object.order !== null ? _order.Order.fromPartial(object.order) : undefined;
    message.contractAddr = (_object$contractAddr14 = object.contractAddr) !== null && _object$contractAddr14 !== void 0 ? _object$contractAddr14 : "";
    return message;
  }
};
exports.QueryOrderSimulationRequest = QueryOrderSimulationRequest;
function createBaseQueryOrderSimulationResponse() {
  return {
    ExecutedQuantity: ""
  };
}
var QueryOrderSimulationResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.ExecutedQuantity !== "") {
      writer.uint32(10).string(message.ExecutedQuantity);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryOrderSimulationResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ExecutedQuantity = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var _object$ExecutedQuant;
    var message = createBaseQueryOrderSimulationResponse();
    message.ExecutedQuantity = (_object$ExecutedQuant = object.ExecutedQuantity) !== null && _object$ExecutedQuant !== void 0 ? _object$ExecutedQuant : "";
    return message;
  }
};
exports.QueryOrderSimulationResponse = QueryOrderSimulationResponse;
function createBaseQueryGetMatchResultRequest() {
  return {
    contractAddr: ""
  };
}
var QueryGetMatchResultRequest = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.contractAddr !== "") {
      writer.uint32(10).string(message.contractAddr);
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetMatchResultRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
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
    var _object$contractAddr15;
    var message = createBaseQueryGetMatchResultRequest();
    message.contractAddr = (_object$contractAddr15 = object.contractAddr) !== null && _object$contractAddr15 !== void 0 ? _object$contractAddr15 : "";
    return message;
  }
};
exports.QueryGetMatchResultRequest = QueryGetMatchResultRequest;
function createBaseQueryGetMatchResultResponse() {
  return {
    result: undefined
  };
}
var QueryGetMatchResultResponse = {
  encode: function encode(message) {
    var writer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m0.Writer.create();
    if (message.result !== undefined) {
      _match_result.MatchResult.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode: function decode(input, length) {
    var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    var message = createBaseQueryGetMatchResultResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = _match_result.MatchResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial: function fromPartial(object) {
    var message = createBaseQueryGetMatchResultResponse();
    message.result = object.result !== undefined && object.result !== null ? _match_result.MatchResult.fromPartial(object.result) : undefined;
    return message;
  }
};
exports.QueryGetMatchResultResponse = QueryGetMatchResultResponse;