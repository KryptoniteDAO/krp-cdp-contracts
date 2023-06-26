import { IndexedTx } from '@cosmjs/stargate';
import { Tendermint35Client } from '../tendermint35';
export declare const txsQuery: (tmClient: Tendermint35Client, query: string) => Promise<readonly IndexedTx[]>;
