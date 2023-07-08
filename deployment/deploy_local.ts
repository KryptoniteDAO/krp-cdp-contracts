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
    let rewardBookCodeId = 0;
    let mockOralceCodeId = 0;
    let mockSwapPairCodeId = 0;
    let oralcePythCodeId = 0;
    let keeperCodeId = 0;


    /// local environment
    // let controlAddress = "sei1wwxg3fazku9d63c2w0h5tt070h35rlyrq4fks4n2sxhcxxfwm2usvrl4hk";
    // let custodyCdpBseiAddress = "sei1u8aj8x2pp43j2uyugl4rmlxe9m5l9p3jl3yfqwdmdnwcqdx0a52qd79kt3";
    // let poolAddress = "sei1c2n50wv0hm2l27sm8nhdp7tpxk3u8knaa9mz8cd6a6pt2z5ce4hqp46mxw";
    // let liquidateAddress = "sei1cwurnfw0hu4gdagl8p84a6pxnazt65ae5a6h6dax9ht4qw6r7srskwkj94";
    // let mockOralceAddress = "sei13znx74mv62vj4uzvt87wfak9lttscz3jwmug32v8v553pe7hlknsdh0u6x";
    // let mockSwapExtentAddress = "sei1u88l85xjxwqcm58e63r5a7a9flmvg6pkua7x7mktrhw9nkeq0q0qmxxmdv";
    // let oralcePythAddress = "sei105wzym5j5r65t3hg6jdwefl0y3kyentr95g0vr3w8va5357jj65s5ny2zr";
    // let custodyCdpStSeiAddress = "sei1y8rj4n6c4yl77ztvys0f06g4rvxa9z5a0lgylgg75k4gqnfex6vqy8ddvv";

    // let bSeiTokenAddress = "sei18thzsd7z5f4lsqsqeqs0546r040mry57ygulnzwyvdsfwfyrprdsumg6q6";
    // let stSeiTokenAddress = "sei1p5g60g25yp54nhyllvmgf0j2m0xwfy4hetlqw2hkpsalq27x8stqqvk4jp";
    // stable_coin_denom = "factory/sei1c2n50wv0hm2l27sm8nhdp7tpxk3u8knaa9mz8cd6a6pt2z5ce4hqp46mxw/kUSD";

    /// local 108 evironment for integrated debugging
    // let controlAddress = "sei1ys5wwd8f0788ve8nz7ltwccg03vun372vsead7erjcha5qe92t4s40ngz0";
    // let custodyCdpBseiAddress = "sei10g9ayn629jr2jehnl92s8770axhucemcdtmwm76cmqhd5yar805qnkzc8f";
    // let rewardBookBseiAddress = "sei1u4hppt42h530fep7vuzhd58cle2vvu8yeyvsxs6d52wq08708xnqfttue7";
    // let poolAddress = "sei190exnyu4240jfsg5hlegehyam5c98j8n3834gw96q8ct9y28l95s7frww7";
    // let liquidateAddress = "sei16n807scyqhauhnk8d26c3y4c78x322vgscgg57x2600kfwntxxtqt9nuzq";
    // let custodyCdpStSeiAddress = "sei1acvq5ccyw8g3rcgzlwaud9jtt2xyy9m9x96zp0p6s3plsw2clmuqg4z6vf";
    // let rewardBookStseiAddress = "sei1trpkd0cu2gftt2tgfa3mxaz3qfnk979zwqmy9zc773aqx79q0njs07quyk";
    // stable_coin_denom = "factory/sei190exnyu4240jfsg5hlegehyam5c98j8n3834gw96q8ct9y28l95s7frww7/kUSD";

    // /// public contract
    // let mockOralceAddress = "sei1fwv84faa4erczjgfc84tw2nf0asf5ywww5h35kaxasdem6sr8lwqe0szv2";
    // let mockSwapPairAddress = "sei15f54ulq3ul4h4hqg87nl2wyhp2sy0mu0e9hx5dumns6v4vjkglfq7za90u";
    // let swapExtentAddress = "sei163sx9s6909cztjhthdwq38lu0djcm0w4mlqxh4mnj25pnwye44dqch5yd4";
    // let oralcePythAddress = "sei1hfthh7j3lw66ppuf9enx9x4lxfphy40k2mxeeuh0j6dj26lw80hqx4najk";

    // /// from staking module
    // let hubAddress = "sei1q73cd98thwtvckgqsl6vqfpll7pylhrajss2uy9sqcmsj8qswzns0aystq";
    // let rewardAddress = "sei1sl5zza83gp5gza5z0c338p2he2lv7ypfj2jp753zydnc74ngq8uqwaf279";
    // let bSeiTokenAddress = "sei1vgnnpxgpg4j0j7l2ls2z9me384kg73evfamqm2v2xztrhdsrhd6ss4su2h";
    // let rewardDispatcherAddress = "sei155zvg4s95smym6unjmquee6rmx34ccw68rdyc947nnyctsz65psqmmwfk9";
    // let validatorRegistryAddress = "sei16fxa7cv8raegqmrd4jcehv8py29wy3243jszjgt5fk5zjnjgrvwqmf783q";
    // let stSeiTokenAddress = "sei19skt7utcq8fvw90rd8ypuqd2vlyv807jc9m3yvr7dt4cdckezpvqk8ws6z";

    /// from KPT module
    let keeperAddress = "sei13285exwkg0pwv5nnncutckghucmux2hc9ud5yj75jw8xrarquzksqzpq2y";


    /// atlantic-2 evironment
    // let controlAddress = "sei1qvudqa3kmwy3aaw0jev8snsk3vm8a8njje7607y4ukzupv7rdhfs76hvmc";
    // let custodyCdpBseiAddress = "sei1gg54rycy4h6aaf7v7eq4jadm4t342xhckdym5aa4ystlnqezdn2qdgzykw";
    // let poolAddress = "sei1eaffhjnw6kzznfhcuq69aflagc3pauq5dwtg66knxxmjk5p8xyeqhstugq";
    // let liquidateAddress = "sei1mpyd86mpvaus2u5cft5f9vxlxysrd8k6xp4d7qf8juhx3z6ug6eqq5s5fu";
    // let rewardBookBseiAddress = "sei1fqt0csxyyx5plxyzk3ks9dzylnpaep8v598au29g9kkhc9ua95hsawmc05";  //!!!todo 
    // let custodyCdpStSeiAddress = "sei1sv75wg6zvj6uuukufp5f2y37lc959s48mzrdj80tr6pzf2h2v36s74mz5q";
    // let rewardBookStseiAddress = "sei127xd4tz9jtf2lee6qwnrlu4hkfqc3gp09jdmc7dnca5e8qyg44qsjnmlha";  //!!!todo 


    // /// public contract
    // let mockOralceAddress = "sei1fwv84faa4erczjgfc84tw2nf0asf5ywww5h35kaxasdem6sr8lwqe0szv2";
    // let mockSwapPairAddress = "sei1as3afspxc253e4cm3hz2u0c2czscyqhn540t8cm9zvcak06kzfnspxjnxg";
    // let oralcePythAddress = "sei1as0y6afdlwjj0ehprtq6k54q9hftf8c08tguqx36mhpdc4ml9wtstrjc7m";

    // /// from staking module
    // let bSeiTokenAddress = "sei16g20mj2wagxjnyzgre70xkc8q756625fvjxfvfshk7eemszwp0zsez34ex";
    // let stSeiTokenAddress = "sei1lpx0jcqm0uvt8w3t9039lkntdlpkr2r929zzutnsu3x6fys44t2qgjxsv8";
    // let rewardAddress = "sei1u6znfkqerkm9h6n0q6l2d6jqpxqlmfjkksk0gpf8k5eusmw0ag5sr450ea";
    // stable_coin_denom = "factory/sei1eaffhjnw6kzznfhcuq69aflagc3pauq5dwtg66knxxmjk5p8xyeqhstugq/kUSD";

    if ("" == controlAddress) {
        controlCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_central_control.wasm");
        controlAddress = await instantiateContract(RPC_ENDPOINT, wallet, controlCodeId,
            {
                owner_addr: account.address,
                oracle_contract: account.address,
                pool_contract: account.address,
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

    if ("" == custodyCdpBseiAddress) {
        custodyCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_custody.wasm");
        custodyCdpBseiAddress = await instantiateContract(RPC_ENDPOINT, wallet, custodyCodeId,
            {
                owner_addr: account.address,
                control_contract: controlAddress,
                pool_contract: poolAddress,
                collateral_contract: account.address,
                liquidation_contract: account.address,
                staking_reward_contract: account.address,
            }, parseCoins(""), "cdp custody")
    }
    if ("" == rewardBookBseiAddress) {
        rewardBookCodeId = await storeCode(RPC_ENDPOINT, wallet, "../artifacts/cdp_reward_book.wasm");
        rewardBookBseiAddress = await instantiateContract(RPC_ENDPOINT, wallet, rewardBookCodeId,
            {
                control_contract: controlAddress,
                reward_contract: rewardAddress,
                custody_contract: custodyCdpBseiAddress,
                reward_denom: stable_coin_denom,
                threshold: "1000000",
            }, parseCoins(""), "cdp bsei collateral staking reward contract")
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

    if ("" == custodyCdpStSeiAddress) {
        custodyCdpStSeiAddress = await instantiateContract(RPC_ENDPOINT, wallet, custodyCodeId,
            {
                owner_addr: account.address,
                control_contract: controlAddress,
                pool_contract: poolAddress,
                collateral_contract: stSeiTokenAddress,
                liquidation_contract: liquidateAddress,
                staking_reward_contract: account.address,
            }, parseCoins(""), "cdp custody stSEI")
    }

    if ("" == rewardBookStseiAddress) { //In place of bATOM collateral
        rewardBookStseiAddress = await instantiateContract(RPC_ENDPOINT, wallet, rewardBookCodeId,
            {
                control_contract: controlAddress,
                reward_contract: rewardAddress,
                custody_contract: custodyCdpStSeiAddress,
                reward_denom: stable_coin_denom,
                threshold: "1000000",
            }, parseCoins(""), "cdp stsei collateral staking reward contract")
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

    if ("" == mockSwapPairAddress) {
        mockSwapPairCodeId = await storeCode(RPC_ENDPOINT, wallet, "../../mock-swap-pair/artifacts/mock_swap_pair.wasm");
        mockSwapPairAddress = await instantiateContract(RPC_ENDPOINT, wallet, mockSwapPairCodeId,
            {
                "asset_infos":
                    [
                        { "native_token": { "denom": "usei" } },
                        { "native_token": { "denom": stable_coin_denom } }
                    ],
                "swap_0_to_1_price": "1890000000"
            }, parseCoins(""), "cdp mock swap pair contract");
    }


    if("" == keeperAddress) {
        keeperCodeId = await storeCode(RPC_ENDPOINT, wallet, "../../krp-token-contracts/artifacts/keeper.wasm");
        keeperAddress = await instantiateContract(RPC_ENDPOINT, wallet, keeperCodeId,
            {
                owner: account.address,
                threshold: "1000000",
                rewards_contract: "sei18mxhwra9xnxfc4p6dy74pavajf7ympulh906pyk7jc3924l58jqqsldjqq",
                rewards_denom: stable_coin_denom,
            }, parseCoins(""), "kpt tokens contract instantiate");
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
    // console.log(`custodyCdpBseiAddress: "${custodyCdpBseiAddress}",`)
    // console.log(`rewardBookBseiAddress:"${rewardBookBseiAddress}"`)
    // console.log(`poolAddress: "${poolAddress}",`)
    // console.log(`liquidateAddress: "${liquidateAddress}",`)
    // console.log(`custodyCdpStSeiAddress:"${custodyCdpStSeiAddress}"`)
    // console.log(`rewardBookStseiAddress:"${rewardBookStseiAddress}"`)

    // console.log(`mockOralceAddress: "${mockOralceAddress}",`)
    // console.log(`mockSwapPairAddress: "${mockSwapPairAddress}",`)
    // console.log(`oraclePythAddress: "${oralcePythAddress}",`)


    // console.log(`keeperAddress:"${keeperAddress}"`)

    /////////////////////////////////////////configure contracts///////////////////////////////////////////

    ///  query  configure of cdp contracts
    //await queryWasmContract(RPC_ENDPOINT, wallet, poolAddress, { config: {} });

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {whitelist:{}});

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { config: {}});

    //await queryWasmContract(RPC_ENDPOINT, wallet, custodyCdpStSeiAddress, { config: {} });
    ///configure mock oralce and swap
    // console.log("update collateral price...")
    // console.log("whitelist collateral bSEI:");
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     whitelist_collateral: {
    //         name: "bond SEI",
    //         symbol: "bSEI",
    //         max_ltv: "0.6",
    //         custody_contract: custodyCdpBseiAddress,
    //         collateral_contract: bSeiTokenAddress,
    //         staking_reward_contract: rewardBookBseiAddress,
    //     }
    // }, "", parseCoins(""))
    // console.log("whitelist collateral stSEI:");
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     whitelist_collateral: {
    //         name: "staking SEI",
    //         symbol: "stSEI",
    //         max_ltv: "0.6",
    //         custody_contract: custodyCdpStSeiAddress,
    //         collateral_contract: stSeiTokenAddress,
    //         staking_reward_contract: rewardBookStseiAddress,
    //     }
    // }, "", parseCoins(""))
    // // change oralce_pyth contract configure to mockoracle address
    // await executeContract(RPC_ENDPOINT, wallet, oralcePythAddress, {
    //     change_pyth_contract: {
    //         pyth_contract: mockOralceAddress
    //     }
    // }, "", parseCoins(""))

    // // ///configure mock oracle price feed id price
    // await executeContract(RPC_ENDPOINT, wallet, mockOralceAddress,
    //     {
    //         update_price_feed:
    //         {
    //             id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814",
    //             price: 189012345678
    //         }
    //     }, "", parseCoins(""));

    // await executeContract(RPC_ENDPOINT, wallet, mockOralceAddress,
    // {
    //     update_price_feed:
    //     {
    //         id: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    //         price: 101304000,
    //     }
    // }, "", parseCoins(""));

    // // ///configure orace pyth price feed id
    // await executeContract(RPC_ENDPOINT, wallet, oralcePythAddress, {
    //     config_feed_info: {
    //         asset: stable_coin_denom,
    //         price_feed_id: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    //         price_feed_symbol: "Crypto.kUSD/USD",
    //         price_feed_decimal: 8,
    //         price_feed_age: 720000000,
    //         check_feed_age: true,
    //     }
    // }, "", parseCoins(""))
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
    //     config_feed_info: {
    //         asset: stSeiTokenAddress,
    //         price_feed_id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814",
    //         price_feed_symbol: "Crypto.ETH/USD",
    //         price_feed_decimal: 8,
    //         price_feed_age: 720000000,
    //         check_feed_age: true,
    //     }
    // }, "", parseCoins(""));

    // /// add denom "usei" to oraclePythAddress  
    // await executeContract(RPC_ENDPOINT, wallet, oralcePythAddress, {
    //     config_feed_info: {
    //         asset: "usei",
    //         price_feed_id: "5bc91f13e412c07599167bae86f07543f076a638962b8d6017ec19dab4a82814",
    //         price_feed_symbol: "Crypto.ETH/USD",
    //         price_feed_decimal: 8,
    //         price_feed_age: 720000000,
    //         check_feed_age: true,
    //     }
    // }, "", parseCoins(""));
    // // console.log("configure swap extension add a swap pair... ")
    // await executeContract(RPC_ENDPOINT, wallet, swapExtentAddress,
    // {
    //     update_pair_config: {
    //     asset_infos: [
    //         {
    //         native_token:
    //             { denom: "usei"}
    //         },
    //         {
    //         native_token:
    //         {denom: stable_coin_denom}
    //         }],
    //     pair_address: mockSwapPairAddress}
    // }, "", parseCoins(""))
    // console.log("configure swap extension add a swap pair succeed ")
    // ///configure cdp contract begin
    // console.log("Updating control's config...")
    // await executeContract(RPC_ENDPOINT, wallet, controlAddress, {
    //     update_config: {
    //         oracle_contract: oralcePythAddress,
    //         pool_contract: poolAddress,
    //         liquidation_contract: liquidateAddress,
    //         stable_denom: stable_coin_denom,
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating control's config end")


    // console.log("Updating custody bSei's config...")
    // await executeContract(RPC_ENDPOINT, wallet, custodyCdpBseiAddress, {
    //     update_config: {
    //         control_contract: controlAddress,
    //         pool_contract: poolAddress,
    //         collateral_contract: bSeiTokenAddress,
    //         liquidation_contract: liquidateAddress,
    //         staking_reward_contract: rewardBookBseiAddress,
    //     }
    // }, "", parseCoins(""))
    // console.log("Updating custody bSei's config end")

    // console.log("Updating custody stSEI's config...")
    // await executeContract(RPC_ENDPOINT, wallet, custodyCdpStSeiAddress, {
    //     update_config: {
    //         control_contract: controlAddress,
    //         pool_contract: poolAddress,
    //         collateral_contract: stSeiTokenAddress,
    //         liquidation_contract: liquidateAddress,
    //         staking_reward_contract: rewardBookStseiAddress,
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
    // await migrateContract(RPC_ENDPOINT, wallet, custodyCdpBseiAddress, custodyCodeId, {}, "");
    // await migrateContract(RPC_ENDPOINT, wallet, custodyCdpStSeiAddress, custodyCodeId, {}, "");

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
    //             contract: custodyCdpBseiAddress,
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
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, { balance : { address: custodyCdpBseiAddress}});


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
    //         contract: custodyCdpStSeiAddress,
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
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance : { address: custodyCdpStSeiAddress}});

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
    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance :  {address: custodyCdpStSeiAddress}})

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
    //         contract: custodyCdpBseiAddress,
    //         amount: "100000",
    //         msg: Buffer.from(JSON.stringify({
    //             deposit_collateral: {}
    //         })).toString('base64')
    //     }
    // }, "", parseCoins(""));

    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, { balance: { address: custodyCdpBseiAddress } })
    // await queryWasmContract(RPC_ENDPOINT, wallet, custodyCdpBseiAddress, { state: {} })
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    ///case 7. deposite collateral bAtom
    // console.log("case 7. deposite collateral stSEI...")
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } })

    // await executeContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, {
    //     send: {
    //         contract: custodyCdpStSeiAddress,
    //         amount: "10000",
    //         msg: Buffer.from(JSON.stringify({
    //             deposit_collateral: {}
    //         })).toString('base64')
    //     }
    // }, "", parseCoins(""));

    // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, { balance: { address: custodyCdpStSeiAddress } })
    // await queryWasmContract(RPC_ENDPOINT, wallet, custodyCdpStSeiAddress, { state: {} })
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


    /// modify price 
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
    // console.log("query bSEI collateral info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {collateral_elem: { collateral: bSeiTokenAddress } });
    // console.log("query stSEI collateral info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {collateral_elem: { collateral: stSeiTokenAddress } });

    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_price: { asset: bSeiTokenAddress } });
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, { query_price: { asset: stSeiTokenAddress } });

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { loan_info: { minter: account.address } });

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { minter_collateral: { minter: account.address } });


    //await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, { redemption_provider_list: { minter: "sei1grq2267xm4qzdzu43yt75p006m9axp9sf2nzshc8utlqru2lktkskkjn6c"}});

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {collateral_available:{minter: account.address, collateral_contract: bSeiTokenAddress}} );

    // await queryWasmContract(RPC_ENDPOINT, wallet, controlAddress, {config:{}});

    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);

    //sendCoin(RPC_ENDPOINT, wallet, "sei135mlnw9ndkyglgx7ma95pw22cl64mpnw58pfpd", "", coin(9900000000, stable_coin_denom));

    // await sendCoin(RPC_ENDPOINT, wallet, "sei1vfxlpud2txs7en5z7qgf4qk93e64p7r3qlqjpn", "", coin(10000000, stable_coin_denom));

    // console.log(`query bSeiToken balance account1: ${account.address}`)
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {balance:{address: account.address}});

    // console.log(`query bSeiToken balance account2: ${account2.address}`)
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {balance:{address: account2.address}});

    // console.log(`query kUSD balance account1: ${account.address}`)
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);

    // console.log(`query kUSD balance account2: ${account2.address}`)
    // await queryAddressBalance(LCD_ENDPOINT, account2.address, stable_coin_denom);

    // let dispacherCodeId = await storeCode(RPC_ENDPOINT, wallet, "../../krp-staking-contracts/artifacts/basset_sei_rewards_dispatcher.wasm");
    // await migrateContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress, dispacherCodeId, {}, "");




    //注意配置oralce和swap 这里需要将sei换成kUSD，需要配置两种资产sei和kUSD分别的feedId
    // console.log("hub contract update global index...");
    // let ret = await executeContract(RPC_ENDPOINT, wallet, hubAddress, {update_global_index:{}}, "", parseCoins(""));
    // console.log("update global ret:", JSON.stringify(ret));

    // console.log("query pyth feeder config:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, {query_pyth_feeder_config:{asset: "usei"}});

    // console.log("query exchange rate:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, oralcePythAddress, {query_exchange_rate_by_asset_label:{base_label: "usei", quote_label: stable_coin_denom}});



    // console.log("query simulation:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, swapExtentAddress, {
    //     query_simulation: {
    //         asset_infos: [
    //             {
    //                 native_token:
    //                     { denom: "usei" }
    //             },
    //             {
    //                 native_token:
    //                     { denom: stable_coin_denom }
    //             }],
    //         offer_asset: {
    //             info: {
    //                 native_token : {
    //                     denom: "usei",
    //                 }                    
    //             },
    //             amount: "1000000",
    //         }
    //     }
    // });

    // console.log("query reward dispatcher balance:")
    // await queryAddressBalance(LCD_ENDPOINT, rewardDispatcherAddress, "usei");

    // console.log("query simulation ret:")
    // let ret = await queryWasmContract(RPC_ENDPOINT, wallet, mockSwapPairAddress, {
    //     simulation: {
    //         offer_asset: {
    //             info: {
    //                 native_token: {
    //                     denom: "usei",
    //                 }
    //             },
    //             amount: "1000000",
    //         }
    //     }
    // });



    // console.log("update dispatcher reward configure:");
    // await executeContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress,
    //     {
    //         update_config:
    //         {
    //             bsei_reward_denom: stable_coin_denom,
    //         }
    //     }, "", parseCoins(""));

    // await executeContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress,
    //     {
    //         update_swap_contract: {
    //             swap_contract: swapExtentAddress,
    //         }
    //     }, "", parseCoins(""));


    // await executeContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress,
    //     {
    //         update_oracle_contract: {
    //             oracle_contract: oralcePythAddress,
    //         }
    //     }, "", parseCoins(""));

    // console.log("Dispatcher contract config:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress, { config: {} });

    // console.log("Dispatcher contract config:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress, { config: {} });
    // console.log("query pair info:")
    // await queryWasmContract(RPC_ENDPOINT, wallet, swapExtentAddress, {
    //     query_pair_config:
    //     {
    //         asset_infos: [
    //         {
    //         native_token:
    //             { denom: "usei"}
    //         },
    //         {
    //         native_token:
    //         {denom: stable_coin_denom}
    //         }],
    //     }})

    /// send some sei and kUSD to pair address
    // await sendCoin(RPC_ENDPOINT, wallet, mockSwapPairAddress, "", coin(1000000000, stable_coin_denom));
    // await sendCoin(RPC_ENDPOINT, wallet, mockSwapPairAddress, "", coin(100000000, "usei"));
    // await queryAddressBalance(LCD_ENDPOINT, mockSwapPairAddress, "usei");
    // await queryAddressBalance(LCD_ENDPOINT, mockSwapPairAddress, stable_coin_denom);


    // await executeContract(RPC_ENDPOINT, wallet, hubAddress, { bond: {} }, "bond native to bsei", coins(100000000, "usei"));


    // console.log("query accruded rewards:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, rewardAddress, {accrued_rewards:{address: custodyCdpBseiAddress}})

    // console.log("query balance bSei token:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, bSeiTokenAddress, {balance:{address: account.address}})

    // // await queryWasmContract(RPC_ENDPOINT, wallet, stSeiTokenAddress, {balance:{address: account.address}})
    

    // console.log("query dispatch configure:");
    // await queryWasmContract(RPC_ENDPOINT, wallet, rewardDispatcherAddress, {config:{}});

    // // console.log("query reward configure:");
    // // await queryWasmContract(RPC_ENDPOINT, wallet, rewardAddress, {config:{}});


    // console.log("query balance kUSD:");
    // await queryAddressBalance(LCD_ENDPOINT, account.address, stable_coin_denom);

    // let receiveAddr = "sei1vzekeq7mfnxcvlcf9d5gpxhlp2kdzzwg676t4z";
    // await sendCoin(RPC_ENDPOINT, wallet, keeperAddress, "", coin("5000000", stable_coin_denom));
    // console.log(`query ${keeperAddress} balance kUSD:`);
    // await queryAddressBalance(LCD_ENDPOINT, keeperAddress, stable_coin_denom);

    await executeContract(RPC_ENDPOINT, wallet, keeperAddress, {update_config: {rewards_denom: stable_coin_denom}}, "", parseCoins(""));

    let ret = await executeContract(RPC_ENDPOINT, wallet, keeperAddress, {distribute:{}}, "", parseCoins(""));
    console.log(JSON.stringify(ret));



 
}

main().catch(console.log);
