"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AminoConverter = void 0;
var _helpers = require("@osmonauts/helpers");
var _enums = require("./enums");
var AminoConverter = {
  "/seiprotocol.seichain.dex.MsgPlaceOrders": {
    aminoType: "/seiprotocol.seichain.dex.MsgPlaceOrders",
    toAmino: function toAmino(_ref) {
      var creator = _ref.creator,
        orders = _ref.orders,
        contractAddr = _ref.contractAddr,
        funds = _ref.funds;
      return {
        creator: creator,
        orders: orders.map(function (el0) {
          return {
            id: el0.id.toString(),
            status: el0.status,
            account: el0.account,
            contractAddr: el0.contractAddr,
            price: el0.price,
            quantity: el0.quantity,
            priceDenom: el0.priceDenom,
            assetDenom: el0.assetDenom,
            orderType: el0.orderType,
            positionDirection: el0.positionDirection,
            data: el0.data,
            statusDescription: el0.statusDescription,
            nominal: el0.nominal,
            triggerPrice: el0.triggerPrice,
            triggerStatus: el0.triggerStatus
          };
        }),
        contractAddr: contractAddr,
        funds: funds.map(function (el0) {
          return {
            denom: el0.denom,
            amount: el0.amount
          };
        })
      };
    },
    fromAmino: function fromAmino(_ref2) {
      var creator = _ref2.creator,
        orders = _ref2.orders,
        contractAddr = _ref2.contractAddr,
        funds = _ref2.funds;
      return {
        creator: creator,
        orders: orders.map(function (el0) {
          return {
            id: _helpers.Long.fromString(el0.id),
            status: (0, _enums.orderStatusFromJSON)(el0.status),
            account: el0.account,
            contractAddr: el0.contractAddr,
            price: el0.price,
            quantity: el0.quantity,
            priceDenom: el0.priceDenom,
            assetDenom: el0.assetDenom,
            orderType: (0, _enums.orderTypeFromJSON)(el0.orderType),
            positionDirection: (0, _enums.positionDirectionFromJSON)(el0.positionDirection),
            data: el0.data,
            statusDescription: el0.statusDescription,
            nominal: el0.nominal,
            triggerPrice: el0.triggerPrice,
            triggerStatus: el0.triggerStatus
          };
        }),
        contractAddr: contractAddr,
        funds: funds.map(function (el0) {
          return {
            denom: el0.denom,
            amount: el0.amount
          };
        })
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgCancelOrders": {
    aminoType: "/seiprotocol.seichain.dex.MsgCancelOrders",
    toAmino: function toAmino(_ref3) {
      var creator = _ref3.creator,
        cancellations = _ref3.cancellations,
        contractAddr = _ref3.contractAddr;
      return {
        creator: creator,
        cancellations: cancellations.map(function (el0) {
          return {
            id: el0.id.toString(),
            initiator: el0.initiator,
            creator: el0.creator,
            contractAddr: el0.contractAddr,
            priceDenom: el0.priceDenom,
            assetDenom: el0.assetDenom,
            positionDirection: el0.positionDirection,
            price: el0.price
          };
        }),
        contractAddr: contractAddr
      };
    },
    fromAmino: function fromAmino(_ref4) {
      var creator = _ref4.creator,
        cancellations = _ref4.cancellations,
        contractAddr = _ref4.contractAddr;
      return {
        creator: creator,
        cancellations: cancellations.map(function (el0) {
          return {
            id: _helpers.Long.fromString(el0.id),
            initiator: (0, _enums.cancellationInitiatorFromJSON)(el0.initiator),
            creator: el0.creator,
            contractAddr: el0.contractAddr,
            priceDenom: el0.priceDenom,
            assetDenom: el0.assetDenom,
            positionDirection: (0, _enums.positionDirectionFromJSON)(el0.positionDirection),
            price: el0.price
          };
        }),
        contractAddr: contractAddr
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgRegisterContract": {
    aminoType: "/seiprotocol.seichain.dex.MsgRegisterContract",
    toAmino: function toAmino(_ref5) {
      var creator = _ref5.creator,
        contract = _ref5.contract;
      return {
        creator: creator,
        contract: {
          codeId: contract.codeId.toString(),
          contractAddr: contract.contractAddr,
          needHook: contract.needHook,
          needOrderMatching: contract.needOrderMatching,
          dependencies: contract.dependencies.map(function (el0) {
            return {
              dependency: el0.dependency,
              immediateElderSibling: el0.immediateElderSibling,
              immediateYoungerSibling: el0.immediateYoungerSibling
            };
          }),
          numIncomingDependencies: contract.numIncomingDependencies.toString(),
          creator: contract.creator,
          rentBalance: contract.rentBalance.toString()
        }
      };
    },
    fromAmino: function fromAmino(_ref6) {
      var creator = _ref6.creator,
        contract = _ref6.contract;
      return {
        creator: creator,
        contract: {
          codeId: _helpers.Long.fromString(contract.codeId),
          contractAddr: contract.contractAddr,
          needHook: contract.needHook,
          needOrderMatching: contract.needOrderMatching,
          dependencies: contract.dependencies.map(function (el1) {
            return {
              dependency: el1.dependency,
              immediateElderSibling: el1.immediateElderSibling,
              immediateYoungerSibling: el1.immediateYoungerSibling
            };
          }),
          numIncomingDependencies: _helpers.Long.fromString(contract.numIncomingDependencies),
          creator: contract.creator,
          rentBalance: _helpers.Long.fromString(contract.rentBalance)
        }
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgContractDepositRent": {
    aminoType: "/seiprotocol.seichain.dex.MsgContractDepositRent",
    toAmino: function toAmino(_ref7) {
      var contractAddr = _ref7.contractAddr,
        amount = _ref7.amount,
        sender = _ref7.sender;
      return {
        contractAddr: contractAddr,
        amount: amount.toString(),
        sender: sender
      };
    },
    fromAmino: function fromAmino(_ref8) {
      var contractAddr = _ref8.contractAddr,
        amount = _ref8.amount,
        sender = _ref8.sender;
      return {
        contractAddr: contractAddr,
        amount: _helpers.Long.fromString(amount),
        sender: sender
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgUnregisterContract": {
    aminoType: "/seiprotocol.seichain.dex.MsgUnregisterContract",
    toAmino: function toAmino(_ref9) {
      var creator = _ref9.creator,
        contractAddr = _ref9.contractAddr;
      return {
        creator: creator,
        contractAddr: contractAddr
      };
    },
    fromAmino: function fromAmino(_ref10) {
      var creator = _ref10.creator,
        contractAddr = _ref10.contractAddr;
      return {
        creator: creator,
        contractAddr: contractAddr
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgRegisterPairs": {
    aminoType: "/seiprotocol.seichain.dex.MsgRegisterPairs",
    toAmino: function toAmino(_ref11) {
      var creator = _ref11.creator,
        batchcontractpair = _ref11.batchcontractpair;
      return {
        creator: creator,
        batchcontractpair: batchcontractpair.map(function (el0) {
          return {
            contractAddr: el0.contractAddr,
            pairs: el0.pairs.map(function (el1) {
              return {
                priceDenom: el1.priceDenom,
                assetDenom: el1.assetDenom,
                priceTicksize: el1.priceTicksize,
                quantityTicksize: el1.quantityTicksize
              };
            })
          };
        })
      };
    },
    fromAmino: function fromAmino(_ref12) {
      var creator = _ref12.creator,
        batchcontractpair = _ref12.batchcontractpair;
      return {
        creator: creator,
        batchcontractpair: batchcontractpair.map(function (el0) {
          return {
            contractAddr: el0.contractAddr,
            pairs: el0.pairs.map(function (el1) {
              return {
                priceDenom: el1.priceDenom,
                assetDenom: el1.assetDenom,
                priceTicksize: el1.priceTicksize,
                quantityTicksize: el1.quantityTicksize
              };
            })
          };
        })
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgUpdatePriceTickSize": {
    aminoType: "/seiprotocol.seichain.dex.MsgUpdatePriceTickSize",
    toAmino: function toAmino(_ref13) {
      var creator = _ref13.creator,
        tickSizeList = _ref13.tickSizeList;
      return {
        creator: creator,
        tickSizeList: tickSizeList.map(function (el0) {
          return {
            pair: {
              priceDenom: el0.pair.priceDenom,
              assetDenom: el0.pair.assetDenom,
              priceTicksize: el0.pair.priceTicksize,
              quantityTicksize: el0.pair.quantityTicksize
            },
            ticksize: el0.ticksize,
            contractAddr: el0.contractAddr
          };
        })
      };
    },
    fromAmino: function fromAmino(_ref14) {
      var creator = _ref14.creator,
        tickSizeList = _ref14.tickSizeList;
      return {
        creator: creator,
        tickSizeList: tickSizeList.map(function (el0) {
          return {
            pair: {
              priceDenom: el0.pair.priceDenom,
              assetDenom: el0.pair.assetDenom,
              priceTicksize: el0.pair.priceTicksize,
              quantityTicksize: el0.pair.quantityTicksize
            },
            ticksize: el0.ticksize,
            contractAddr: el0.contractAddr
          };
        })
      };
    }
  },
  "/seiprotocol.seichain.dex.MsgUpdateQuantityTickSize": {
    aminoType: "/seiprotocol.seichain.dex.MsgUpdateQuantityTickSize",
    toAmino: function toAmino(_ref15) {
      var creator = _ref15.creator,
        tickSizeList = _ref15.tickSizeList;
      return {
        creator: creator,
        tickSizeList: tickSizeList.map(function (el0) {
          return {
            pair: {
              priceDenom: el0.pair.priceDenom,
              assetDenom: el0.pair.assetDenom,
              priceTicksize: el0.pair.priceTicksize,
              quantityTicksize: el0.pair.quantityTicksize
            },
            ticksize: el0.ticksize,
            contractAddr: el0.contractAddr
          };
        })
      };
    },
    fromAmino: function fromAmino(_ref16) {
      var creator = _ref16.creator,
        tickSizeList = _ref16.tickSizeList;
      return {
        creator: creator,
        tickSizeList: tickSizeList.map(function (el0) {
          return {
            pair: {
              priceDenom: el0.pair.priceDenom,
              assetDenom: el0.pair.assetDenom,
              priceTicksize: el0.pair.priceTicksize,
              quantityTicksize: el0.pair.quantityTicksize
            },
            ticksize: el0.ticksize,
            contractAddr: el0.contractAddr
          };
        })
      };
    }
  }
};
exports.AminoConverter = AminoConverter;