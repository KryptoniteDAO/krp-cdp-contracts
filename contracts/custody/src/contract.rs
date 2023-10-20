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
use cosmwasm_bignumber::Uint256;
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    attr, from_binary, to_binary, Addr, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo,
    Response, StdResult, Uint128, WasmMsg,
};
use cw20::{Cw20ExecuteMsg, Cw20ReceiveMsg};

#[cfg(not(feature = "library"))]
use std::vec;

use crate::error::ContractError;
use crate::state::{read_config, read_state, store_config, store_state, Config, State};
use cdp::central_control::ExecuteMsg as ControlExecuteMsg;
use cdp::custody::{
    ConfigResponse, Cw20HookMsg, ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg, StateResponse,
};
use cdp::liquidation_queue::Cw20HookMsg as LiquidationCw20HookMsg;
use cdp::rewards::ExecuteMsg as RewardsExecuteMsg;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let config = Config {
        owner_addr: deps.api.addr_canonicalize(msg.owner_addr.as_str())?,
        control_contract: deps.api.addr_canonicalize(msg.control_contract.as_str())?,
        pool_contract: deps.api.addr_canonicalize(msg.pool_contract.as_str())?,
        collateral_contract: deps.api.addr_canonicalize(&msg.collateral_contract)?,
        liquidation_contract: deps.api.addr_canonicalize(&msg.liquidation_contract)?,
        reward_book_contract: deps.api.addr_canonicalize(&msg.reward_book_contract)?,
    };
    store_config(deps.storage, &config)?;

    store_state(
        deps.storage,
        &State {
            total_amount: Uint256::zero(),
        },
    )?;

    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Receive(msg) => receive_cw20(deps, info, msg),
        ExecuteMsg::UpdateConfig {
            owner_addr,
            control_contract,
            pool_contract,
            collateral_contract,
            liquidation_contract,
            reward_book_contract,
        } => update_config(
            deps,
            info,
            owner_addr,
            control_contract,
            pool_contract,
            collateral_contract,
            liquidation_contract,
            reward_book_contract,
        ),
        ExecuteMsg::RedeemStableCoin {
            redeemer,
            redeem_amount,
        } => {
            let api = deps.api;
            redeem_stable_coin(
                deps,
                info,
                api.addr_validate(redeemer.as_str())?,
                redeem_amount,
            )
        }
        ExecuteMsg::WithdrawCollateral {
            minter,
            collateral_contract,
            collateral_amount,
        } => withdraw_collateral(deps, info, minter, collateral_contract, collateral_amount),

        ExecuteMsg::LiquidateCollateral { liquidator, amount } => {
            let api = deps.api;
            liquidate_collateral(deps, info, api.addr_validate(liquidator.as_str())?, amount)
        }

        ExecuteMsg::ClaimRewards { reward_contract } => {
            let api = deps.api;
            claim_rewards(deps, info, api.addr_validate(&reward_contract)?)
        }
    }
}

/// CW20 token receive handler.
pub fn receive_cw20(
    deps: DepsMut,
    info: MessageInfo,
    cw20_msg: Cw20ReceiveMsg,
) -> Result<Response, ContractError> {
    match from_binary(&cw20_msg.msg)? {
        Cw20HookMsg::MintStableCoin {
            stable_amount,
            is_redemption_provider,
        } => mint_stable_coin(
            deps,
            info,
            cw20_msg.sender,
            cw20_msg.amount,
            stable_amount,
            is_redemption_provider,
        ),

        Cw20HookMsg::DepositCollateral {} => {
            deposit_collateral(deps, info, cw20_msg.sender, cw20_msg.amount)
        }
    }
}

