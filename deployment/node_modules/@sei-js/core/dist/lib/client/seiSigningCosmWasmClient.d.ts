import { OfflineSigner } from '@cosmjs/proto-signing';
import { HttpEndpoint, IndexedTx, SearchTxFilter, SearchTxQuery } from '@cosmjs/stargate';
import { SigningCosmWasmClient, SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate';
import { Tendermint35Client } from '../tendermint35';
export declare class SeiSigningCosmWasmClient extends SigningCosmWasmClient {
    protected constructor(tmClient: Tendermint35Client | undefined, signer: OfflineSigner, options: SigningCosmWasmClientOptions);
    static connectWithSigner(endpoint: string | HttpEndpoint, signer: OfflineSigner, options?: SigningCosmWasmClientOptions): Promise<SeiSigningCosmWasmClient>;
    getTx(id: string): Promise<IndexedTx | null>;
    searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
    private txsQueryTm35;
}
