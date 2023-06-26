import { HttpEndpoint, IndexedTx, SearchTxFilter, SearchTxQuery, StargateClient, StargateClientOptions } from '@cosmjs/stargate';
import { Tendermint35Client } from '../tendermint35';
export declare class SeiStargateClient extends StargateClient {
    protected constructor(tmClient: Tendermint35Client | undefined, options: StargateClientOptions);
    static connect(endpoint: string | HttpEndpoint, options?: StargateClientOptions): Promise<StargateClient>;
    getTx(id: string): Promise<IndexedTx | null>;
    searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
    private txsQueryTm35;
}