pub fn update_config(
    deps: DepsMut,
    info: MessageInfo,
    owner_addr: Option<String>,
    control_contract: Option<String>,
    pool_contract: Option<String>,
    collateral_contract: Option<String>,
    liquidation_contract: Option<String>,
    reward_book_contract: Option<String>,
) -> Result<Response, ContractError> {
    let mut config = read_config(deps.as_ref().storage)?;
    let sender_raw = deps.api.addr_canonicalize(info.sender.as_str())?;

    if sender_raw != config.owner_addr {
        return Err(ContractError::Unauthorized(
            "update_config".to_string(),
            info.sender.to_string(),
        ));
    }

    if let Some(owner_addr) = owner_addr {
        config.owner_addr = deps.api.addr_canonicalize(&owner_addr)?;
    }

    if let Some(control_contract) = control_contract {
        config.control_contract = deps.api.addr_canonicalize(&control_contract)?;
    }

    if let Some(pool_contract) = pool_contract {
        config.pool_contract = deps.api.addr_canonicalize(&pool_contract)?;
    }

    if let Some(collateral_contract) = collateral_contract {
        config.collateral_contract = deps.api.addr_canonicalize(&collateral_contract)?;
    }

    if let Some(liquidation_contract) = liquidation_contract {
        config.liquidation_contract = deps.api.addr_canonicalize(&liquidation_contract)?;
    }

    if let Some(reward_book_contract) = reward_book_contract {
        config.reward_book_contract = deps.api.addr_canonicalize(&reward_book_contract)?;
    }

    store_config(deps.storage, &config)?;
    Ok(Response::default())
}

pub fn deposit_collateral(
    deps: DepsMut,
    info: MessageInfo,
    minter: String,
    collateral_amount: Uint128,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;
    let api = deps.api;
    if api.addr_canonicalize(&info.sender.as_str())? != config.collateral_contract {
        return Err(ContractError::CollateralTypeError {});
    }

    let mut state = read_state(deps.storage)?;
    state.total_amount = state.total_amount + Uint256::from(collateral_amount);

    store_state(deps.storage, &state)?;
    let collateral_contract = api.addr_humanize(&config.collateral_contract)?.to_string();

    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: api.addr_humanize(&config.control_contract)?.to_string(),
            msg: to_binary(&ControlExecuteMsg::DepositCollateral {
                minter: minter.clone(),
                collateral_contract: collateral_contract.clone(),
                collateral_amount,
            })?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "deposit_collateral"),
            attr("minter", minter.clone()),
            attr("collateral_contract", collateral_contract.clone()),
            attr("collateral_amount", collateral_amount.to_string()),
        ]))
}

pub fn withdraw_collateral(
    deps: DepsMut,
    info: MessageInfo,
    minter: String,
    collateral_contract: String,
    collateral_amount: Uint128,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;
    let api = deps.api;
    let sender_raw = api.addr_canonicalize(info.sender.as_str())?;

    if sender_raw != config.control_contract {
        return Err(ContractError::Unauthorized(
            "withdraw_collateral".to_string(),
            info.sender.to_string(),
        ));
    }

    if deps
        .api
        .addr_canonicalize(&collateral_contract.clone().as_str())?
        != config.collateral_contract
    {
        return Err(ContractError::CollateralTypeError {});
    }

    let mut state = read_state(deps.storage)?;
    state.total_amount = state.total_amount - Uint256::from(collateral_amount);
    store_state(deps.storage, &state)?;

    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: collateral_contract.clone(),
            msg: to_binary(&Cw20ExecuteMsg::Transfer {
                recipient: minter.clone(),
                amount: collateral_amount,
            })?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "withdraw_collateral"),
            attr("contract_name", "custody"),
            attr("minter", minter.clone()),
            attr("collateral_contract", collateral_contract.clone()),
            attr("collateral_amount", collateral_amount.to_string()),
        ]))
}

pub fn mint_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    sender: String,
    amount: Uint128,
    stable_amount: Uint128,
    is_redemption_provider: Option<bool>,
) -> Result<Response, ContractError> {
    let config = read_config(deps.as_ref().storage)?;
    let api = deps.api;
    let control_contract = api.addr_humanize(&config.control_contract)?.to_string();

    if info.sender.to_string()
        != deps
            .api
            .addr_humanize(&config.collateral_contract)?
            .to_string()
    {
        return Err(ContractError::CollateralTypeError {});
    }

    let mut state = read_state(deps.as_ref().storage)?;
    state.total_amount = state.total_amount + Uint256::from(amount);
    store_state(deps.storage, &state)?;
    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: control_contract.clone(),
            msg: to_binary(&ControlExecuteMsg::MintStableCoin {
                minter: sender.clone(),
                stable_amount,
                collateral_amount: Some(amount),
                collateral_contract: Some(
                    deps.api
                        .addr_humanize(&config.collateral_contract)?
                        .to_string(),
                ),
                is_redemption_provider,
            })?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "mint_stable_coin"),
            attr("control_contract", control_contract),
            attr("sender", sender.clone()),
            attr("amount", amount.to_string()),
            attr("stable_amount", stable_amount.to_string()),
        ]))
}

