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

use crate::error::ContractError;
use crate::state::{
    read_collaterals, read_config, read_minter_loan_info, read_new_owner, read_redemeption_list,
    read_whitelist, read_whitelist_elem, store_collaterals, store_config, store_minter_loan_info,
    store_new_owner, store_whitelist_elem, Config, WhitelistElem,
};
use cdp::central_control::{
    CollateralAvailableRespone, ConfigResponse, ExecuteMsg, InstantiateMsg, LoanInfoResponse,
    MigrateMsg, MinterCollateralResponse, MinterLoanResponse, QueryMsg,
    RedemptionProviderListRespone, WhitelistElemResponse, WhitelistResponse,
};
use cdp::handle::optional_addr_validate;
use cdp::liquidation_queue::LiquidationAmountResponse;
use cdp::querier::{query_balance, query_liquidation_amount, query_price};
use cdp::reward_book::ExecuteMsg as RewardBookExecuteMsg;
use cdp::tokens::{Tokens, TokensMath, TokensToHuman, TokensToRaw};

use cosmwasm_std::{
    attr, entry_point, to_binary, Addr, Binary, CanonicalAddr, CosmosMsg, Deps, DepsMut, Env,
    MessageInfo, Response, StdResult, Uint128, WasmMsg,
};
use std::ops::Mul;
#[cfg(not(feature = "library"))]
use std::vec;

use cdp::custody::ExecuteMsg as CustodyExecuteMsg;
use cdp::stable_pool::ExecuteMsg as PoolExecuteMsg;
use cosmwasm_bignumber::{Decimal256, Uint256};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let api = deps.api;
    let config = Config {
        owner_addr: api.addr_canonicalize(&msg.owner_addr.as_str())?,
        oracle_contract: api.addr_canonicalize(&msg.oracle_contract.as_str())?,
        pool_contract: api.addr_canonicalize(&msg.pool_contract.as_str())?,
        liquidation_contract: api.addr_canonicalize(&msg.liquidation_contract.as_str())?,
        custody_contract: api.addr_canonicalize(&msg.custody_contract.as_str())?,
        epoch_period: msg.epoch_period,
        redeem_fee: msg.redeem_fee,
        stable_denom: msg.stable_denom,
    };

    if msg.redeem_fee >= Decimal256::one() {
        return Err(ContractError::RedeemFeeExceedsLimit {});
    }

    store_config(deps.storage, &config)?;

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
            oracle_contract,
            pool_contract,
            liquidation_contract,
            stable_denom,
            epoch_period,
            redeem_fee,
        } => {
            let api = deps.api;
            update_config(
                deps,
                info,
                optional_addr_validate(api, oracle_contract)?,
                optional_addr_validate(api, pool_contract)?,
                optional_addr_validate(api, liquidation_contract)?,
                stable_denom,
                epoch_period,
                redeem_fee,
            )
        }
        ExecuteMsg::SetOwner { new_owner_addr } => {
            let api = deps.api;
            set_new_owner(deps, info, api.addr_validate(&new_owner_addr)?)
        }
        ExecuteMsg::AcceptOwnership {} => accept_ownership(deps, info),
        ExecuteMsg::RepayStableCoin { sender, amount } => {
            repay_stable_coin(deps, info, sender, amount)
        }
        ExecuteMsg::RedeemStableCoin {
            redeemer,
            amount,
            minter,
        } => {
            let api = deps.api;
            redeem_stable_coin(
                deps,
                info,
                api.addr_validate(redeemer.as_str())?,
                amount,
                api.addr_validate(minter.as_str())?,
            )
        }
        ExecuteMsg::WithdrawCollateral {
            collateral_contract,
            collateral_amount,
        } => {
            let api = deps.api;
            withdraw_collateral(
                deps,
                info,
                api.addr_validate(collateral_contract.as_str())?,
                collateral_amount,
            )
        }
        ExecuteMsg::WhitelistCollateral {
            name,
            symbol,
            max_ltv,
            custody_contract,
            collateral_contract,
            reward_book_contract,
        } => {
            let api = deps.api;
            whitelist_collateral(
                deps,
                info,
                name,
                symbol,
                max_ltv,
                api.addr_canonicalize(custody_contract.as_str())?,
                api.addr_canonicalize(collateral_contract.as_str())?,
                api.addr_canonicalize(reward_book_contract.as_str())?,
            )
        }
        ExecuteMsg::MintStableCoin {
            minter,
            stable_amount,
            collateral_amount,
            collateral_contract,
            is_redemption_provider,
        } => mint_stable_coin(
            deps,
            info,
            minter,
            stable_amount,
            collateral_amount,
            collateral_contract,
            is_redemption_provider,
        ),
        ExecuteMsg::BecomeRedemptionProvider {
            is_redemption_provider,
        } => become_redemption_provider(deps, info, is_redemption_provider),
        ExecuteMsg::DepositCollateral {
            minter,
            collateral_contract,
            collateral_amount,
        } => {
            let api = deps.api;
            deposit_collateral(
                deps,
                info,
                api.addr_validate(minter.as_str())?,
                api.addr_validate(collateral_contract.as_str())?,
                collateral_amount,
            )
        }
        ExecuteMsg::LiquidateCollateral { minter } => {
            let api = deps.api;
            liquidate_collateral(deps, env, info, api.addr_validate(&minter)?)
        }
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
        QueryMsg::LoanInfo { minter } => to_binary(&query_loan_info(
            deps,
            deps.api.addr_validate(&minter.as_str())?,
        )?),
        QueryMsg::CollateralElem { collateral } => to_binary(&query_whitelist_elem(
            deps,
            deps.api.addr_validate(&collateral.as_str())?,
        )?),
        QueryMsg::Whitelist {
            collateral_contract,
            start_after,
            limit,
        } => to_binary(&query_whitelist(
            deps,
            optional_addr_validate(deps.api, collateral_contract)?,
            optional_addr_validate(deps.api, start_after)?,
            limit,
        )?),

        QueryMsg::MinterCollateral { minter } => to_binary(&query_minter_collateral(
            deps,
            deps.api.addr_validate(&minter.as_str())?,
        )?),

        QueryMsg::RedemptionProviderList {
            minter,
            start_after,
            limit,
        } => to_binary(&query_redemption_provider_list(
            deps,
            optional_addr_validate(deps.api, minter)?,
            optional_addr_validate(deps.api, start_after)?,
            limit,
        )?),

        QueryMsg::CollateralAvailable {
            minter,
            collateral_contract,
        } => to_binary(&query_collateral_available(
            deps,
            deps.api.addr_validate(minter.as_str())?,
            deps.api.addr_validate(collateral_contract.as_str())?,
        )?),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}

