"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfRpcStreamingClient = void 0;
function instanceOfRpcStreamingClient(client) {
    return typeof client.listen === 'function';
}
exports.instanceOfRpcStreamingClient = instanceOfRpcStreamingClient;
