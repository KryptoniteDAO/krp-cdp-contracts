import { OfflineSigner } from '@cosmjs/proto-signing';
import { HttpEndpoint, IndexedTx, SearchTxFilter, SearchTxQuery, SigningStargateClient, SigningStargateClientOptions } from '@cosmjs/stargate';
import { Tendermint35Client } from '../tendermint35';
export declare class SeiSigningStargateClient extends SigningStargateClient {
    protected constructor(tmClient: Tendermint35Client | undefined, signer: OfflineSigner, options: SigningStargateClientOptions);
    static connectWithSigner(endpoint: string | HttpEndpoint, signer: OfflineSigner, options?: SigningStargateClientOptions): Promise<SeiSigningStargateClient>;
    getTx(id: string): Promise<IndexedTx | null>;
    searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
    private txsQueryTm35;
}