pub fn liquidate_collateral(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    minter: Addr,
) -> Result<Response, ContractError> {
    let config: Config = read_config(deps.storage)?;
    let minter_raw = deps.api.addr_canonicalize(minter.as_str())?;
    let mut cur_collaterals: Tokens = read_collaterals(deps.storage, &minter_raw);
    let minter_loan_info = read_minter_loan_info(deps.storage, &minter_raw)?;
    let max_loan_info = compute_mint_max_value(deps.as_ref(), &cur_collaterals)?;
    // borrow limit is equal or bigger than loan amount
    // cannot liquidation collaterals
    if max_loan_info >= minter_loan_info.loans {
        return Err(ContractError::CannotLiquidateSafeLoan {});
    }
    let pre_balance: Uint256 = query_balance(
        deps.as_ref(),
        deps.api.addr_humanize(&config.pool_contract)?,
        config.stable_denom.to_string(),
    )?;
    let collateral_prices = query_collateral_prices(
        deps.as_ref(),
        deps.api.addr_humanize(&config.oracle_contract)?.to_string(),
        &cur_collaterals,
    )?;
    let liquidation_amount_res: LiquidationAmountResponse = query_liquidation_amount(
        deps.as_ref(),
        deps.api.addr_humanize(&config.liquidation_contract)?,
        minter_loan_info.loans,
        max_loan_info,
        &cur_collaterals.to_human(deps.as_ref())?,
        collateral_prices,
    )?;
    let liquidation_amount = liquidation_amount_res.collaterals.to_raw(deps.as_ref())?;
    // Store left collaterals
    cur_collaterals.sub(liquidation_amount.clone())?;
    store_collaterals(deps.storage, &minter_raw, &cur_collaterals)?;

    let pool_contract = deps.api.addr_humanize(&config.pool_contract)?;
    let mut liquidation_messages: Vec<CosmosMsg> = vec![];
    for collateral in liquidation_amount {
        if collateral.1 > Uint256::zero() {
            let whitelist_elem = read_whitelist_elem(deps.storage, &collateral.0)?;
            liquidation_messages.push(CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: deps
                    .api
                    .addr_humanize(&whitelist_elem.custody_contract)?
                    .to_string(),
                funds: vec![],
                msg: to_binary(&CustodyExecuteMsg::LiquidateCollateral {
                    liquidator: info.sender.to_string(),
                    amount: collateral.1.into(),
                })?,
            }));
            liquidation_messages.push(CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: deps.api
                    .addr_humanize(&whitelist_elem.reward_book_contract)?
                    .to_string(),
                msg: to_binary(&RewardBookExecuteMsg::DecreaseBalance {
                    address: minter.to_string(),
                    amount: collateral.1.into(),
                })?,
                funds: vec![],
            }));
        }
    }

    Ok(Response::new()
        .add_messages(liquidation_messages)
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: pool_contract.to_string(),
            funds: vec![],
            msg: to_binary(&PoolExecuteMsg::RepayStableFromLiquidation {
                minter: minter.to_string(),
                pre_balance,
            })?,
        })))
}

