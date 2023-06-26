"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const config_1 = require("./config");
// Needed to generate an offline signer
global.TextEncoder = util_1.TextEncoder;
describe('getChainSuggest', () => {
    it('should return a chain config', () => __awaiter(void 0, void 0, void 0, function* () {
        const chainId = 'atlantic-1';
        const restUrl = 'https://rest-url';
        const rpcUrl = 'https://rpc-url';
        expect((0, config_1.getChainSuggest)({ chainId, restUrl, rpcUrl })).toEqual({
            chainId: 'atlantic-1',
            chainName: 'Sei Testnet',
            rpc: rpcUrl,
            rest: restUrl,
            bip44: {
                coinType: 118,
            },
            bech32Config: {
                bech32PrefixAccAddr: 'sei',
                bech32PrefixAccPub: `seipub`,
                bech32PrefixValAddr: `seivaloper`,
                bech32PrefixValPub: `seivaloperpub`,
                bech32PrefixConsAddr: `seivalcons`,
                bech32PrefixConsPub: `seivalconspub`,
            },
            currencies: [
                {
                    coinDenom: 'SEI',
                    coinMinimalDenom: 'usei',
                    coinDecimals: 6,
                },
                {
                    coinDenom: 'USDC',
                    coinMinimalDenom: 'uusdc',
                    coinDecimals: 6,
                    coinGeckoId: 'usd-coin',
                },
                {
                    coinDenom: 'ATOM',
                    coinMinimalDenom: 'uatom',
                    coinDecimals: 6,
                    coinGeckoId: 'cosmos',
                },
                {
                    coinDenom: 'WETH',
                    coinMinimalDenom: 'ibc/C2A89D98873BB55B62CE86700DFACA646EC80352E8D03CC6CF34DD44E46DC75D',
                    coinDecimals: 18,
                    coinGeckoId: 'weth',
                },
                {
                    coinDenom: 'WBTC',
                    coinMinimalDenom: 'ibc/42BCC21A2B784E813F8878739FD32B4AA2D0A68CAD94F4C88B9EA98609AB0CCD',
                    coinDecimals: 8,
                    coinGeckoId: 'bitcoin',
                },
                {
                    coinDenom: 'aUSDC',
                    coinMinimalDenom: 'ibc/6D45A5CD1AADE4B527E459025AC1A5AEF41AE99091EF3069F3FEAACAFCECCD21',
                    coinDecimals: 6,
                    coinGeckoId: 'usd-coin',
                },
                {
                    coinDenom: 'UST2',
                    coinMinimalDenom: 'factory/sei1466nf3zuxpya8q9emxukd7vftaf6h4psr0a07srl5zw74zh84yjqpeheyc/uust2',
                    coinDecimals: 6,
                },
                {
                    coinDenom: 'uCeler',
                    coinMinimalDenom: 'factory/sei174t9p63nzlmsycmd9x9zxx3ejq9lp2y9f69rp9/uceler',
                    coinDecimals: 6,
                },
            ],
            feeCurrencies: [
                {
                    coinDenom: 'SEI',
                    coinMinimalDenom: 'usei',
                    coinDecimals: 6,
                },
            ],
            stakeCurrency: {
                coinDenom: 'SEI',
                coinMinimalDenom: 'usei',
                coinDecimals: 6,
            },
            coinType: 118,
            features: ['stargate', 'ibc-transfer', 'cosmwasm'],
        });
    }));
});
describe('suggestChain', () => {
    let windowSpy;
    beforeEach(() => {
        windowSpy = jest.spyOn(window, 'window', 'get');
    });
    afterEach(() => {
        windowSpy.mockRestore();
    });
    it('should throw an error if no wallet is installed', () => __awaiter(void 0, void 0, void 0, function* () {
        windowSpy.mockImplementation(() => ({}));
        const key = 'keplr';
        yield expect((0, config_1.suggestChain)(key)).rejects.toThrowError();
    }));
    it('should call experimentalSuggestChain and return undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        windowSpy.mockImplementation(() => ({
            keplr: {
                experimentalSuggestChain: () => undefined,
            },
        }));
        const key = 'keplr';
        yield expect((0, config_1.suggestChain)(key)).resolves.toBeUndefined();
    }));
});
