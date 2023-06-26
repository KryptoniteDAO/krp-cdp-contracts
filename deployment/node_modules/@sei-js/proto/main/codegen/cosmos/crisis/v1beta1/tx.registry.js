"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.load = exports.MessageComposer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _tx = require("./tx");
var registry = [["/cosmos.crisis.v1beta1.MsgVerifyInvariant", _tx.MsgVerifyInvariant]];
exports.registry = registry;
var load = function load(protoRegistry) {
  registry.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      typeUrl = _ref2[0],
      mod = _ref2[1];
    protoRegistry.register(typeUrl, mod);
  });
};
exports.load = load;
var MessageComposer = {
  encoded: {
    verifyInvariant: function verifyInvariant(value) {
      return {
        typeUrl: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
        value: _tx.MsgVerifyInvariant.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    verifyInvariant: function verifyInvariant(value) {
      return {
        typeUrl: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
        value: value
      };
    }
  },
  fromPartial: {
    verifyInvariant: function verifyInvariant(value) {
      return {
        typeUrl: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
        value: _tx.MsgVerifyInvariant.fromPartial(value)
      };
    }
  }
};
exports.MessageComposer = MessageComposer;