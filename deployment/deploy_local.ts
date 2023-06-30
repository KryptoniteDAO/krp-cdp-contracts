import {
    storeCode, instantiateContract, executeContract, queryStakingDelegations,
    queryWasmContract, queryAddressBalance, queryStaking, queryStakingParameters, sendCoin, migrateContract
} from "./common";
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { parseCoins, coins, coin } from "@cosmjs/stargate";

require("dotenv").config();

async function main(): Promise<void> {

    console.log(`--- deploy enter ---`)

    const LCD_ENDPOINT = process.env.LCD_ENDPOINT;
    const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
    const mnemonic = process.env.MNEMONIC;
    const mnemonic2 = process.env.MNEMONIC2;
    const validator = process.env.validator;
    let stable_coin_denom = process.env.stable_coin_denom;
    let usdt_denom = "factory/sei1h3ukufh4lhacftdf6kyxzum4p86rcnel35v4jk/USDT"

    if (!LCD_ENDPOINT || !RPC_ENDPOINT || !mnemonic || !mnemonic2 || !validator || !stable_coin_denom) {
        console.log(`--- deploy error, missing some attributes ---`)
        process.exit(0);
        return;
    }

    const prefix = process.env.PREFIX ?? "sei";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    const [account] = await wallet.getAccounts();
    const wallet2 = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2, { prefix });
    const [account2] = await wallet2.getAccounts();

    console.log(`address1: `, account.address)
    await queryAddressBalance(LCD_ENDPOINT, account.address, "usei");
    await queryAddressBalance(LCD_ENDPOINT, account.address, usdt_denom);
    console.log()
    console.log(`address2: `, account2.address)
    await queryAddressBalance(LCD_ENDPOINT, account2.address, "usei");
    await queryAddressBalance(LCD_ENDPOINT, account2.address, usdt_denom);

    let controlCodeId = 598;
    let poolCodeId = 599;
    let custodyCodeId = 1466;
    let liquidateCodeId = 601;
    let mockOralceCodeId = 0;
    let mockSwapExtentCodeId = 0;
    let oralcePythCodeId = 0;

    // let controlAddress = "process.env.controlAddress";
    // let poolAddress = process.env.poolAddress;
    // let custodyAddress = process.env.custodyAddress;
    // let liquidateAddress = process.env.liquidateAddress;
    //local environment
    // let controlAddress = "sei1wwxg3fazku9d63c2w0h5tt070h35rlyrq4fks4n2sxhcxxfwm2usvrl4hk";
    // let custodyAddress = "sei1u8aj8x2pp43j2uyugl4rmlxe9m5l9p3jl3yfqwdmdnwcqdx0a52qd79kt3";
    // let poolAddress = "sei1c2n50wv0hm2l27sm8nhdp7tpxk3u8knaa9mz8cd6a6pt2z5ce4hqp46mxw";
    // let liquidateAddress = "sei1cwurnfw0hu4gdagl8p84a6pxnazt65ae5a6h6dax9ht4qw6r7srskwkj94";
    // let mockOralceAddress = "sei13znx74mv62vj4uzvt87wfak9lttscz3jwmug32v8v553pe7hlknsdh0u6x";
    // let mockSwapExtentAddress = "sei1u88l85xjxwqcm58e63r5a7a9flmvg6pkua7x7mktrhw9nkeq0q0qmxxmdv";
    // let oralcePythAddress = "sei105wzym5j5r65t3hg6jdwefl0y3kyentr95g0vr3w8va5357jj65s5ny2zr";
    // let custodyStSeiAddress = "sei1y8rj4n6c4yl77ztvys0f06g4rvxa9z5a0lgylgg75k4gqnfex6vqy8ddvv";

    // let bSeiTokenAddress = "sei18thzsd7z5f4lsqsqeqs0546r040mry57ygulnzwyvdsfwfyrprdsumg6q6";
    // let stSeiTokenAddress = "sei1p5g60g25yp54nhyllvmgf0j2m0xwfy4hetlqw2hkpsalq27x8stqqvk4jp";
    // stable_coin_denom = "factory/sei1c2n50wv0hm2l27sm8nhdp7tpxk3u8knaa9mz8cd6a6pt2z5ce4hqp46mxw/kUSD";

    //local 108 evironment
    // let controlAddress = "sei1u96j863ddwrqwvlc4dznwq08apgyhdzq0cym35re50y3hecg2kwq6p2tsa";
    // let custodyAddress = "sei10vhmwyv7jcc5lf6wxc07c9xp9upl4clxaf89r5c0w4u8ppnzfdes087hpv";
    // let poolAddress = "sei1hae74clcf6yd5cpmhw52tgtraq03yyz9ep998mnekmyx7agz70lqwnnsk4";
    // let liquidateAddress = "sei1g4rw4zyhwnnvhq3l9kmr9g0qmvxvp3ze5amhsz8dsseacf3efeuqgtzaay";
    // let mockOralceAddress = "sei1fwv84faa4erczjgfc84tw2nf0asf5ywww5h35kaxasdem6sr8lwqe0szv2";
    // let mockSwapExtentAddress = "sei1as3afspxc253e4cm3hz2u0c2czscyqhn540t8cm9zvcak06kzfnspxjnxg";
    // let oralcePythAddress = "sei1hfthh7j3lw66ppuf9enx9x4lxfphy40k2mxeeuh0j6dj26lw80hqx4najk";
    // let custodyStSeiAddress = "sei1g8vfgdyvql3hd9jqcaa23ht7qkkzvrfc8uzgwqss4yqhcatw389qqhga5g";

    // let bSeiTokenAddress = "sei1mmy0sf2cynv0kup8x0mjr4kkmgc48ksdpest70va5tvgkfgw5huq8y25vx";
    // let stSeiTokenAddress = "sei1k7ly5araww0mgcvgjm2kanj6ugvgze39xnyceztrjh0k46rhzp7quwzsj3";
    // stable_coin_denom = "factory/sei1hae74clcf6yd5cpmhw52tgtraq03yyz9ep998mnekmyx7agz70lqwnnsk4/kUSD";


    //atlantic-2 evironment
    let controlAddress = "sei1qvudqa3kmwy3aaw0jev8snsk3vm8a8njje7607y4ukzupv7rdhfs76hvmc";
    //let controlAddress = "";
    let custodyAddress = "sei1gg54rycy4h6aaf7v7eq4jadm4t342xhckdym5aa4ystlnqezdn2qdgzykw";
    let poolAddress = "sei1eaffhjnw6kzznfhcuq69aflagc3pauq5dwtg66knxxmjk5p8xyeqhstugq";
    let liquidateAddress = "sei1mpyd86mpvaus2u5cft5f9vxlxysrd8k6xp4d7qf8juhx3z6ug6eqq5s5fu";
    let mockOralceAddress = "sei1fwv84faa4erczjgfc84tw2nf0asf5ywww5h35kaxasdem6sr8lwqe0szv2";
    let mockSwapExtentAddress = "sei1as3afspxc253e4cm3hz2u0c2czscyqhn540t8cm9zvcak06kzfnspxjnxg";
    let oralcePythAddress = "sei1as0y6afdlwjj0ehprtq6k54q9hftf8c08tguqx36mhpdc4ml9wtstrjc7m";
    let custodyStSeiAddress = "sei1sv75wg6zvj6uuukufp5f2y37lc959s48mzrdj80tr6pzf2h2v36s74mz5q";

    let bSeiTokenAddress = "sei16g20mj2wagxjnyzgre70xkc8q756625fvjxfvfshk7eemszwp0zsez34ex";
    let stSeiTokenAddress = "sei1lpx0jcqm0uvt8w3t9039lkntdlpkr2r929zzutnsu3x6fys44t2qgjxsv8";
    stable_coin_denom = "factory/sei1eaffhjnw6kzznfhcuq69aflagc3pauq5dwtg66knxxmjk5p8xyeqhstugq/kUSD";

    if ("" == controlAddress) {
        controlCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_central_control.wasm");
        controlAddress = await instantiateContract(RPC_ENDPOINT, wallet, controlCodeId,
            {
                owner_addr: account.address,
                oracle_contract: account.address,
                pool_contract: account.address,
                custody_contract: account.address,
                liquidation_contract: account.address,
                stable_denom: "USDT",
                epoch_period: 1681,
                redeem_fee: "0.005",
            }, parseCoins(""), "cdp central control")
    }


    if ("" == poolAddress) {
        poolCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_stable_pool.wasm");
        poolAddress = await instantiateContract(RPC_ENDPOINT, wallet, poolCodeId,
            {
                owner_addr: account.address,
                sub_demon: "kUSD",
                control_contract: controlAddress,
                min_redeem_value: "1000000",
            }, parseCoins("10000000usei"), "cdp stable pool contract")
    }

    if ("" == custodyAddress) {
        custodyCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_custody.wasm");
        custodyAddress = await instantiateContract(RPC_ENDPOINT, wallet, custodyCodeId,
            {
                owner_addr: account.address,
                control_contract: controlAddress,
                pool_contract: poolAddress,
                collateral_contract: account.address,
                liquidation_contract: account.address,
            }, parseCoins(""), "cdp custody")
    }
    if ("" == liquidateAddress) {
        liquidateCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_liquidation_queue.wasm");
        liquidateAddress = await instantiateContract(RPC_ENDPOINT, wallet, liquidateCodeId,
            {
                owner: account.address,
                oracle_contract: account.address,
                stable_denom: stable_coin_denom,
                safe_ratio: "0.8",
                bid_fee: "0.01",
                liquidator_fee: "0.01",
                liquidation_threshold: "500",
                price_timeframe: 86400,
                waiting_period: 600,
                control_contract: controlAddress,
            }, parseCoins(""), "cdp liquidate queue contract")
    }

    if ("" == custodyStSeiAddress) {
        custodyStSeiAddress = await instantiateContract(RPC_ENDPOINT, wallet, custodyCodeId,
            {
                owner_addr: account.address,
                control_contract: controlAddress,
                pool_contract: poolAddress,
                collateral_contract: stSeiTokenAddress,
                liquidation_contract: liquidateAddress,
            }, parseCoins(""), "cdp custody stSEI")
    }

    if ("" == mockOralceAddress) {
        mockOralceCodeId = await storeCode(RPC_ENDPOINT, wallet, "../../mock-oracle/artifacts/mock_oracle.wasm");
        mockOralceAddress = await instantiateContract(RPC_ENDPOINT, wallet, mockOralceCodeId, {}, parseCoins(""), "cdp mock oralce contract");
    }


    if ("" == oralcePythAddress) {
        oralcePythCodeId = await storeCode(RPC_ENDPOINT, wallet, "../../krp-market-contracts/artifacts/moneymarket_oracle_pyth.wasm");
        oralcePythAddress = await instantiateContract(RPC_ENDPOINT, wallet, oralcePythCodeId, {
            owner: account.address,
            pyth_contract: mockOralceAddress
        }, parseCoins(""), "oracle pyth contract");
    }

    if ("" == mockSwapExtentAddress) {
        mockSwapExtentCodeId = await storeCode(RPC_ENDPOINT, wallet, "../../mock-swap-pair/artifacts/mock_swap_pair.wasm");
        mockSwapExtentAddress = await instantiateContract(RPC_ENDPOINT, wallet, mockSwapExtentCodeId,
            {
                "asset_infos":
                    [
                        { "native_token": { "denom": "usei" } },
                        { "native_token": { "denom": "factory/sei1h3ukufh4lhacftdf6kyxzum4p86rcnel35v4jk/usdt" } }
                    ],
                "swap_0_to_1_price": "1890000000"
            }, parseCoins(""), "cdp mock swap extent contract");
    }


    // console.log()

    // console.log(`CONTROL_ID = ${controlCodeId}`)
    // console.log(`CUSTODY_ID = ${custodyCodeId}`)
    // console.log(`POOL_ID = ${poolCodeId}`)
    // console.log(`LIQUIDATE_QUEUE_ID = ${liquidateCodeId}`)
    // console.log(`MOCK_ORALCE_ID = ${mockOralceCodeId}`)
    // console.log(`MOCK_SWAP_EXTENT_ID = ${mockSwapExtentCodeId}`)


    // console.log()
    // console.log(`controlAddress: "${controlAddress}",`)
    // console.log(`custodyAddress: "${custodyAddress}",`)
    // console.log(`poolAddress: "${poolAddress}",`)
    // console.log(`liquidateAddress: "${liquidateAddress}",`)
    // console.log(`mockOralceAddress: "${mockOralceAddress}",`)
    // console.log(`mockSwapExtentAddress: "${mockSwapExtentAddress}",`)
    // console.log(`oraclePythAddress: "${oralcePythAddress}",`)
    // console.log(`custodyStseiAddress:"${custodyStSeiAddress}"`)

    /////////////////////////////////////////configure contracts///////////////////////////////////////////

    ///  query  configure of cdp contracts
    //await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { config: {} });

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {whitelist:{}});

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { config: {}});

    // await queryWasmContract(RPC_ENDPOINT, wallet, custodyStSeiAddress, { config: {} });
    // configure mock oralce and swap
    // console.log("update collateral price...")
    // console.log("whitelist collateral bSEI:");
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     whitelist_collateral: {
    //         name: "bond SEI",
    //         symbol: "bSEI",
    //         max_ltv: "0.6",
    //         custody_contract: custodyAddress,
    //         collateral_contract: bSeiTokenAddress,
    //     }
    // }, "", parseCoins(""))
    // console.log("whitelist collateral stSEI:");
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     whitelist_collateral: {
    //         name: "staking SEI",
    //         symbol: "stSEI",
    //         max_ltv: "0.6",
    //         custody_contract: custodyStSeiAddress,
    //         collateral_contract: stSeiTokenAddress,
    //     }
    // }, "", parseCoins(""))
    /// change oralce_pyth contract configure to mockoracle address
    // await executeContract(RPC_ENDPOINT, wallet, oralcePythAddress, {
    //     change_pyth_contract: {
    //         pyth_contract: mockOralceAddress
    //     }
    // }, "", parseCoins(""))

    // ///configure mock oracle price feed id price
    // await executeContract(RPC_ENDPOINT, wallet, mockOralceAddress,
    //     {
    //         update_price_feed:
    //         {
    //             id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814",
    //             price: 189012345678
    //         }
    //     }, "", parseCoins(""));

    // ///configure orace pyth price feed id
    // await executeContract(RPC_ENDPOINT, wallet, oralcePythAddress, {
    //     config_feed_info: {
    //         asset: bSeiTokenAddress,
    //         price_feed_id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814",
    //         price_feed_symbol: "Crypto.ETH/USD",
    //         price_feed_decimal: 8,
    //         price_feed_age: 720000000,
    //         check_feed_age: true,
    //     }
    // }, "", parseCoins(""))
    // await executeContract(RPC_ENDPOINT, wallet, oralcePythAddress, {
    //         config_feed_info: {
    //             asset: stSeiTokenAddress,
    //             price_feed_id: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    //             price_feed_symbol: "Crypto.ETH/USD",
    //             price_feed_decimal: 8,
    //             price_feed_age: 720000000,
    //             check_feed_age: true,
    //         }
    //     }, "", parseCoins(""))

    
    // ///configure cdp contract begin
    // console.log("Updating control's config...")
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     update_config: {
    //         oracle_contract: oralcePythAddress,
    //         pool_contract: poolAddress,
    //         custody_contract: custodyAddress,
    //         liquidation_contract: liquidateAddress,
    //         stable_denom: stable_coin_denom,
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating control's config end")


    // console.log("Updating custody bSei's config...")
    // await executeContract(RPC_ENDPOINT, wallet, custodyAddress, {
    //     update_config: {
    //         control_contract: controlAddress,
    //         pool_contract: poolAddress,
    //         collateral_contract: bSeiTokenAddress,
    //         liquidation_contract: liquidateAddress,
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating custody bSei's config end")

    // console.log("Updating custody stSEI's config...")
    // await executeContract(RPC_ENDPOINT, wallet, custodyStSeiAddress, {
    //     update_config: {
    //         control_contract: controlAddress,
    //         pool_contract: poolAddress,
    //         collateral_contract: stSeiTokenAddress,
    //         liquidation_contract: liquidateAddress,
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating custody stSEI's config end")

    // console.log("Updating liquidate's config...")
    // await executeContract(RPC_ENDPOINT, wallet, liquidateAddress, {
    //     update_config: {
    //         oracle_contract: oralcePythAddress,
    //         stable_denom: stable_coin_denom,
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating liquidate's config end")

    // console.log("Updating liquidate's whitelist bSEi collateral...")
    // await executeContract(RPC_ENDPOINT, wallet, liquidateAddress, {
    //     whitelist_collateral: {
    //         collateral_token: bSeiTokenAddress,
    //         bid_threshold: "200000000",
    //            max_slot: 10,
    //            premium_rate_per_slot: "0.01"
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating liquidate's whitelist bSEi collateral end")

    // console.log("Updating liquidate's whitelist stSEi collateral...")
    // await executeContract(RPC_ENDPOINT, wallet, liquidateAddress, {
    //     whitelist_collateral: {
    //         collateral_token: stSeiTokenAddress,
    //         bid_threshold: "200000000",
    //            max_slot: 10,
    //            premium_rate_per_slot: "0.01"
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating liquidate's whitelist stSEi collateral end")
    
    /// update contract configure end


    ///migrate control contract
    // controlCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_central_control.wasm");
    // await migrateContract(RPC_ENDPOINT, wallet, controlAddress, controlCodeId, {}, "");

    // custodyCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_custody.wasm");
    // await migrateContract(RPC_ENDPOINT, wallet, custodyAddress, custodyCodeId, {}, "");
    // await migrateContract(RPC_ENDPOINT, wallet, custodyStSeiAddress, custodyCodeId, {}, "");

    // poolCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_stable_pool.wasm");
    // await migrateContract(RPC_ENDPOINT, wallet, poolAddress, poolCodeId, {}, "");

    // liquidateCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_liquidation_queue.wasm");
    // await migrateContract(RPC_ENDPOINT, wallet, liquidateAddress, liquidateCodeId, {}, "");


    // console.log("query oracle pyth configure:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, {query_config: {}});

    // console.log("query oracle pyth bSEI price:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_price: { asset: bSeiTokenAddress } });

    // console.log("query oracle pyth stSEI price:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_price: { asset: stSeiTokenAddress } });
    // console.log("query oracle pyth bSEI configure:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_pyth_feeder_config: { asset: bSeiTokenAddress } });
    // console.log("query oracle pyth stSEI configure:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_pyth_feeder_config: { asset: stSeiTokenAddress } });
    // console.log("query mock oracle :");
    // await queryWasmContract(RPC_ENDPOINT, wallet, mockOralceAddress, { price_feed: { id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814" }});


    ///case 1. mint_stable_coin with deposit collateral bSei
    // console.log("case 1 mint stable coin with deposit collateral bSei...")
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, { balance : { address: account.address}});
    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { state: {} });
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance : { address: account.address }});
    // console.log("mint kUSD stable coin")
    // await executeContract(RPC_ENDPOINT, wallet, bSeiTokenAddress,
    //     {
    //         send: {
    //             contract: custodyAddress,
    //             amount: "10000000",
    //             msg: Buffer.from(JSON.stringify({
    //                 "mint_stable_coin": {
    //                     "stable_amount": "10000000000",
    //                     "is_redemption_provider": true,

    //                 }
    //             })).toString('base64')
    //         }
    //     }, "", parseCoins(""));

    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { loan_info: { minter: account.address } });
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, { balance : { address: custodyAddress}});


    ///case 2. mint stable coin without  deposit collalteral bSei
    // console.log("case 2. mint stable coin without  deposit collalteral bSei...")
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     mint_stable_coin: {
    //         minter: account.address,
    //         stable_amount: "180000000",
    //     }
    // }, "", parseCoins(""));
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);

    ///case 3. mint stable coin with deposit collateral bAtom
    // console.log("case 3. mint stable coin with deposit collateral stSei...")
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance: { address: account.address } });
    // await executeContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, {
    //     send: {
    //         contract: custodyStSeiAddress,
    //         amount: "100000",
    //         msg: Buffer.from(JSON.stringify({
    //             "mint_stable_coin": {
    //                 "stable_amount": "1000000",
    //                 "is_redemption_provider": true,

    //             }
    //         })).toString('base64')
    //     }
    // }, "", parseCoins(""));
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { loan_info: { minter: account.address } });
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance : { address: custodyStSeiAddress}});

    ///case 4. withdraw collateral bSei
    // console.log("case 4. withdraw collateral bSei...")
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     withdraw_collateral: {
    //         collateral_contract: bSeiTokenAddress,
    //         collateral_amount: "10000",
    //     }
    // }, "", parseCoins(""));

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })
    // ///case 5. withdraw collateral bAtom
    // console.log("case 5. withdraw collateral stSEI...")
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance :  {address: custodyStSeiAddress}})

    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     withdraw_collateral: {
    //         collateral_contract: stSeiTokenAddress,
    //         collateral_amount: "10000",
    //     }
    // }, "", parseCoins(""));

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    ///case 6. deposite collateral bSei
    // console.log("case 6. deposite collateral bSei...")
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    // await executeContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {
    //     send: {
    //         contract: custodyAddress,
    //         amount: "100000",
    //         msg: Buffer.from(JSON.stringify({
    //             deposit_collateral: {}
    //         })).toString('base64')
    //     }
    // }, "", parseCoins(""));

    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, { balance: { address: custodyAddress } })
    // await queryWasmContract(RPC_ENDPOINT, wallet, custodyAddress, { state: {} })
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    ///case 7. deposite collateral bAtom
    // console.log("case 7. deposite collateral stSEI...")
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    // await executeContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, {
    //     send: {
    //         contract: custodyStSeiAddress,
    //         amount: "10000",
    //         msg: Buffer.from(JSON.stringify({
    //             deposit_collateral: {}
    //         })).toString('base64')
    //     }
    // }, "", parseCoins(""));

    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance: { address: custodyStSeiAddress } })
    // await queryWasmContract(RPC_ENDPOINT, wallet, custodyStSeiAddress, { state: {} })
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    ///case 8. repay kUSD
    // console.log("case 8. repay kUSD...")
    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, {state:{}});

    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);

    // await executeContract(RPC_ENDPOINT, wallet, poolAddress, {repay_stable_coin: {}}, "", coins(1000000, stable_coin_denom));

    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, {state:{}});

    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);


    ///case 9. redeem kUSD
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await sendCoin(RPC_ENDPOINT, wallet, account2.address, "", coin(1000000, stable_coin_denom));
    // await queryAddressBalance(LCD_ENDPOINT, account2.address, stable_coin_denom);

    // console.log("pool state:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { state: {} });

    // console.log("account 2 stable coin balance:")
    // await queryAddressBalance(LCD_ENDPOINT, account2.address, stable_coin_denom);

    // console.log("account 1 loan info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {loan_info: { minter: account.address }});

    // console.log("account 2 BSEIToken balance:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {balance : { address: account2.address}});

    // console.log("account 2 stSEIToken balance:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, {balance: { address: account2.address}});

    // console.log("redeem stable coin:")
    // await executeContract(RPC_ENDPOINT, wallet2, poolAddress, { redeem_stable_coin: { minter: account.address } }, "", coins(1000000, stable_coin_denom));

    // console.log("pool state:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { state: {} });

    // console.log("account2 stable coin balance:")
    // await queryAddressBalance(LCD_ENDPOINT, account2.address, stable_coin_denom);

    // console.log("account 1 loan info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {loan_info: { minter: account.address }});

    // console.log("account 2 BSEIToken balance:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {balance : { address: account2.address}});

    // console.log("account 2 stSEIToken balance:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, {balance: { address: account2.address}});


    ///case 10. liquidate collateral

    // console.log("pool state:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { state: {} });

    // console.log("account 1 loan info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { loan_info: { minter: account.address } });

    // //send to 100 kUSD to account2
    // // await sendCoin(RPC_ENDPOINT, wallet, account2.address, "", coin(100000000, stable_coin_denom));

    // console.log("account 2 stable coin balance:")
    // await queryAddressBalance(LCD_ENDPOINT, account2.address, stable_coin_denom);

    // await queryWasmContract(RPC_ENDPOINT, wallet, liquidateAddress, { config: {} })

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { config: {} })

    // await queryWasmContract(RPC_ENDPOINT, wallet, liquidateAddress, {
    //     bid_pool: {
    //         collateral_token: bSeiTokenAddress,
    //         bid_slot: 1
    //     }
    // })

    // //submit bid to liquidation pool
    // await executeContract(RPC_ENDPOINT, wallet2, liquidateAddress, {
    //     submit_bid: {
    //         collateral_token: bSeiTokenAddress,
    //         premium_slot: 1
    //     }
    // }, "", coins(100000000, stable_coin_denom))
    // console.log("submit bid succeed.")


    //modify price 
    // await executeContract(RPC_ENDPOINT, wallet, mockOralceAddress,
    //     {
    //         update_price_feed:
    //         {
    //             id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814",
    //             price: 120012345678
    //         }
    //     }, "", parseCoins(""));

    //issue liquidate
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, { liquidate_collateral: { minter: account.address } }, "", parseCoins(""))

    // console.log("pool state:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { state: {} });

    // console.log("account 1 loan info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { loan_info: { minter: account.address } });


    //query interface
    console.log("query bSEI collateral info:")
    await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {collateral_elem: { collateral: bSeiTokenAddress } });
    console.log("query stSEI collateral info:")
    await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {collateral_elem: { collateral: stSeiTokenAddress } });

    await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_price: { asset: bSeiTokenAddress } });
    await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_price: { asset: stSeiTokenAddress } });

    await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { loan_info: { minter: account.address } });

    await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } });


    //await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {redemption_provider_list: { minter: "sei1grq2267xm4qzdzu43yt75p006m9axp9sf2nzshc8utlqru2lktkskkjn6c"}});

    await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {collateral_available:{minter: account.address, collateral_contract: bSeiTokenAddress}} );

    await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {config:{}});

    await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    
    //wsendCoin(RPC_ENDPOINT, wallet, "sei135mlnw9ndkyglgx7ma95pw22cl64mpnw58pfpd", "", coin(9900000000, stable_coin_denom));

    await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);


    console.log("account BSEIToken balance:")
    await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {balance : { address: account.address}});



}

main().catch(console.log);
