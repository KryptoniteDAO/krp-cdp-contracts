"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AminoConverter = void 0;
var AminoConverter = {
  "/cosmos.slashing.v1beta1.MsgUnjail": {
    aminoType: "cosmos-sdk/MsgUnjail",
    toAmino: function toAmino(_ref) {
      var validatorAddr = _ref.validatorAddr;
      return {
        validator_addr: validatorAddr
      };
    },
    fromAmino: function fromAmino(_ref2) {
      var validator_addr = _ref2.validator_addr;
      return {
        validatorAddr: validator_addr
      };
    }
  }
};
exports.AminoConverter = AminoConverter;