"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AminoConverter = void 0;
var _helpers = require("@osmonauts/helpers");
var AminoConverter = {
  "/seiprotocol.seichain.tokenfactory.MsgCreateDenom": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgCreateDenom",
    toAmino: function toAmino(_ref) {
      var sender = _ref.sender,
        subdenom = _ref.subdenom;
      return {
        sender: sender,
        subdenom: subdenom
      };
    },
    fromAmino: function fromAmino(_ref2) {
      var sender = _ref2.sender,
        subdenom = _ref2.subdenom;
      return {
        sender: sender,
        subdenom: subdenom
      };
    }
  },
  "/seiprotocol.seichain.tokenfactory.MsgMint": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgMint",
    toAmino: function toAmino(_ref3) {
      var sender = _ref3.sender,
        amount = _ref3.amount;
      return {
        sender: sender,
        amount: {
          denom: amount.denom,
          amount: _helpers.Long.fromNumber(amount.amount).toString()
        }
      };
    },
    fromAmino: function fromAmino(_ref4) {
      var sender = _ref4.sender,
        amount = _ref4.amount;
      return {
        sender: sender,
        amount: {
          denom: amount.denom,
          amount: amount.amount
        }
      };
    }
  },
  "/seiprotocol.seichain.tokenfactory.MsgBurn": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgBurn",
    toAmino: function toAmino(_ref5) {
      var sender = _ref5.sender,
        amount = _ref5.amount;
      return {
        sender: sender,
        amount: {
          denom: amount.denom,
          amount: _helpers.Long.fromNumber(amount.amount).toString()
        }
      };
    },
    fromAmino: function fromAmino(_ref6) {
      var sender = _ref6.sender,
        amount = _ref6.amount;
      return {
        sender: sender,
        amount: {
          denom: amount.denom,
          amount: amount.amount
        }
      };
    }
  },
  "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin",
    toAmino: function toAmino(_ref7) {
      var sender = _ref7.sender,
        denom = _ref7.denom,
        newAdmin = _ref7.newAdmin;
      return {
        sender: sender,
        denom: denom,
        new_admin: newAdmin
      };
    },
    fromAmino: function fromAmino(_ref8) {
      var sender = _ref8.sender,
        denom = _ref8.denom,
        new_admin = _ref8.new_admin;
      return {
        sender: sender,
        denom: denom,
        newAdmin: new_admin
      };
    }
  }
};
exports.AminoConverter = AminoConverter;