pub fn query_collateral_available(
    deps: Deps,
    minter: Addr,
    collateral_contract: Addr,
) -> StdResult<CollateralAvailableRespone> {
    let config = read_config(deps.storage)?;
    let minter_raw = deps.api.addr_canonicalize(minter.as_str())?;
    let minter_loan_info = read_minter_loan_info(deps.storage, &minter_raw)?;

    let collateral_raw = deps.api.addr_canonicalize(collateral_contract.as_str())?;

    let collaterals = read_collaterals(deps.storage, &minter_raw);
    let mut max_loans_value = Uint256::zero();

    let mut collateral_price = Decimal256::zero();
    let mut collateral_max_ltv = Decimal256::zero();

    let mut collateral_amount = Uint256::zero();
    let multiply_ratio: Uint256 = Uint256::from(100_000_000u64);

    for collateral in collaterals {
        let collateral_info = read_whitelist_elem(deps.storage, &collateral.0)?;
        let price_resp = query_price(
            deps,
            deps.api.addr_humanize(&config.oracle_contract)?,
            deps.api.addr_humanize(&collateral.0)?.to_string(),
            "".to_string(),
            None,
        )?;
        if collateral.0 == collateral_raw {
            collateral_amount = collateral.1;
            collateral_price = price_resp.emv_price;
            collateral_max_ltv = collateral_info.max_ltv;
        } else {
            max_loans_value += collateral.1 * price_resp.emv_price * collateral_info.max_ltv;
        }
    }

    if max_loans_value >= minter_loan_info.loans {
        Ok(CollateralAvailableRespone {
            available_balance: collateral_amount.into(),
        })
    } else {
        let diff = minter_loan_info.loans - max_loans_value;
        let available_value = collateral_amount * collateral_price
            - Decimal256::from_ratio(diff * multiply_ratio, collateral_max_ltv * multiply_ratio)
                * Uint256::one();
        let available_amount = Decimal256::from_ratio(
            available_value * multiply_ratio,
            collateral_price * multiply_ratio,
        ) * Uint256::one();
        Ok(CollateralAvailableRespone {
            available_balance: available_amount.into(),
        })
    }
}

pub fn query_minter_collateral(deps: Deps, minter: Addr) -> StdResult<MinterCollateralResponse> {
    let minter_raw = deps.api.addr_canonicalize(minter.as_str())?;
    let minter_collateral = read_collaterals(deps.storage, &minter_raw);

    Ok(MinterCollateralResponse {
        collaterals: minter_collateral.to_human(deps)?,
    })
}

pub fn query_collateral_prices(
    deps: Deps,
    oracle_contract: String,
    collaterals: &Tokens,
) -> Result<Vec<Decimal256>, ContractError> {
    let mut collateral_prices: Vec<Decimal256> = vec![];
    for elem in collaterals {
        let price_resp = query_price(
            deps,
            deps.api.addr_validate(oracle_contract.as_str())?,
            deps.api.addr_humanize(&elem.0)?.to_string(),
            "".to_string(),
            None,
        )?;
        collateral_prices.push(price_resp.emv_price);
    }
    Ok(collateral_prices)
}

