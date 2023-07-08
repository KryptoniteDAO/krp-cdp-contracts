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
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;

use crate::error::ContractError;
use crate::math::decimal_summation_in_256;
use crate::state::{read_config, read_state, store_config, store_state, Config, State};
use crate::user::{
    execute_claim_rewards, execute_decrease_balance, execute_increase_balance,
    query_accrued_rewards, query_holder, query_holders,
};
use cdp::querier::query_collaterals_accrued_rewards;
use cosmwasm_bignumber::Uint256;
use cosmwasm_std::{
    attr, to_binary, Addr, Binary, CosmosMsg, Decimal, Deps, DepsMut, Env, MessageInfo, Reply,
    Response, StdResult, SubMsg, Uint128, WasmMsg,
};

use cdp::handle::optional_addr_validate;
use cdp::reward_book::{
    ConfigResponse, ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg, StateResponse,
};
use cdp::custody::ExecuteMsg as CustodyExecuteMsg;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let conf = Config {
        owner: deps.api.addr_canonicalize(&info.sender.to_string())?,
        control_contract: deps.api.addr_canonicalize(&msg.control_contract)?,
        reward_contract: deps.api.addr_canonicalize(&msg.reward_contract)?,
        custody_contract: deps.api.addr_canonicalize(&msg.custody_contract)?,
        reward_denom: msg.reward_denom,
        threshold: msg.threshold,
    };

    store_config(deps.storage, &conf)?;
    store_state(
        deps.storage,
        &State {
            global_index: Decimal::zero(),
            total_balance: Uint128::zero(),
            prev_reward_balance: Uint128::zero(),
        },
    )?;

    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::UpdateConfig {
            owner_addr,
            control_contract,
            reward_contract,
            custody_contract,
            reward_denom,
            threshold,
        } => {
            let api = deps.api;
            update_config(
                deps,
                info,
                optional_addr_validate(api, owner_addr)?,
                optional_addr_validate(api, control_contract)?,
                optional_addr_validate(api, custody_contract)?,
                optional_addr_validate(api, reward_contract)?,
                reward_denom,
                threshold,
            )
        }
        ExecuteMsg::ClaimRewards { recipient } => execute_claim_rewards(deps, env, info, recipient),
        ExecuteMsg::UpdateGlobalIndex {} => update_global_index(deps, env, info),
        ExecuteMsg::IncreaseBalance { address, amount } => {
            execute_increase_balance(deps, env, info, address, amount)
        }
        ExecuteMsg::DecreaseBalance { address, amount } => {
            execute_decrease_balance(deps, env, info, address, amount)
        }
        ExecuteMsg::ExecuteUpdateGlobalIndex {} => execute_update_global_index(deps, env),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
        QueryMsg::State {} => to_binary(&query_state(deps)?),
        QueryMsg::AccruedRewards { address } => to_binary(&query_accrued_rewards(deps, address)?),
        QueryMsg::Holder { address } => to_binary(&query_holder(deps, address)?),
        QueryMsg::Holders { start_after, limit } => {
            to_binary(&query_holders(deps, start_after, limit)?)
        }
    }
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let config: Config = read_config(deps.storage)?;
    Ok(ConfigResponse {
        control_contract: deps
            .api
            .addr_humanize(&config.control_contract)?
            .to_string(),
        reward_contract: deps.api.addr_humanize(&config.reward_contract)?.to_string(),
        custody_contract: deps
            .api
            .addr_humanize(&config.custody_contract)?
            .to_string(),
        reward_denom: config.reward_denom,
        owner: deps.api.addr_humanize(&config.owner)?.to_string(),
    })
}

fn query_state(deps: Deps) -> StdResult<StateResponse> {
    let state: State = read_state(deps.storage)?;
    Ok(StateResponse {
        global_index: state.global_index,
        total_balance: state.total_balance,
        prev_reward_balance: state.prev_reward_balance,
    })
}

