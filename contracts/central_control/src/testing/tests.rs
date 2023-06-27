
use crate::contract::mint_stable_coin;
use crate::state::{WhitelistElem, Config, store_whitelist_elem, read_minter_loan_info, store_config, store_collaterals};

use super::*;
use cdp::tokens::{Tokens, TokensMath};
use cosmwasm_bignumber::Uint256;
use cosmwasm_std::testing::{mock_dependencies, mock_env};
use cosmwasm_std::{coins, from_binary, Addr, CosmosMsg, Decimal, Uint128, WasmMsg, attr, Api, to_binary, CanonicalAddr};
use cdp::stable_pool::ExecuteMsg as PoolExecuteMsg;

#[test]
fn mint_stable_coin_positive() {
    let mut deps = mock_dependencies();
    let env = mock_env();
    let minter = Addr::unchecked("minter");
    let stable_amount = Uint128::new(100);
    let collateral_amount = Some(Uint128::new(100));
    let collateral_contract = Some(Addr::unchecked("collateral_contract").to_string());
    let is_redemption_provider = Some(true);
        // set up the whitelist element for the collateral
    let collateral_info = WhitelistElem {
        name: "Collateral".to_string(),
        symbol: "COLL".to_string(),
        max_ltv: Decimal::percent(50).into(),
        custody_contract: CanonicalAddr::from("0x14d3cc818735723ab86eaf9502376e847a64ddad"),
        collateral_contract: CanonicalAddr::from("collateral_contract"),
        
    };
    store_whitelist_elem(
        &mut deps.storage,
        &Addr::unchecked("collateral_contract"),
        &collateral_info,
    )
    .unwrap();
        // set up the config
    let config = Config {
        oracle_contract: Addr::unchecked("oracle_contract").to_string(),
        pool_contract: Addr::unchecked("pool_contract").to_string(),
        ..Default::default()
    };
    store_config(&mut deps.storage, &config).unwrap();
        // set up the minter's collaterals
    let mut cur_collaterals = Tokens::new();
    cur_collaterals.add(vec![(
        Addr::unchecked("collateral_contract").into(),
        Uint256::from(100),
    )]);
    store_collaterals(&mut deps.storage, &minter, &cur_collaterals).unwrap();
        // call the function
    let res = mint_stable_coin(
        deps.as_mut(),
        env.clone().into(),
        minter.to_string(),
        stable_amount,
        collateral_amount,
        collateral_contract,
        is_redemption_provider,
    )
    .unwrap();
        // check the response
    assert_eq!(res.messages.len(), 1);
    let msg = res.messages.get(0).expect("no message");
    assert_eq!(
        msg,
        &CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: Addr::unchecked("pool_contract").to_string(),
            msg: to_binary(&PoolExecuteMsg::MintStableCoin {
                minter: minter.to_string(),
                stable_amount,
            })
            .unwrap(),
            funds: vec![],
        })
    );
    assert_eq!(
        res.attributes,
        vec![
            attr("action", "mint_stable_coin"),
            attr("minter", minter.to_string()),
            attr("stable_amount", stable_amount.to_string()),
        ]
    );
        // check the updated minter's loan info
    let minter_raw = deps.api.addr_canonicalize(&minter.to_string()).unwrap();
    let minter_loans_info = read_minter_loan_info(&deps.storage, &minter_raw).unwrap();
    assert_eq!(minter_loans_info.loans, Uint256::from(stable_amount));
    assert_eq!(minter_loans_info.is_redemption_provider, true);
        // check the updated minter's collaterals
    let cur_collaterals = read_collaterals(&deps.storage, &minter_raw).unwrap();
    assert_eq!(
        cur_collaterals,
        Tokens::from(vec![(
            Addr::unchecked("collateral_contract").into(),
            Uint256::from(100)
        )])
    );
}

#[test]
fn mint_stable_coin_negative() {
    let mut deps = mock_dependencies(&[]);
    let env = mock_env();
    let minter = Addr::unchecked("minter");
    let stable_amount = Uint128::new(1000);
    let collateral_amount = Some(Uint128::new(100));
    let collateral_contract = Some(Addr::unchecked("collateral_contract").to_string());
    let is_redemption_provider = Some(true);
        // set up the whitelist element for the collateral
    let collateral_info = WhitelistElem {
        name: "Collateral".to_string(),
        symbol: "COLL".to_string(),
        max_ltv: Decimal::percent(50),
        ..Default::default()
    };
    store_whitelist_elem(
        &mut deps.storage,
        &Addr::unchecked("collateral_contract"),
        &collateral_info,
    )
    .unwrap();
        // set up the config
    let config = Config {
        oracle_contract: Addr::unchecked("oracle_contract").to_string(),
        pool_contract: Addr::unchecked("pool_contract").to_string(),
        ..Default::default()
    };
    store_config(&mut deps.storage, &config).unwrap();
        // set up the minter's collaterals
    let mut cur_collaterals = Tokens::new();
    cur_collaterals.add(vec![(
        Addr::unchecked("collateral_contract").into(),
        Uint256::from(100),
    )]);
    store_collaterals(&mut deps.storage, &minter, &cur_collaterals).unwrap();
        // call the function
    let res = mint_stable_coin(
        deps.as_mut(),
        env.clone().into(),
        minter.to_string(),
        stable_amount,
        collateral_amount,
        collateral_contract,
        is_redemption_provider,
    );
        // check the error message
    match res.unwrap_err() {
        ContractError::MintStableTooLarge(max_loan_to_value) => {
            assert_eq!(
                max_loan_to_value,
                Uint256::from(50) // max_loan_to_value = 100 * 0.5
            );
        }
        err => panic!("unexpected error: {:?}", err),
    }
}