pub fn become_redemption_provider(
    deps: DepsMut,
    info: MessageInfo,
    is_redemption_provider: bool,
) -> Result<Response, ContractError> {
    let api = deps.api;
    let minter_raw = api.addr_canonicalize(&info.sender.as_str())?;
    let mut minter_loan_info = read_minter_loan_info(deps.storage, &minter_raw.clone())?;

    minter_loan_info.is_redemption_provider = is_redemption_provider;
    store_minter_loan_info(deps.storage, &minter_raw.clone(), &minter_loan_info)?;
    Ok(Response::new().add_attributes(vec![
        attr("action", "become_redemption_provider"),
        attr("minter", info.sender.to_string()),
        attr("is_redemption_provider", is_redemption_provider.to_string()),
    ]))
}

pub fn deposit_collateral(
    deps: DepsMut,
    info: MessageInfo,
    minter: Addr,
    collateral_contract: Addr,
    collateral_amount: Uint128,
) -> Result<Response, ContractError> {
    let api = deps.api;
    let collateral_contract_raw = api.addr_canonicalize(&collateral_contract.as_str())?;
    let collateral_elem = read_whitelist_elem(deps.storage, &collateral_contract_raw)?;

    if collateral_elem.custody_contract != api.addr_canonicalize(&info.sender.as_str())? {
        return Err(ContractError::CollateralTypeError {});
    }

    let minter_raw = api.addr_canonicalize(&minter.as_str())?;
    let mut minter_collaterals = read_collaterals(deps.storage, &minter_raw);
    let collateral = vec![(
        collateral_contract_raw.clone(),
        Uint256::from(collateral_amount),
    )];
    minter_collaterals.add(collateral);
    store_collaterals(deps.storage, &minter_raw, &minter_collaterals)?;

    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: deps
                .api
                .addr_humanize(&collateral_elem.reward_book_contract)?
                .to_string(),
            msg: to_binary(&RewardBookExecuteMsg::IncreaseBalance {
                address: minter.to_string(),
                amount: collateral_amount,
            })?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "deposit_collateral"),
            attr("contract_name", "control"),
            attr("minter", minter.to_string()),
            attr("collateral_contract", collateral_contract.to_string()),
            attr("collateral_amount", collateral_amount.to_string()),
        ]))
}

pub fn set_new_owner(
    deps: DepsMut,
    info: MessageInfo,
    new_owner_addr: Addr,
) -> Result<Response, ContractError> {
    let config = read_config(deps.as_ref().storage)?;
    let mut new_owner = read_new_owner(deps.as_ref().storage)?;
    let sender_raw = deps.api.addr_canonicalize(&info.sender.to_string())?;
    if sender_raw != config.owner_addr {
        return Err(ContractError::Unauthorized(
            "set_new_owner".to_string(),
            info.sender.to_string(),
        ));
    }
    new_owner.new_owner_addr = deps.api.addr_canonicalize(&new_owner_addr.to_string())?;
    store_new_owner(deps.storage, &new_owner)?;

    Ok(Response::default())
}

pub fn accept_ownership(deps: DepsMut, info: MessageInfo) -> Result<Response, ContractError> {
    let new_owner = read_new_owner(deps.as_ref().storage)?;
    let sender_raw = deps.api.addr_canonicalize(&info.sender.to_string())?;
    let mut config = read_config(deps.as_ref().storage)?;
    if sender_raw != new_owner.new_owner_addr {
        return Err(ContractError::Unauthorized(
            "accept_ownership".to_string(),
            info.sender.to_string(),
        ));
    }

    config.owner_addr = new_owner.new_owner_addr;
    store_config(deps.storage, &config)?;

    Ok(Response::default())
}

pub fn update_config(
    deps: DepsMut,
    info: MessageInfo,
    oracle_contract: Option<Addr>,
    pool_contract: Option<Addr>,
    liquidation_contract: Option<Addr>,
    stable_denom: Option<String>,
    epoch_period: Option<u64>,
    redeem_fee: Option<Decimal256>,
) -> Result<Response, ContractError> {
    let mut config = read_config(deps.as_ref().storage)?;
    let sender_raw = deps.api.addr_canonicalize(info.sender.as_str())?;

    if sender_raw != config.owner_addr {
        return Err(ContractError::Unauthorized(
            "update_config".to_string(),
            info.sender.to_string(),
        ));
    }

    if let Some(oracle_contact) = oracle_contract {
        config.oracle_contract = deps.api.addr_canonicalize(oracle_contact.as_str())?
    }

    if let Some(pool_contract) = pool_contract {
        config.pool_contract = deps.api.addr_canonicalize(pool_contract.as_str())?;
    }

    if let Some(liquidation_contract) = liquidation_contract {
        config.liquidation_contract = deps.api.addr_canonicalize(liquidation_contract.as_str())?;
    }

    if let Some(stable_denom) = stable_denom {
        config.stable_denom = stable_denom;
    }

    if let Some(epoch_period) = epoch_period {
        config.epoch_period = epoch_period;
    }

    if let Some(redeem_fee) = redeem_fee {
        if redeem_fee >= Decimal256::one() {
            return Err(ContractError::RedeemFeeExceedsLimit {});
        }
        config.redeem_fee = redeem_fee;
    }

    store_config(deps.storage, &config)?;
    Ok(Response::default())
}

