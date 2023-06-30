// Copyright 2023 Kryptonite Labs.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_bignumber::{Decimal256, Uint256};
use cosmwasm_std::{
    to_binary,
    Addr,
    AllBalanceResponse,
    BalanceResponse,
    BankQuery,
    Coin,
    Deps,
    QueryRequest,
    StdResult,
    Uint128,
    WasmQuery, //QuerierWrapper,
};
use cw20::{BalanceResponse as Cw20BalanceResponse, Cw20QueryMsg, TokenInfoResponse};

use crate::central_control::{LoanInfoResponse, WhitelistElemResponse, WhitelistResponse};

use crate::liquidation_queue::LiquidationAmountResponse;
use crate::oracle_pyth::{PriceResponse, QueryMsg as oraclePythQueryMsg};
use crate::rewards::AccruedRewardsResponse;
use crate::stable_pool::ConfigResponse;
use crate::tokens::TokensHuman;
use crate::custody::ConfigResponse as CustodyConfigResponse;

use crate::central_control::QueryMsg as ControlQueryMsg;
use crate::liquidation_queue::QueryMsg as LiquidationQueryMsg;
use crate::rewards::QueryMsg as RewardsQueryMsg;
use crate::stable_pool::QueryMsg as PoolQueryMsg;
use crate::custody::QueryMsg as CustodyQueryMsg;

pub fn query_all_balances(deps: Deps, account_addr: Addr) -> StdResult<Vec<Coin>> {
    // load price form the oracle
    let all_balances: AllBalanceResponse =
        deps.querier
            .query(&QueryRequest::Bank(BankQuery::AllBalances {
                address: account_addr.to_string(),
            }))?;
    Ok(all_balances.amount)
}

pub fn query_balance(deps: Deps, account_addr: Addr, denom: String) -> StdResult<Uint256> {
    // load price form the oracle
    let balance: BalanceResponse = deps.querier.query(&QueryRequest::Bank(BankQuery::Balance {
        address: account_addr.to_string(),
        denom,
    }))?;
    Ok(balance.amount.amount.into())
}

//modify response type to Cw20BalanceResponse，query balance correct，otherwise always is 0
pub fn query_token_balance(
    deps: Deps,
    contract_addr: Addr,
    account_addr: Addr,
) -> StdResult<Uint256> {
    // load balance form the token contract
    let balance: Cw20BalanceResponse = deps
        .querier
        .query_wasm_smart(
            contract_addr.to_string(),
            &Cw20QueryMsg::Balance {
                address: account_addr.to_string(),
            },
        )
        .unwrap_or_else(|_| Cw20BalanceResponse {
            balance: Uint128::zero(),
        });
    Ok(Uint256::from(balance.balance))
}

pub fn query_supply(deps: Deps, contract_addr: Addr) -> StdResult<Uint256> {
    // load price form the oracle
    let token_info: TokenInfoResponse =
        deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
            contract_addr: contract_addr.to_string(),
            msg: to_binary(&Cw20QueryMsg::TokenInfo {})?,
        }))?;

    Ok(Uint256::from(token_info.total_supply))
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct TimeConstraints {
    pub block_time: u64,
    pub valid_timeframe: u64,
}

pub fn query_price(
    deps: Deps,
    oracle_addr: Addr,
    base: String,
    _quote: String,
    _time_constraints: Option<TimeConstraints>,
) -> StdResult<PriceResponse> {
    // The time check has been set here
    let pyth_oracle_price: PriceResponse =
        deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
            contract_addr: oracle_addr.to_string(),
            msg: to_binary(&oraclePythQueryMsg::QueryPrice { asset: base })?,
        }))?;

    Ok(pyth_oracle_price)
}

pub fn query_stable_pool_config(deps: Deps, pool_contract: String) -> StdResult<ConfigResponse> {
    let stable_config = deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
        contract_addr: pool_contract,
        msg: to_binary(&PoolQueryMsg::Config {})?,
    }))?;

    Ok(stable_config)
}

pub fn query_control_loan_info(
    deps: Deps,
    control_contract: String,
    minter: String,
) -> StdResult<LoanInfoResponse> {
    let loan_info = deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
        contract_addr: control_contract,
        msg: to_binary(&ControlQueryMsg::LoanInfo { minter })?,
    }))?;

    Ok(loan_info)
}

pub fn query_collateral_elem(
    deps: Deps,
    control_contract: String,
    collatera_contract: String,
) -> StdResult<WhitelistElemResponse> {
    let collateral_elem = deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
        contract_addr: control_contract,
        msg: to_binary(&ControlQueryMsg::CollateralElem {
            collateral: collatera_contract,
        })?,
    }))?;

    Ok(collateral_elem)
}

pub fn query_collateral_whitelist_info(
    deps: Deps,
    control_contract: String,
    collateral_contract: String,
) -> StdResult<WhitelistElemResponse> {
    let whitelist_res: WhitelistResponse =
        deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
            contract_addr: control_contract,
            msg: to_binary(&ControlQueryMsg::Whitelist {
                collateral_contract: Some(collateral_contract),
                start_after: None,
                limit: None,
            })?,
        }))?;

    Ok(whitelist_res.elems[0].clone())
}

#[allow(clippy::ptr_arg)]
pub fn query_liquidation_amount(
    deps: Deps,
    liquidation_contract: Addr,
    borrow_amount: Uint256,
    borrow_limit: Uint256,
    collaterals: &TokensHuman,
    collateral_prices: Vec<Decimal256>,
) -> StdResult<LiquidationAmountResponse> {
    let liquidation_amount_res: LiquidationAmountResponse =
        deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
            contract_addr: liquidation_contract.to_string(),
            msg: to_binary(&LiquidationQueryMsg::LiquidationAmount {
                borrow_amount,
                borrow_limit,
                collaterals: collaterals.clone(),
                collateral_prices,
            })?,
        }))?;

    Ok(liquidation_amount_res)
}

pub fn query_collaterals_accrued_rewards(
    deps: Deps,
    reward_contract: String,
    holder: String,
) -> StdResult<AccruedRewardsResponse> {
    let accrued_rewards = deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
        contract_addr: reward_contract,
        msg: to_binary(&RewardsQueryMsg::AccruedRewards {
            address: holder,
        })?,
    }))?;

    Ok(accrued_rewards)
}


pub fn query_custody_configure_info(
    deps: Deps,
    custody_contract: String,
) -> StdResult<CustodyConfigResponse> {
    let custody_config_info = deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
        contract_addr: custody_contract,
        msg: to_binary(&CustodyQueryMsg::Config {})?
    }))?;

    Ok(custody_config_info)

}