fn update_config(
    deps: DepsMut,
    info: MessageInfo,
    owner_addr: Option<Addr>,
    control_contract: Option<Addr>,
    custody_contract: Option<Addr>,
    reward_contract: Option<Addr>,
    reward_denom: Option<String>,
    threshold: Option<Uint256>,
) -> Result<Response, ContractError> {
    let mut config = read_config(deps.as_ref().storage)?;
    let sender_raw = deps.api.addr_canonicalize(info.sender.as_str())?;

    if sender_raw != config.owner {
        return Err(ContractError::Unauthorized(
            "update_config".to_string(),
            info.sender.to_string(),
        ));
    }

    if let Some(owner_addr) = owner_addr {
        config.owner = deps.api.addr_canonicalize(owner_addr.as_str())?;
    }

    if let Some(control_contract) = control_contract {
        config.control_contract = deps.api.addr_canonicalize(control_contract.as_str())?;
    }

    if let Some(custody_contract) = custody_contract {
        config.custody_contract = deps.api.addr_canonicalize(custody_contract.as_str())?;
    }

    if let Some(reward_contract) = reward_contract {
        config.reward_contract = deps.api.addr_canonicalize(reward_contract.as_str())?;
    }

    if let Some(reward_denom) = reward_denom {
        config.reward_denom = reward_denom;
    }

    if let Some(threshold) = threshold {
        config.threshold = threshold;
    }

    store_config(deps.storage, &config)?;

    Ok(Response::default())
}

pub const CLAIM_COLLATERAL_REWARD: u64 = 1u64;

/// Increase global_index according to claimed rewards amount
pub fn update_global_index(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
) -> Result<Response, ContractError> {
    let state: State = read_state(deps.storage)?;
    let config = read_config(deps.storage)?;
    // Zero staking balance check
    if state.total_balance.is_zero() {
        return Ok(Response::new());
    }

    let accrue_reward = query_collaterals_accrued_rewards(
        deps.as_ref(),
        deps.api.addr_humanize(&config.reward_contract)?.to_string(),
        deps.api
            .addr_humanize(&config.custody_contract)?
            .to_string(),
    )?;

    if accrue_reward.rewards < config.threshold.into() {
        return Err(ContractError::ClaimAccruedRewardsLessThanThreshold(
            Uint256::from(accrue_reward.rewards),
        ));
    }

    Ok(Response::new()
        .add_submessage(SubMsg::reply_on_success(
            CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: deps.api.addr_humanize(&config.custody_contract)?.to_string(),
                msg: to_binary(&CustodyExecuteMsg::ClaimRewards {
                    reward_contract: deps.api.addr_humanize(&config.reward_contract)?.to_string(),
                })?,
                funds: vec![],
            }),
            CLAIM_COLLATERAL_REWARD,
        ))
        .add_attributes(vec![attr("actoin", "update_global_index")]))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> Result<Response, ContractError> {
    match msg.id {
        CLAIM_COLLATERAL_REWARD => execute_update_global_index(deps, env),
        _ => Err(ContractError::InvalidReplyId {}),
    }
}

pub fn execute_update_global_index(deps: DepsMut, env: Env) -> Result<Response, ContractError> {
    let mut state: State = read_state(deps.as_ref().storage)?;

    let config = read_config(deps.as_ref().storage)?;

    // //Load the reward book contract balance
    let balance = deps.querier.query_balance(
        env.contract.address,
        config.reward_denom.as_str(),
    )?;

    let previous_balance = state.prev_reward_balance;

    //claimed_rewards = current_balance - prev_balance;
    let claimed_rewards = balance.amount.checked_sub(previous_balance)?;

    state.prev_reward_balance = balance.amount;

    // global_index += claimed_rewards / total_balance;
    state.global_index = decimal_summation_in_256(
        state.global_index,
        Decimal::from_ratio(claimed_rewards, state.total_balance),
    );
    store_state(deps.storage, &state)?;

    let attributes = vec![
        attr("action", "execute_update_global_index"),
        attr("claimed_rewards", claimed_rewards),
    ];
    let res = Response::new().add_attributes(attributes);

    Ok(res)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
