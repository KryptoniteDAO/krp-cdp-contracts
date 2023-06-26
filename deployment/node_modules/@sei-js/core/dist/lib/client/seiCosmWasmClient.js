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
exports.SeiCosmWasmClient = void 0;
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
const stargate_1 = require("@cosmjs/stargate");
const tendermint35_1 = require("../tendermint35");
const common_1 = require("./common");
class SeiCosmWasmClient extends cosmwasm_stargate_1.CosmWasmClient {
    constructor(tmClient) {
        // Temporary workaround to pass a Tendermint35Client into a CosmWasmClient
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(tmClient);
    }
    static connect(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmClient = yield tendermint35_1.Tendermint35Client.connect(endpoint);
            return new SeiCosmWasmClient(tmClient);
        });
    }
    getTx(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.txsQueryTm35(`tx.hash='${id}'`);
            return (_a = results[0]) !== null && _a !== void 0 ? _a : null;
        });
    }
    searchTx(query, filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const minHeight = filter.minHeight || 0;
            const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;
            if (maxHeight < minHeight)
                return []; // optional optimization
            function withFilters(originalQuery) {
                return `${originalQuery} AND tx.height>=${minHeight} AND tx.height<=${maxHeight}`;
            }
            let txs;
            if ((0, stargate_1.isSearchByHeightQuery)(query)) {
                txs =
                    query.height >= minHeight && query.height <= maxHeight
                        ? yield this.txsQueryTm35(`tx.height=${query.height}`)
                        : [];
            }
            else if ((0, stargate_1.isSearchBySentFromOrToQuery)(query)) {
                const sentQuery = withFilters(`message.module='bank' AND transfer.sender='${query.sentFromOrTo}'`);
                const receivedQuery = withFilters(`message.module='bank' AND transfer.recipient='${query.sentFromOrTo}'`);
                const [sent, received] = yield Promise.all([sentQuery, receivedQuery].map((rawQuery) => this.txsQueryTm35(rawQuery)));
                const sentHashes = sent.map((t) => t.hash);
                txs = [...sent, ...received.filter((t) => !sentHashes.includes(t.hash))];
            }
            else if ((0, stargate_1.isSearchByTagsQuery)(query)) {
                const rawQuery = withFilters(query.tags.map((t) => `${t.key}='${t.value}'`).join(' AND '));
                txs = yield this.txsQueryTm35(rawQuery);
            }
            else {
                throw new Error('Unknown query type');
            }
            const filtered = txs.filter((tx) => tx.height >= minHeight && tx.height <= maxHeight);
            return filtered;
        });
    }
    txsQueryTm35(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmClient = this.forceGetTmClient();
            return (0, common_1.txsQuery)(tmClient, query);
        });
    }
}
exports.SeiCosmWasmClient = SeiCosmWasmClient;