pub fn mint_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    minter: String,
    stable_amount: Uint128,
    collateral_amount: Option<Uint128>,
    collateral_contract: Option<String>,
    is_redemption_provider: Option<bool>,
) -> Result<Response, ContractError> {
    let config = read_config(deps.as_ref().storage)?;
    let api = deps.api;
    let sender_raw = api.addr_canonicalize(info.sender.as_str())?;

    if sender_raw != config.custody_contract {
        if info.sender.to_string() != minter {
            return Err(ContractError::Unauthorized(
                "mint_stable_coin".to_string(),
                info.sender.to_string(),
            ));
        }
    }

    let minter_raw = api.addr_canonicalize(minter.as_str())?;
    let mut cur_collaterals: Tokens = read_collaterals(deps.storage, &minter_raw);

    let mut messages: Vec<CosmosMsg> = vec![];

    if let Some(collateral_contract) = collateral_contract {
        if let Some(collateral_amount) = collateral_amount {
            if collateral_amount <= Uint128::zero() {
                return Err(ContractError::CollateralAmountMustGreaterThanZero {});
            }

            let collateral_contract_raw = api.addr_canonicalize(&collateral_contract)?;

            cur_collaterals.add(vec![(
                collateral_contract_raw.clone(),
                Uint256::from(collateral_amount),
            )]);
            //update minter collaterals info
            store_collaterals(deps.storage, &minter_raw, &cur_collaterals)?;

            // if deposit collateral, we need update balance at reward book contract
            let collateral_elem =
                read_whitelist_elem(deps.as_ref().storage, &collateral_contract_raw)?;
            messages.push(CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: deps
                    .api
                    .addr_humanize(&collateral_elem.reward_book_contract)?
                    .to_string(),
                msg: to_binary(&RewardBookExecuteMsg::IncreaseBalance {
                    address: minter.to_string(),
                    amount: collateral_amount,
                })?,
                funds: vec![],
            }));
        } else {
            return Err(ContractError::CollateralAmountMustBeProvided {});
        }
    }

    let mut max_loan_to_value = Uint256::zero();

    for collateral in cur_collaterals {
        let price = query_price(
            deps.as_ref(),
            deps.api.addr_humanize(&config.oracle_contract)?,
            api.addr_humanize(&collateral.0)?.to_string(),
            "".to_string(),
            None,
        )?;
        let collaterals_value = Uint256::from(collateral.1) * price.emv_price;

        let collateral_info = read_whitelist_elem(deps.storage, &collateral.0)?;
        max_loan_to_value += collaterals_value * collateral_info.max_ltv;
    }

    let mut minter_loans_info = read_minter_loan_info(deps.storage, &minter_raw)?;
    if Uint256::from(stable_amount) + minter_loans_info.loans > max_loan_to_value {
        return Err(ContractError::MintkUSDTooLarge(max_loan_to_value));
    }

    minter_loans_info.loans += Uint256::from(stable_amount);
    if let Some(is_redemption_provider) = is_redemption_provider {
        minter_loans_info.is_redemption_provider = is_redemption_provider;
    }
    //update minter loan info
    store_minter_loan_info(deps.storage, &minter_raw, &minter_loans_info)?;

    let mint_msg = PoolExecuteMsg::MintStableCoin {
        minter: minter.clone().to_string(),
        stable_amount,
    };
    messages.push(CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: deps.api.addr_humanize(&config.pool_contract)?.to_string(),
        msg: to_binary(&mint_msg)?,
        funds: vec![],
    }));

    Ok(Response::new().add_messages(messages).add_attributes(vec![
        attr("action", "mint_stable_coin"),
        attr("minter", minter.to_string()),
        attr("stable_amount", stable_amount.to_string()),
    ]))
}

