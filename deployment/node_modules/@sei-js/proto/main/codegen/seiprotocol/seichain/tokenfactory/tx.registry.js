"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.load = exports.MessageComposer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _tx = require("./tx");
var registry = [["/seiprotocol.seichain.tokenfactory.MsgCreateDenom", _tx.MsgCreateDenom], ["/seiprotocol.seichain.tokenfactory.MsgMint", _tx.MsgMint], ["/seiprotocol.seichain.tokenfactory.MsgBurn", _tx.MsgBurn], ["/seiprotocol.seichain.tokenfactory.MsgChangeAdmin", _tx.MsgChangeAdmin]];
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
    createDenom: function createDenom(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgCreateDenom",
        value: _tx.MsgCreateDenom.encode(value).finish()
      };
    },
    mint: function mint(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgMint",
        value: _tx.MsgMint.encode(value).finish()
      };
    },
    burn: function burn(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgBurn",
        value: _tx.MsgBurn.encode(value).finish()
      };
    },
    changeAdmin: function changeAdmin(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin",
        value: _tx.MsgChangeAdmin.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createDenom: function createDenom(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgCreateDenom",
        value: value
      };
    },
    mint: function mint(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgMint",
        value: value
      };
    },
    burn: function burn(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgBurn",
        value: value
      };
    },
    changeAdmin: function changeAdmin(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin",
        value: value
      };
    }
  },
  fromPartial: {
    createDenom: function createDenom(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgCreateDenom",
        value: _tx.MsgCreateDenom.fromPartial(value)
      };
    },
    mint: function mint(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgMint",
        value: _tx.MsgMint.fromPartial(value)
      };
    },
    burn: function burn(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgBurn",
        value: _tx.MsgBurn.fromPartial(value)
      };
    },
    changeAdmin: function changeAdmin(value) {
      return {
        typeUrl: "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin",
        value: _tx.MsgChangeAdmin.fromPartial(value)
      };
    }
  }
};
exports.MessageComposer = MessageComposer;