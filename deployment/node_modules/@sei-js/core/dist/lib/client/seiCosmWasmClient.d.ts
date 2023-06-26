import { CosmWasmClient, HttpEndpoint, IndexedTx } from '@cosmjs/cosmwasm-stargate';
import { SearchTxFilter, SearchTxQuery } from '@cosmjs/stargate';
import { Tendermint35Client } from '../tendermint35';
export declare class SeiCosmWasmClient extends CosmWasmClient {
    protected constructor(tmClient: Tendermint35Client | undefined);
    static connect(endpoint: string | HttpEndpoint): Promise<SeiCosmWasmClient>;
    getTx(id: string): Promise<IndexedTx | null>;
    searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
    private txsQueryTm35;
}
