"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AminoConverter = void 0;
var _helpers = require("@osmonauts/helpers");
var AminoConverter = {
  "/seiprotocol.seichain.nitro.MsgRecordTransactionData": {
    aminoType: "/seiprotocol.seichain.nitro.MsgRecordTransactionData",
    toAmino: function toAmino(_ref) {
      var sender = _ref.sender,
        slot = _ref.slot,
        stateRoot = _ref.stateRoot,
        txs = _ref.txs;
      return {
        sender: sender,
        slot: slot.toString(),
        stateRoot: stateRoot,
        txs: txs
      };
    },
    fromAmino: function fromAmino(_ref2) {
      var sender = _ref2.sender,
        slot = _ref2.slot,
        stateRoot = _ref2.stateRoot,
        txs = _ref2.txs;
      return {
        sender: sender,
        slot: _helpers.Long.fromString(slot),
        stateRoot: stateRoot,
        txs: txs
      };
    }
  },
  "/seiprotocol.seichain.nitro.MsgSubmitFraudChallenge": {
    aminoType: "/seiprotocol.seichain.nitro.MsgSubmitFraudChallenge",
    toAmino: function toAmino(_ref3) {
      var sender = _ref3.sender,
        startSlot = _ref3.startSlot,
        endSlot = _ref3.endSlot,
        fraudStatePubKey = _ref3.fraudStatePubKey,
        merkleProof = _ref3.merkleProof,
        accountStates = _ref3.accountStates,
        programs = _ref3.programs,
        sysvarAccounts = _ref3.sysvarAccounts;
      return {
        sender: sender,
        startSlot: startSlot.toString(),
        endSlot: endSlot.toString(),
        fraudStatePubKey: fraudStatePubKey,
        merkleProof: {
          commitment: merkleProof.commitment,
          hash: merkleProof.hash,
          direction: merkleProof.direction.map(function (el0) {
            return el0.toString();
          })
        },
        accountStates: accountStates.map(function (el0) {
          return {
            pubkey: el0.pubkey,
            owner: el0.owner,
            lamports: el0.lamports.toString(),
            slot: el0.slot.toString(),
            executable: el0.executable,
            rent_epoch: el0.rentEpoch.toString(),
            data: el0.data
          };
        }),
        programs: programs.map(function (el0) {
          return {
            pubkey: el0.pubkey,
            owner: el0.owner,
            lamports: el0.lamports.toString(),
            slot: el0.slot.toString(),
            executable: el0.executable,
            rent_epoch: el0.rentEpoch.toString(),
            data: el0.data
          };
        }),
        sysvarAccounts: sysvarAccounts.map(function (el0) {
          return {
            pubkey: el0.pubkey,
            owner: el0.owner,
            lamports: el0.lamports.toString(),
            slot: el0.slot.toString(),
            executable: el0.executable,
            rent_epoch: el0.rentEpoch.toString(),
            data: el0.data
          };
        })
      };
    },
    fromAmino: function fromAmino(_ref4) {
      var sender = _ref4.sender,
        startSlot = _ref4.startSlot,
        endSlot = _ref4.endSlot,
        fraudStatePubKey = _ref4.fraudStatePubKey,
        merkleProof = _ref4.merkleProof,
        accountStates = _ref4.accountStates,
        programs = _ref4.programs,
        sysvarAccounts = _ref4.sysvarAccounts;
      return {
        sender: sender,
        startSlot: _helpers.Long.fromString(startSlot),
        endSlot: _helpers.Long.fromString(endSlot),
        fraudStatePubKey: fraudStatePubKey,
        merkleProof: {
          commitment: merkleProof.commitment,
          hash: merkleProof.hash,
          direction: merkleProof.direction.map(function (el1) {
            return _helpers.Long.fromString(el1);
          })
        },
        accountStates: accountStates.map(function (el0) {
          return {
            pubkey: el0.pubkey,
            owner: el0.owner,
            lamports: _helpers.Long.fromString(el0.lamports),
            slot: _helpers.Long.fromString(el0.slot),
            executable: el0.executable,
            rentEpoch: _helpers.Long.fromString(el0.rent_epoch),
            data: el0.data
          };
        }),
        programs: programs.map(function (el0) {
          return {
            pubkey: el0.pubkey,
            owner: el0.owner,
            lamports: _helpers.Long.fromString(el0.lamports),
            slot: _helpers.Long.fromString(el0.slot),
            executable: el0.executable,
            rentEpoch: _helpers.Long.fromString(el0.rent_epoch),
            data: el0.data
          };
        }),
        sysvarAccounts: sysvarAccounts.map(function (el0) {
          return {
            pubkey: el0.pubkey,
            owner: el0.owner,
            lamports: _helpers.Long.fromString(el0.lamports),
            slot: _helpers.Long.fromString(el0.slot),
            executable: el0.executable,
            rentEpoch: _helpers.Long.fromString(el0.rent_epoch),
            data: el0.data
          };
        })
      };
    }
  }
};
exports.AminoConverter = AminoConverter;