pub fn repay_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    sender: String,
    amount: Uint128,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;
    let api = deps.api;
    if api.addr_canonicalize(info.sender.as_str())? != config.pool_contract {
        return Err(ContractError::Unauthorized(
            "repay_stable_coin".to_string(),
            info.sender.to_string(),
        ));
    }

    let minter_raw = deps.api.addr_canonicalize(&sender.as_str())?;
    let mut loan_info = read_minter_loan_info(deps.storage, &minter_raw)?;
    loan_info.loans = loan_info.loans - Uint256::from(amount);
    store_minter_loan_info(deps.storage, &minter_raw, &loan_info)?;

    Ok(Response::new().add_attributes(vec![
        attr("contract_name", "central_control"),
        attr("action", "repay_stable_coin"),
        attr("sender", sender.to_string()),
        attr("amount", amount.to_string()),
    ]))
}

pub fn redeem_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    redeemer: Addr,
    amount: Uint128,
    minter: Addr,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;
    let api = deps.api;
    if api.addr_canonicalize(info.sender.as_str())? != config.pool_contract {
        return Err(ContractError::Unauthorized(
            "redeem_stable_coin".to_string(),
            info.sender.to_string(),
        ));
    }

    let minter_raw = api.addr_canonicalize(minter.as_str())?;
    let minter_loan_info = read_minter_loan_info(deps.storage, &minter_raw)?;
    if !minter_loan_info.is_redemption_provider {
        return Err(ContractError::CannotRedeemToNonRedemption {});
    }

    if Uint256::from(amount) > minter_loan_info.loans {
        return Err(ContractError::RedeemkUSDTooLarge(minter_loan_info.loans));
    }
    //need to deduct the redeem fee to the redemption provider, initially 0.5%, it can be modified later by Kryptonite DAO
    let redeem_amount = Uint256::from(amount) * (Decimal256::one() - config.redeem_fee);

    let mut collaterals = read_collaterals(deps.storage, &minter_raw);
    let mut redeem_collaterals = Tokens::default();
    let mut collaterals_values = Uint256::zero();
    let mut prev_collaterals_value;
    let multiply_ratio: Uint256 = Uint256::from(100_000_000u64);

    for collateral in collaterals.clone() {
        let price = query_price(
            deps.as_ref(),
            deps.api.addr_humanize(&config.oracle_contract)?,
            api.addr_humanize(&collateral.0)?.to_string(),
            "".to_string(),
            None,
        )?;

        prev_collaterals_value = collaterals_values;
        collaterals_values += Uint256::from(collateral.1) * price.emv_price;
        if collaterals_values <= redeem_amount {
            redeem_collaterals.push(collateral.clone());

            if collaterals_values == redeem_amount {
                break;
            }
        } else {
            let difference = redeem_amount - prev_collaterals_value;
            let diff_amount = Decimal256::from_ratio(
                difference.mul(multiply_ratio),
                price.emv_price.mul(multiply_ratio),
            ) * Uint256::one();
            redeem_collaterals.push((collateral.0, diff_amount));
            break;
        }
    }

    collaterals.sub(redeem_collaterals.clone())?;
    store_collaterals(deps.storage, &minter_raw, &collaterals)?;

    let mut minter_loans_info = read_minter_loan_info(deps.storage, &minter_raw)?;

    //redeemer repay loans for minter, this should not deduct the redeem fee
    minter_loans_info.loans = minter_loans_info.loans - Uint256::from(amount);
    store_minter_loan_info(deps.storage, &minter_raw, &minter_loans_info)?;

    let mut messages: Vec<CosmosMsg> = vec![];
    for redeem_elem in redeem_collaterals {
        let whitelit_elem = read_whitelist_elem(deps.storage, &redeem_elem.0)?;
        messages.push(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: deps
                .api
                .addr_humanize(&whitelit_elem.custody_contract)?
                .to_string(),
            msg: to_binary(&CustodyExecuteMsg::RedeemStableCoin {
                redeemer: redeemer.to_string(),
                redeem_amount: redeem_elem.1.into(),
            })?,
            funds: vec![],
        }));

        messages.push(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: deps
                .api
                .addr_humanize(&whitelit_elem.reward_book_contract)?
                .to_string(),
            msg: to_binary(&RewardBookExecuteMsg::DecreaseBalance {
                address: minter.to_string(),
                amount: redeem_elem.1.into(),
            })?,
            funds: vec![],
        }));
    }

    Ok(Response::new().add_messages(messages).add_attributes(vec![
        attr("action", "redeem_stable_coin"),
        attr("redeemer", redeemer.to_string()),
        attr("amount", amount.to_string()),
        attr("redemption", minter.to_string()),
    ]))
}

