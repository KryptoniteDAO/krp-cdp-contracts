import { SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate';
import { SigningStargateClientOptions, StargateClientOptions } from '@cosmjs/stargate';
export declare type SeiClientOptions = {
    useTM34?: boolean;
};
export declare type SeiStagateClientOptions = StargateClientOptions & SeiClientOptions;
export declare type SeiSigningStagateClientOptions = SigningStargateClientOptions & SeiClientOptions;
export declare type SeiSigningCosmWasmClientOptions = SigningCosmWasmClientOptions & SeiClientOptions;
