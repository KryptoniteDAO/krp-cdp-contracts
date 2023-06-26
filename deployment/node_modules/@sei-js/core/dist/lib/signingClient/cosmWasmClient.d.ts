import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { SeiClientOptions, SeiSigningCosmWasmClientOptions } from './types';
export declare const getCosmWasmClient: (rpcEndpoint: string, options?: SeiClientOptions) => Promise<CosmWasmClient>;
export declare const getSigningCosmWasmClient: (rpcEndpoint: string, signer: OfflineSigner, options?: SeiSigningCosmWasmClientOptions) => Promise<SigningCosmWasmClient>;
