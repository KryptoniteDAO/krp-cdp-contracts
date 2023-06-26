"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTendermint35Event = void 0;
/**
 * Takes a Tendermint 0.35 event and converts it into a Stargate `Event`
 */
function fromTendermint35Event(event) {
    return {
        type: event.type,
        attributes: event.attributes,
    };
}
exports.fromTendermint35Event = fromTendermint35Event;
