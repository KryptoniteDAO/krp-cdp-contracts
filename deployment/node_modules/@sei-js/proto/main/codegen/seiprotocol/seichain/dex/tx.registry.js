"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.load = exports.MessageComposer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _tx = require("./tx");
var registry = [["/seiprotocol.seichain.dex.MsgPlaceOrders", _tx.MsgPlaceOrders], ["/seiprotocol.seichain.dex.MsgCancelOrders", _tx.MsgCancelOrders], ["/seiprotocol.seichain.dex.MsgRegisterContract", _tx.MsgRegisterContract], ["/seiprotocol.seichain.dex.MsgContractDepositRent", _tx.MsgContractDepositRent], ["/seiprotocol.seichain.dex.MsgUnregisterContract", _tx.MsgUnregisterContract], ["/seiprotocol.seichain.dex.MsgRegisterPairs", _tx.MsgRegisterPairs], ["/seiprotocol.seichain.dex.MsgUpdatePriceTickSize", _tx.MsgUpdatePriceTickSize], ["/seiprotocol.seichain.dex.MsgUpdateQuantityTickSize", _tx.MsgUpdateQuantityTickSize]];
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
    placeOrders: function placeOrders(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgPlaceOrders",
        value: _tx.MsgPlaceOrders.encode(value).finish()
      };
    },
    cancelOrders: function cancelOrders(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgCancelOrders",
        value: _tx.MsgCancelOrders.encode(value).finish()
      };
    },
    registerContract: function registerContract(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgRegisterContract",
        value: _tx.MsgRegisterContract.encode(value).finish()
      };
    },
    contractDepositRent: function contractDepositRent(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgContractDepositRent",
        value: _tx.MsgContractDepositRent.encode(value).finish()
      };
    },
    unregisterContract: function unregisterContract(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUnregisterContract",
        value: _tx.MsgUnregisterContract.encode(value).finish()
      };
    },
    registerPairs: function registerPairs(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgRegisterPairs",
        value: _tx.MsgRegisterPairs.encode(value).finish()
      };
    },
    updatePriceTickSize: function updatePriceTickSize(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUpdatePriceTickSize",
        value: _tx.MsgUpdatePriceTickSize.encode(value).finish()
      };
    },
    updateQuantityTickSize: function updateQuantityTickSize(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUpdateQuantityTickSize",
        value: _tx.MsgUpdateQuantityTickSize.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    placeOrders: function placeOrders(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgPlaceOrders",
        value: value
      };
    },
    cancelOrders: function cancelOrders(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgCancelOrders",
        value: value
      };
    },
    registerContract: function registerContract(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgRegisterContract",
        value: value
      };
    },
    contractDepositRent: function contractDepositRent(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgContractDepositRent",
        value: value
      };
    },
    unregisterContract: function unregisterContract(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUnregisterContract",
        value: value
      };
    },
    registerPairs: function registerPairs(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgRegisterPairs",
        value: value
      };
    },
    updatePriceTickSize: function updatePriceTickSize(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUpdatePriceTickSize",
        value: value
      };
    },
    updateQuantityTickSize: function updateQuantityTickSize(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUpdateQuantityTickSize",
        value: value
      };
    }
  },
  fromPartial: {
    placeOrders: function placeOrders(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgPlaceOrders",
        value: _tx.MsgPlaceOrders.fromPartial(value)
      };
    },
    cancelOrders: function cancelOrders(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgCancelOrders",
        value: _tx.MsgCancelOrders.fromPartial(value)
      };
    },
    registerContract: function registerContract(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgRegisterContract",
        value: _tx.MsgRegisterContract.fromPartial(value)
      };
    },
    contractDepositRent: function contractDepositRent(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgContractDepositRent",
        value: _tx.MsgContractDepositRent.fromPartial(value)
      };
    },
    unregisterContract: function unregisterContract(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUnregisterContract",
        value: _tx.MsgUnregisterContract.fromPartial(value)
      };
    },
    registerPairs: function registerPairs(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgRegisterPairs",
        value: _tx.MsgRegisterPairs.fromPartial(value)
      };
    },
    updatePriceTickSize: function updatePriceTickSize(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUpdatePriceTickSize",
        value: _tx.MsgUpdatePriceTickSize.fromPartial(value)
      };
    },
    updateQuantityTickSize: function updateQuantityTickSize(value) {
      return {
        typeUrl: "/seiprotocol.seichain.dex.MsgUpdateQuantityTickSize",
        value: _tx.MsgUpdateQuantityTickSize.fromPartial(value)
      };
    }
  }
};
exports.MessageComposer = MessageComposer;