pub fn withdraw_collateral(
    deps: DepsMut,
    info: MessageInfo,
    collateral_contract: Addr,
    collateral_amount: Uint128,
) -> Result<Response, ContractError> {
    // let storage = deps.storage;
    let api = deps.api;

    let mut collaterals_vec: Tokens = vec![];
    let collateral_contract_raw = api.addr_canonicalize(&collateral_contract.as_str())?;

    collaterals_vec.push((
        collateral_contract_raw.clone(),
        Uint256::from(collateral_amount),
    ));

    let sender_raw = api.addr_canonicalize(info.sender.clone().as_str())?;
    let minter_loans_info = read_minter_loan_info(deps.storage, &sender_raw)?;

    let mut minter_collaterals = read_collaterals(deps.storage, &sender_raw);
    minter_collaterals.sub(collaterals_vec)?;

    let mint_max_value = compute_mint_max_value(deps.as_ref(), &minter_collaterals)?;

    if minter_loans_info.loans > mint_max_value {
        return Err(ContractError::WithdrawCollateralTooLarge(
            minter_loans_info.loans,
            mint_max_value,
        ));
    }
    store_collaterals(deps.storage, &sender_raw, &minter_collaterals)?;

    let whitelist_elem = read_whitelist_elem(deps.storage, &collateral_contract_raw)?;

    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: api
                .addr_humanize(&whitelist_elem.custody_contract)?
                .to_string(),
            msg: to_binary(&CustodyExecuteMsg::WithdrawCollateral {
                minter: info.sender.clone().to_string(),
                collateral_contract: collateral_contract.to_string(),
                collateral_amount,
            })?,
            funds: vec![],
        }))
        .add_message(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: api
                .addr_humanize(&whitelist_elem.reward_book_contract)?
                .to_string(),
            msg: to_binary(&RewardBookExecuteMsg::DecreaseBalance {
                address: info.sender.to_string(),
                amount: collateral_amount,
            })?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "withdraw_collateral"),
            attr("sender", info.sender),
            attr("collateral_contract", collateral_contract.to_string()),
            attr("collateral_amount", collateral_amount.to_string()),
        ]))
}

pub fn compute_mint_max_value(deps: Deps, collaterals: &Tokens) -> StdResult<Uint256> {
    let api = deps.api;
    let config = read_config(deps.storage)?;
    let mut mint_max_value = Uint256::zero();

    for collateral in collaterals {
        let collateral_info = read_whitelist_elem(deps.storage, &collateral.0)?;
        let price = query_price(
            deps,
            api.addr_humanize(&config.oracle_contract)?,
            api.addr_humanize(&collateral.0)?.to_string(),
            "".to_string(),
            None,
        )?;
        mint_max_value += collateral.1 * price.emv_price * collateral_info.max_ltv;
    }
    Ok(mint_max_value)
}

pub fn whitelist_collateral(
    deps: DepsMut,
    info: MessageInfo,
    name: String,
    symbol: String,
    max_ltv: Decimal256,
    custody_contract: CanonicalAddr,
    collateral_contract: CanonicalAddr,
    reward_book_contract: CanonicalAddr,
) -> Result<Response, ContractError> {
    let config = read_config(deps.storage)?;

    if deps.api.addr_canonicalize(info.sender.as_str())? != config.owner_addr {
        return Err(ContractError::Unauthorized(
            "whitelist_collateral".to_string(),
            info.sender.to_string(),
        ));
    }

    if max_ltv >= Decimal256::one() {
        return Err(ContractError::MaxLtvExceedsLimit {});
    }

    let data = WhitelistElem {
        name,
        symbol,
        max_ltv,
        custody_contract,
        collateral_contract: collateral_contract.clone(),
        reward_book_contract,
    };
    store_whitelist_elem(deps.storage, &collateral_contract, &data)?;
    Ok(Response::default())
}

