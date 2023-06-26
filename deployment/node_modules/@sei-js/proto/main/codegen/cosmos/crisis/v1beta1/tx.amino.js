"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AminoConverter = void 0;
var AminoConverter = {
  "/cosmos.crisis.v1beta1.MsgVerifyInvariant": {
    aminoType: "cosmos-sdk/MsgVerifyInvariant",
    toAmino: function toAmino(_ref) {
      var sender = _ref.sender,
        invariantModuleName = _ref.invariantModuleName,
        invariantRoute = _ref.invariantRoute;
      return {
        sender: sender,
        invariant_module_name: invariantModuleName,
        invariant_route: invariantRoute
      };
    },
    fromAmino: function fromAmino(_ref2) {
      var sender = _ref2.sender,
        invariant_module_name = _ref2.invariant_module_name,
        invariant_route = _ref2.invariant_route;
      return {
        sender: sender,
        invariantModuleName: invariant_module_name,
        invariantRoute: invariant_route
      };
    }
  }
};
exports.AminoConverter = AminoConverter;