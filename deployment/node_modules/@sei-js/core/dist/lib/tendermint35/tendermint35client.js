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
exports.Tendermint35Client = void 0;
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const jsonrpc_1 = require("./jsonrpc");
const rpcclients_1 = require("./rpcclients");
const adaptor_1 = require("./adaptor");
const requests = require("./requests");
/**
 * This Tendermint 0.35 client is taken from @cosmjs/tendermint-rpc.
 * Currently, cosmjs does not support Tendermint 0.35 and it's implementation,
 * is not exported, so we have to implement it ourselves and do some workarounds
 * to create a `SeiStargateClient`.
 *
 * @see https://github.com/cosmos/cosmjs/issues/1225
 */
class Tendermint35Client {
    /**
     * Use `Tendermint34Client.connect` or `Tendermint34Client.create` to create an instance.
     */
    constructor(client) {
        this.client = client;
        this.p = adaptor_1.adaptor35.params;
        this.r = adaptor_1.adaptor35.responses;
    }
    /**
     * Creates a new Tendermint client for the given endpoint.
     *
     * Uses HTTP when the URL schema is http or https. Uses WebSockets otherwise.
     */
    static connect(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof endpoint === 'object') {
                return Tendermint35Client.create(new tendermint_rpc_1.HttpClient(endpoint));
            }
            else {
                const useHttp = endpoint.startsWith('http://') || endpoint.startsWith('https://');
                const rpcClient = useHttp
                    ? new tendermint_rpc_1.HttpClient(endpoint)
                    : new tendermint_rpc_1.WebsocketClient(endpoint);
                return Tendermint35Client.create(rpcClient);
            }
        });
    }
    /**
     * Creates a new Tendermint client given an RPC client.
     */
    static create(rpcClient) {
        return __awaiter(this, void 0, void 0, function* () {
            // For some very strange reason I don't understand, tests start to fail on some systems
            // (our CI) when skipping the status call before doing other queries. Sleeping a little
            // while did not help. Thus we query the version as a way to say "hi" to the backend,
            // even in cases where we don't use the result.
            const _version = yield this.detectVersion(rpcClient);
            return new Tendermint35Client(rpcClient);
        });
    }
    static detectVersion(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = (0, jsonrpc_1.createJsonRpcRequest)(requests.Method.Status);
            const response = yield client.execute(req);
            const result = response.result;
            if (!result || !result.node_info) {
                throw new Error('Unrecognized format for status response');
            }
            const version = result.node_info.version;
            if (typeof version !== 'string') {
                throw new Error('Unrecognized version format: must be string');
            }
            return version;
        });
    }
    disconnect() {
        this.client.disconnect();
    }
    abciInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.AbciInfo,
            };
            return this.doCall(query, this.p.encodeAbciInfo, this.r.decodeAbciInfo);
        });
    }
    abciQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.AbciQuery,
            };
            return this.doCall(query, this.p.encodeAbciQuery, this.r.decodeAbciQuery);
        });
    }
    block(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.Block,
                params: { height: height },
            };
            return this.doCall(query, this.p.encodeBlock, this.r.decodeBlock);
        });
    }
    blockResults(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.BlockResults,
                params: { height: height },
            };
            return this.doCall(query, this.p.encodeBlockResults, this.r.decodeBlockResults);
        });
    }
    /**
     * Search for events that are in a block.
     *
     * NOTE
     * This method will error on any node that is running a Tendermint version lower than 0.34.9.
     *
     * @see https://docs.tendermint.com/master/rpc/#/Info/block_search
     */
    blockSearch(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.BlockSearch,
            };
            const resp = yield this.doCall(query, this.p.encodeBlockSearch, this.r.decodeBlockSearch);
            return Object.assign(Object.assign({}, resp), { 
                // make sure we sort by height, as tendermint may be sorting by string value of the height
                blocks: [...resp.blocks].sort((a, b) => a.block.header.height - b.block.header.height) });
        });
    }
    // this should paginate through all blockSearch options to ensure it returns all results.
    // starts with page 1 or whatever was provided (eg. to start on page 7)
    //
    // NOTE
    // This method will error on any node that is running a Tendermint version lower than 0.34.9.
    blockSearchAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = params.page || 1;
            const blocks = [];
            let done = false;
            while (!done) {
                const resp = yield this.blockSearch(Object.assign(Object.assign({}, params), { page: page }));
                blocks.push(...resp.blocks);
                if (blocks.length < resp.totalCount) {
                    page++;
                }
                else {
                    done = true;
                }
            }
            // make sure we sort by height, as tendermint may be sorting by string value of the height
            // and the earlier items may be in a higher page than the later items
            blocks.sort((a, b) => a.block.header.height - b.block.header.height);
            return {
                totalCount: blocks.length,
                blocks: blocks,
            };
        });
    }
    /**
     * Queries block headers filtered by minHeight <= height <= maxHeight.
     *
     * @param minHeight The minimum height to be included in the result. Defaults to 0.
     * @param maxHeight The maximum height to be included in the result. Defaults to infinity.
     */
    blockchain(minHeight, maxHeight) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.Blockchain,
                params: {
                    minHeight: minHeight,
                    maxHeight: maxHeight,
                },
            };
            return this.doCall(query, this.p.encodeBlockchain, this.r.decodeBlockchain);
        });
    }
    /**
     * Broadcast transaction to mempool and wait for response
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
     */
    broadcastTxSync(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.BroadcastTxSync,
            };
            return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxSync);
        });
    }
    /**
     * Broadcast transaction to mempool and do not wait for result
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
     */
    broadcastTxAsync(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.BroadcastTxAsync,
            };
            return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxAsync);
        });
    }
    /**
     * Broadcast transaction to mempool and wait for block
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
     */
    broadcastTxCommit(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.BroadcastTxCommit,
            };
            return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxCommit);
        });
    }
    commit(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.Commit,
                params: { height: height },
            };
            return this.doCall(query, this.p.encodeCommit, this.r.decodeCommit);
        });
    }
    genesis() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { method: requests.Method.Genesis };
            return this.doCall(query, this.p.encodeGenesis, this.r.decodeGenesis);
        });
    }
    health() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { method: requests.Method.Health };
            return this.doCall(query, this.p.encodeHealth, this.r.decodeHealth);
        });
    }
    numUnconfirmedTxs() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.NumUnconfirmedTxs,
            };
            return this.doCall(query, this.p.encodeNumUnconfirmedTxs, this.r.decodeNumUnconfirmedTxs);
        });
    }
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { method: requests.Method.Status };
            return this.doCall(query, this.p.encodeStatus, this.r.decodeStatus);
        });
    }
    subscribeNewBlock() {
        const request = {
            method: requests.Method.Subscribe,
            query: { type: requests.SubscriptionEventType.NewBlock },
        };
        return this.subscribe(request, this.r.decodeNewBlockEvent);
    }
    subscribeNewBlockHeader() {
        const request = {
            method: requests.Method.Subscribe,
            query: { type: requests.SubscriptionEventType.NewBlockHeader },
        };
        return this.subscribe(request, this.r.decodeNewBlockHeaderEvent);
    }
    subscribeTx(query) {
        const request = {
            method: requests.Method.Subscribe,
            query: {
                type: requests.SubscriptionEventType.Tx,
                raw: query,
            },
        };
        return this.subscribe(request, this.r.decodeTxEvent);
    }
    /**
     * Get a single transaction by hash
     *
     * @see https://docs.tendermint.com/master/rpc/#/Info/tx
     */
    tx(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.Tx,
            };
            return this.doCall(query, this.p.encodeTx, this.r.decodeTx);
        });
    }
    /**
     * Search for transactions that are in a block
     *
     * @see https://docs.tendermint.com/master/rpc/#/Info/tx_search
     */
    txSearch(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                params: params,
                method: requests.Method.TxSearch,
            };
            return this.doCall(query, this.p.encodeTxSearch, this.r.decodeTxSearch);
        });
    }
    // this should paginate through all txSearch options to ensure it returns all results.
    // starts with page 1 or whatever was provided (eg. to start on page 7)
    txSearchAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = params.page || 1;
            const txs = [];
            let done = false;
            while (!done) {
                const resp = yield this.txSearch(Object.assign(Object.assign({}, params), { page: page }));
                txs.push(...resp.txs);
                if (txs.length < resp.totalCount) {
                    page++;
                }
                else {
                    done = true;
                }
            }
            return {
                totalCount: txs.length,
                txs: txs,
            };
        });
    }
    validators(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                method: requests.Method.Validators,
                params: params,
            };
            return this.doCall(query, this.p.encodeValidators, this.r.decodeValidators);
        });
    }
    validatorsAll(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const validators = [];
            let page = 1;
            let done = false;
            let blockHeight = height;
            while (!done) {
                const response = yield this.validators({
                    per_page: 50,
                    height: blockHeight,
                    page: page,
                });
                validators.push(...response.validators);
                blockHeight = blockHeight || response.blockHeight;
                if (validators.length < response.total) {
                    page++;
                }
                else {
                    done = true;
                }
            }
            return {
                // NOTE: Default value is for type safety but this should always be set
                blockHeight: blockHeight !== null && blockHeight !== void 0 ? blockHeight : 0,
                count: validators.length,
                total: validators.length,
                validators: validators,
            };
        });
    }
    // doCall is a helper to handle the encode/call/decode logic
    doCall(request, encode, decode) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = encode(request);
            const result = yield this.client.execute(req);
            return decode(result);
        });
    }
    subscribe(request, decode) {
        if (!(0, rpcclients_1.instanceOfRpcStreamingClient)(this.client)) {
            throw new Error('This RPC client type cannot subscribe to events');
        }
        const req = this.p.encodeSubscribe(request);
        const eventStream = this.client.listen(req);
        return eventStream.map((event) => {
            return decode(event);
        });
    }
}
exports.Tendermint35Client = Tendermint35Client;
