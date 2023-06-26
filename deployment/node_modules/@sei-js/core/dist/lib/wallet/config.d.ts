import { ChainInfo, SupportedWallet, WalletWindowKey } from './types';
export declare const SUPPORTED_WALLETS: SupportedWallet[];
export declare const getChainSuggest: (chainInfo?: ChainInfo) => {
    chainId: string;
    chainName: string;
    rpc: string;
    rest: string;
    bip44: {
        coinType: number;
    };
    bech32Config: {
        bech32PrefixAccAddr: string;
        bech32PrefixAccPub: string;
        bech32PrefixValAddr: string;
        bech32PrefixValPub: string;
        bech32PrefixConsAddr: string;
        bech32PrefixConsPub: string;
    };
    currencies: ({
        coinDenom: string;
        coinMinimalDenom: string;
        coinDecimals: number;
        coinGeckoId?: undefined;
    } | {
        coinDenom: string;
        coinMinimalDenom: string;
        coinDecimals: number;
        coinGeckoId: string;
    })[];
    feeCurrencies: {
        coinDenom: string;
        coinMinimalDenom: string;
        coinDecimals: number;
    }[];
    stakeCurrency: {
        coinDenom: string;
        coinMinimalDenom: string;
        coinDecimals: number;
    };
    coinType: number;
    features: string[];
};
export declare const suggestChain: (inputWallet: WalletWindowKey, chainInfo?: ChainInfo) => Promise<void>;
