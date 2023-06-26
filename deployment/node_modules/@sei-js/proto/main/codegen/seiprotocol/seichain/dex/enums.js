"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnitSDKType = exports.Unit = exports.PositionEffectSDKType = exports.PositionEffect = exports.PositionDirectionSDKType = exports.PositionDirection = exports.OrderTypeSDKType = exports.OrderType = exports.OrderStatusSDKType = exports.OrderStatus = exports.CancellationInitiatorSDKType = exports.CancellationInitiator = void 0;
exports.cancellationInitiatorFromJSON = cancellationInitiatorFromJSON;
exports.cancellationInitiatorToJSON = cancellationInitiatorToJSON;
exports.orderStatusFromJSON = orderStatusFromJSON;
exports.orderStatusToJSON = orderStatusToJSON;
exports.orderTypeFromJSON = orderTypeFromJSON;
exports.orderTypeToJSON = orderTypeToJSON;
exports.positionDirectionFromJSON = positionDirectionFromJSON;
exports.positionDirectionToJSON = positionDirectionToJSON;
exports.positionEffectFromJSON = positionEffectFromJSON;
exports.positionEffectToJSON = positionEffectToJSON;
exports.unitFromJSON = unitFromJSON;
exports.unitToJSON = unitToJSON;
var PositionDirection;
exports.PositionDirection = PositionDirection;
(function (PositionDirection) {
  PositionDirection[PositionDirection["LONG"] = 0] = "LONG";
  PositionDirection[PositionDirection["SHORT"] = 1] = "SHORT";
  PositionDirection[PositionDirection["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PositionDirection || (exports.PositionDirection = PositionDirection = {}));
var PositionDirectionSDKType;
exports.PositionDirectionSDKType = PositionDirectionSDKType;
(function (PositionDirectionSDKType) {
  PositionDirectionSDKType[PositionDirectionSDKType["LONG"] = 0] = "LONG";
  PositionDirectionSDKType[PositionDirectionSDKType["SHORT"] = 1] = "SHORT";
  PositionDirectionSDKType[PositionDirectionSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PositionDirectionSDKType || (exports.PositionDirectionSDKType = PositionDirectionSDKType = {}));
function positionDirectionFromJSON(object) {
  switch (object) {
    case 0:
    case "LONG":
      return PositionDirection.LONG;
    case 1:
    case "SHORT":
      return PositionDirection.SHORT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PositionDirection.UNRECOGNIZED;
  }
}
function positionDirectionToJSON(object) {
  switch (object) {
    case PositionDirection.LONG:
      return "LONG";
    case PositionDirection.SHORT:
      return "SHORT";
    default:
      return "UNKNOWN";
  }
}
var PositionEffect;
exports.PositionEffect = PositionEffect;
(function (PositionEffect) {
  PositionEffect[PositionEffect["OPEN"] = 0] = "OPEN";
  PositionEffect[PositionEffect["CLOSE"] = 1] = "CLOSE";
  PositionEffect[PositionEffect["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PositionEffect || (exports.PositionEffect = PositionEffect = {}));
var PositionEffectSDKType;
exports.PositionEffectSDKType = PositionEffectSDKType;
(function (PositionEffectSDKType) {
  PositionEffectSDKType[PositionEffectSDKType["OPEN"] = 0] = "OPEN";
  PositionEffectSDKType[PositionEffectSDKType["CLOSE"] = 1] = "CLOSE";
  PositionEffectSDKType[PositionEffectSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PositionEffectSDKType || (exports.PositionEffectSDKType = PositionEffectSDKType = {}));
function positionEffectFromJSON(object) {
  switch (object) {
    case 0:
    case "OPEN":
      return PositionEffect.OPEN;
    case 1:
    case "CLOSE":
      return PositionEffect.CLOSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PositionEffect.UNRECOGNIZED;
  }
}
function positionEffectToJSON(object) {
  switch (object) {
    case PositionEffect.OPEN:
      return "OPEN";
    case PositionEffect.CLOSE:
      return "CLOSE";
    default:
      return "UNKNOWN";
  }
}
var OrderType;
exports.OrderType = OrderType;
(function (OrderType) {
  OrderType[OrderType["LIMIT"] = 0] = "LIMIT";
  OrderType[OrderType["MARKET"] = 1] = "MARKET";
  OrderType[OrderType["LIQUIDATION"] = 2] = "LIQUIDATION";
  OrderType[OrderType["FOKMARKET"] = 3] = "FOKMARKET";
  OrderType[OrderType["FOKMARKETBYVALUE"] = 4] = "FOKMARKETBYVALUE";
  OrderType[OrderType["STOPLOSS"] = 5] = "STOPLOSS";
  OrderType[OrderType["STOPLIMIT"] = 6] = "STOPLIMIT";
  OrderType[OrderType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderType || (exports.OrderType = OrderType = {}));
var OrderTypeSDKType;
exports.OrderTypeSDKType = OrderTypeSDKType;
(function (OrderTypeSDKType) {
  OrderTypeSDKType[OrderTypeSDKType["LIMIT"] = 0] = "LIMIT";
  OrderTypeSDKType[OrderTypeSDKType["MARKET"] = 1] = "MARKET";
  OrderTypeSDKType[OrderTypeSDKType["LIQUIDATION"] = 2] = "LIQUIDATION";
  OrderTypeSDKType[OrderTypeSDKType["FOKMARKET"] = 3] = "FOKMARKET";
  OrderTypeSDKType[OrderTypeSDKType["FOKMARKETBYVALUE"] = 4] = "FOKMARKETBYVALUE";
  OrderTypeSDKType[OrderTypeSDKType["STOPLOSS"] = 5] = "STOPLOSS";
  OrderTypeSDKType[OrderTypeSDKType["STOPLIMIT"] = 6] = "STOPLIMIT";
  OrderTypeSDKType[OrderTypeSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderTypeSDKType || (exports.OrderTypeSDKType = OrderTypeSDKType = {}));
function orderTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "LIMIT":
      return OrderType.LIMIT;
    case 1:
    case "MARKET":
      return OrderType.MARKET;
    case 2:
    case "LIQUIDATION":
      return OrderType.LIQUIDATION;
    case 3:
    case "FOKMARKET":
      return OrderType.FOKMARKET;
    case 4:
    case "FOKMARKETBYVALUE":
      return OrderType.FOKMARKETBYVALUE;
    case 5:
    case "STOPLOSS":
      return OrderType.STOPLOSS;
    case 6:
    case "STOPLIMIT":
      return OrderType.STOPLIMIT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderType.UNRECOGNIZED;
  }
}
function orderTypeToJSON(object) {
  switch (object) {
    case OrderType.LIMIT:
      return "LIMIT";
    case OrderType.MARKET:
      return "MARKET";
    case OrderType.LIQUIDATION:
      return "LIQUIDATION";
    case OrderType.FOKMARKET:
      return "FOKMARKET";
    case OrderType.FOKMARKETBYVALUE:
      return "FOKMARKETBYVALUE";
    case OrderType.STOPLOSS:
      return "STOPLOSS";
    case OrderType.STOPLIMIT:
      return "STOPLIMIT";
    default:
      return "UNKNOWN";
  }
}
var Unit;
exports.Unit = Unit;
(function (Unit) {
  Unit[Unit["STANDARD"] = 0] = "STANDARD";
  Unit[Unit["MILLI"] = 1] = "MILLI";
  Unit[Unit["MICRO"] = 2] = "MICRO";
  Unit[Unit["NANO"] = 3] = "NANO";
  Unit[Unit["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Unit || (exports.Unit = Unit = {}));
var UnitSDKType;
exports.UnitSDKType = UnitSDKType;
(function (UnitSDKType) {
  UnitSDKType[UnitSDKType["STANDARD"] = 0] = "STANDARD";
  UnitSDKType[UnitSDKType["MILLI"] = 1] = "MILLI";
  UnitSDKType[UnitSDKType["MICRO"] = 2] = "MICRO";
  UnitSDKType[UnitSDKType["NANO"] = 3] = "NANO";
  UnitSDKType[UnitSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(UnitSDKType || (exports.UnitSDKType = UnitSDKType = {}));
function unitFromJSON(object) {
  switch (object) {
    case 0:
    case "STANDARD":
      return Unit.STANDARD;
    case 1:
    case "MILLI":
      return Unit.MILLI;
    case 2:
    case "MICRO":
      return Unit.MICRO;
    case 3:
    case "NANO":
      return Unit.NANO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Unit.UNRECOGNIZED;
  }
}
function unitToJSON(object) {
  switch (object) {
    case Unit.STANDARD:
      return "STANDARD";
    case Unit.MILLI:
      return "MILLI";
    case Unit.MICRO:
      return "MICRO";
    case Unit.NANO:
      return "NANO";
    default:
      return "UNKNOWN";
  }
}
var OrderStatus;
exports.OrderStatus = OrderStatus;
(function (OrderStatus) {
  OrderStatus[OrderStatus["PLACED"] = 0] = "PLACED";
  OrderStatus[OrderStatus["FAILED_TO_PLACE"] = 1] = "FAILED_TO_PLACE";
  OrderStatus[OrderStatus["CANCELLED"] = 2] = "CANCELLED";
  OrderStatus[OrderStatus["FULFILLED"] = 3] = "FULFILLED";
  OrderStatus[OrderStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderStatusSDKType;
exports.OrderStatusSDKType = OrderStatusSDKType;
(function (OrderStatusSDKType) {
  OrderStatusSDKType[OrderStatusSDKType["PLACED"] = 0] = "PLACED";
  OrderStatusSDKType[OrderStatusSDKType["FAILED_TO_PLACE"] = 1] = "FAILED_TO_PLACE";
  OrderStatusSDKType[OrderStatusSDKType["CANCELLED"] = 2] = "CANCELLED";
  OrderStatusSDKType[OrderStatusSDKType["FULFILLED"] = 3] = "FULFILLED";
  OrderStatusSDKType[OrderStatusSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderStatusSDKType || (exports.OrderStatusSDKType = OrderStatusSDKType = {}));
function orderStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "PLACED":
      return OrderStatus.PLACED;
    case 1:
    case "FAILED_TO_PLACE":
      return OrderStatus.FAILED_TO_PLACE;
    case 2:
    case "CANCELLED":
      return OrderStatus.CANCELLED;
    case 3:
    case "FULFILLED":
      return OrderStatus.FULFILLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderStatus.UNRECOGNIZED;
  }
}
function orderStatusToJSON(object) {
  switch (object) {
    case OrderStatus.PLACED:
      return "PLACED";
    case OrderStatus.FAILED_TO_PLACE:
      return "FAILED_TO_PLACE";
    case OrderStatus.CANCELLED:
      return "CANCELLED";
    case OrderStatus.FULFILLED:
      return "FULFILLED";
    default:
      return "UNKNOWN";
  }
}
var CancellationInitiator;
exports.CancellationInitiator = CancellationInitiator;
(function (CancellationInitiator) {
  CancellationInitiator[CancellationInitiator["USER"] = 0] = "USER";
  CancellationInitiator[CancellationInitiator["LIQUIDATED"] = 1] = "LIQUIDATED";
  CancellationInitiator[CancellationInitiator["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CancellationInitiator || (exports.CancellationInitiator = CancellationInitiator = {}));
var CancellationInitiatorSDKType;
exports.CancellationInitiatorSDKType = CancellationInitiatorSDKType;
(function (CancellationInitiatorSDKType) {
  CancellationInitiatorSDKType[CancellationInitiatorSDKType["USER"] = 0] = "USER";
  CancellationInitiatorSDKType[CancellationInitiatorSDKType["LIQUIDATED"] = 1] = "LIQUIDATED";
  CancellationInitiatorSDKType[CancellationInitiatorSDKType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CancellationInitiatorSDKType || (exports.CancellationInitiatorSDKType = CancellationInitiatorSDKType = {}));
function cancellationInitiatorFromJSON(object) {
  switch (object) {
    case 0:
    case "USER":
      return CancellationInitiator.USER;
    case 1:
    case "LIQUIDATED":
      return CancellationInitiator.LIQUIDATED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CancellationInitiator.UNRECOGNIZED;
  }
}
function cancellationInitiatorToJSON(object) {
  switch (object) {
    case CancellationInitiator.USER:
      return "USER";
    case CancellationInitiator.LIQUIDATED:
      return "LIQUIDATED";
    default:
      return "UNKNOWN";
  }
}