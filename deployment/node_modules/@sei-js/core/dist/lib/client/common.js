"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.txsQuery = void 0;
const encoding_1 = require("@cosmjs/encoding");
const events_1 = require("./events");
const txsQuery = (tmClient, query) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield tmClient.txSearchAll({
        query: query,
    });
    return results.txs.map((tx) => {
        return {
            height: tx.height,
            hash: (0, encoding_1.toHex)(tx.hash).toUpperCase(),
            code: tx.result.code,
            events: tx.result.events.map(events_1.fromTendermint35Event),
            rawLog: tx.result.log || '',
            tx: tx.tx,
            gasUsed: tx.result.gasUsed,
            gasWanted: tx.result.gasWanted,
        };
    });
});
exports.txsQuery = txsQuery;