pub fn redeem_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    redeemer: Addr,
    redeem_amount: Uint128,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;
    let api = deps.api;

    if config.control_contract != api.addr_canonicalize(info.sender.as_str())? {
        return Err(ContractError::Unauthorized(
            "redeem_stable_coin".to_string(),
            info.sender.to_string(),
        ));
    }

    let mut state = read_state(deps.storage)?;
    state.total_amount = state.total_amount - Uint256::from(redeem_amount);
    store_state(deps.storage, &state)?;

    let send_msg = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: api.addr_humanize(&config.collateral_contract)?.to_string(),
        msg: to_binary(&Cw20ExecuteMsg::Transfer {
            recipient: redeemer.to_string(),
            amount: redeem_amount,
        })?,
        funds: vec![],
    });

    Ok(Response::new().add_message(send_msg).add_attributes(vec![
        attr("contract_module", "custody"),
        attr("action", "redeem_stable_coin"),
        attr("redeemer", redeemer),
        attr("amount", redeem_amount),
    ]))
}

pub fn claim_rewards(
    deps: DepsMut,
    info: MessageInfo,
    reward_contract: Addr,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;

    if config.reward_book_contract
        != deps
            .api
            .addr_canonicalize(&info.sender.clone().to_string())?
    {
        return Err(ContractError::Unauthorized(
            "claim rewards".to_string(),
            info.sender.clone().to_string(),
        ));
    }

    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: reward_contract.to_string(),
            msg: to_binary(&RewardsExecuteMsg::ClaimRewards {
                recipient: Some(info.sender.clone().to_string()),
            })?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "claim_rewards"),
            attr("recipient", info.sender.clone().to_string()),
        ]))
}

pub fn liquidate_collateral(
    deps: DepsMut,
    _info: MessageInfo,
    liquidator: Addr,
    amount: Uint128,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;

    let mut state = read_state(deps.storage)?;
    state.total_amount = state.total_amount - Uint256::from(amount);
    store_state(deps.storage, &state)?;

    Ok(
        Response::new().add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: deps
                .api
                .addr_humanize(&config.collateral_contract)?
                .to_string(),
            funds: vec![],
            msg: to_binary(&Cw20ExecuteMsg::Send {
                contract: deps
                    .api
                    .addr_humanize(&config.liquidation_contract)?
                    .to_string(),
                amount: amount.into(),
                msg: to_binary(&LiquidationCw20HookMsg::ExecuteBid {
                    liquidator: liquidator.to_string(),
                    fee_address: Some(
                        deps.api
                            .addr_humanize(&config.control_contract)?
                            .to_string(),
                    ),
                    repay_address: Some(deps.api.addr_humanize(&config.pool_contract)?.to_string()),
                })?,
            })?,
        })),
    )
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
        QueryMsg::State {} => to_binary(&query_state(deps)?),
    }
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let config = read_config(deps.storage)?;
    let api = deps.api;

    Ok(ConfigResponse {
        owner_addr: api.addr_humanize(&config.owner_addr)?.to_string(),
        control_contract: api.addr_humanize(&config.control_contract)?.to_string(),
        pool_contract: api.addr_humanize(&config.pool_contract)?.to_string(),
        collateral_contract: api.addr_humanize(&config.collateral_contract)?.to_string(),
        liquidation_contract: api.addr_humanize(&config.liquidation_contract)?.to_string(),
        reward_book_contract: api.addr_humanize(&config.reward_book_contract)?.to_string(),
    })
}

fn query_state(deps: Deps) -> StdResult<StateResponse> {
    let state = read_state(deps.storage)?;

    Ok(StateResponse {
        total_amount: state.total_amount,
    })
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