pub fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let config = read_config(deps.storage)?;
    Ok(ConfigResponse {
        owner_add: deps.api.addr_humanize(&config.owner_addr)?.to_string(),
        oracle_contract: deps.api.addr_humanize(&config.oracle_contract)?.to_string(),
        pool_contract: deps.api.addr_humanize(&config.pool_contract)?.to_string(),
        liquidation_contract: deps
            .api
            .addr_humanize(&config.liquidation_contract)?
            .to_string(),
        custody_contract: deps
            .api
            .addr_humanize(&config.custody_contract)?
            .to_string(),
        stable_denom: config.stable_denom,
        epoch_period: config.epoch_period,
        redeem_fee: config.redeem_fee,
    })
}

pub fn query_loan_info(deps: Deps, minter: Addr) -> StdResult<LoanInfoResponse> {
    let minter_raw = deps.api.addr_canonicalize(&minter.as_str())?;

    let loan_info = read_minter_loan_info(deps.storage, &minter_raw)?;

    let minter_collaterals: Vec<(CanonicalAddr, Uint256)> =
        read_collaterals(deps.storage, &minter_raw);
    let max_value = compute_mint_max_value(deps, &minter_collaterals)?;
    Ok(LoanInfoResponse {
        minter: minter.to_string(),
        loans: loan_info.loans,
        max_mint_value: max_value,
    })
}

pub fn query_whitelist_elem(
    deps: Deps,
    collateral_contract: Addr,
) -> StdResult<WhitelistElemResponse> {
    let collateral_elem = read_whitelist_elem(
        deps.storage,
        &deps.api.addr_canonicalize(collateral_contract.as_str())?,
    )?;

    Ok(WhitelistElemResponse {
        name: collateral_elem.name,
        symbol: collateral_elem.symbol,
        max_ltv: collateral_elem.max_ltv,
        custody_contract: deps
            .api
            .addr_humanize(&collateral_elem.custody_contract)?
            .to_string(),
        collateral_contract: deps
            .api
            .addr_humanize(&collateral_elem.collateral_contract)?
            .to_string(),
        reward_book_contract: deps
            .api
            .addr_humanize(&collateral_elem.reward_book_contract)?
            .to_string(),
    })
}

pub fn query_whitelist(
    deps: Deps,
    collateral_contract: Option<Addr>,
    start_after: Option<Addr>,
    limit: Option<u32>,
) -> StdResult<WhitelistResponse> {
    if let Some(collateral_contract) = collateral_contract {
        let whitelist_elem: WhitelistElem = read_whitelist_elem(
            deps.storage,
            &deps.api.addr_canonicalize(collateral_contract.as_str())?,
        )?;
        Ok(WhitelistResponse {
            elems: vec![WhitelistElemResponse {
                name: whitelist_elem.name,
                symbol: whitelist_elem.symbol,
                max_ltv: whitelist_elem.max_ltv,
                custody_contract: deps
                    .api
                    .addr_humanize(&whitelist_elem.custody_contract)?
                    .to_string(),
                collateral_contract: deps
                    .api
                    .addr_humanize(&whitelist_elem.collateral_contract)?
                    .to_string(),
                reward_book_contract: deps
                    .api
                    .addr_humanize(&whitelist_elem.reward_book_contract)?
                    .to_string(),
            }],
        })
    } else {
        let start_after = if let Some(start_after) = start_after {
            Some(deps.api.addr_canonicalize(start_after.as_str())?)
        } else {
            None
        };

        let whitelist: Vec<WhitelistElemResponse> = read_whitelist(deps, start_after, limit)?;
        Ok(WhitelistResponse { elems: whitelist })
    }
}

pub fn query_redemption_provider_list(
    deps: Deps,
    minter: Option<Addr>,
    start_after: Option<Addr>,
    limit: Option<u32>,
) -> StdResult<RedemptionProviderListRespone> {
    if let Some(minter) = minter {
        let minter_loan =
            read_minter_loan_info(deps.storage, &deps.api.addr_canonicalize(minter.as_str())?)?;
        Ok(RedemptionProviderListRespone {
            provider_list: vec![MinterLoanResponse {
                minter: deps.api.addr_humanize(&minter_loan.minter)?.to_string(),
                loans: minter_loan.loans,
                is_redemption_provider: minter_loan.is_redemption_provider,
            }],
        })
    } else {
        let start_after = if let Some(start_after) = start_after {
            Some(deps.api.addr_canonicalize(start_after.as_str())?)
        } else {
            None
        };

        let provider_list: Vec<MinterLoanResponse> =
            read_redemeption_list(deps, start_after, limit)?;
        Ok(RedemptionProviderListRespone { provider_list })
    }
}
