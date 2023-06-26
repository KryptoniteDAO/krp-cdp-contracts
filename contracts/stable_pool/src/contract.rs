use crate::state::{read_config, read_state, store_config, store_state, Config, State};
use cdp::querier::{query_balance, query_control_loan_info};
use cosmwasm_bignumber::Uint256;
#[cfg(not(feature = "library"))]
use std::vec;

use cdp::handle::optional_addr_validate;
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    attr, coin, to_binary, Addr, BankMsg, Binary, Coin, CosmosMsg, Deps, DepsMut, Env, MessageInfo,
    Response, StdError, StdResult, SubMsg, Uint128,
};
use sei_cosmwasm::SeiMsg;

use crate::error::ContractError;
use cdp::central_control::ExecuteMsg as ControlExecuteMsg;
use cdp::stable_pool::{
    ConfigResponse, ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg, StateResponse,
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response<SeiMsg>> {
    let create_stable_denom = sei_cosmwasm::SeiMsg::CreateDenom {
        subdenom: msg.sub_demon.to_string(),
    };

    let stable_denom = "factory/".to_string()
        + env.contract.address.to_string().as_ref()
        + "/"
        + msg.sub_demon.as_str();
    let config = Config {
        stable_denom,
        owner_addr: deps.api.addr_canonicalize(&msg.owner_addr.as_str())?,
        control_contract: deps.api.addr_canonicalize(&msg.control_contract.as_str())?,
        min_redeem_value: msg.min_redeem_value,
    };
    store_config(deps.storage, &config)?;

    let state = State {
        total_supply: Uint256::zero(),
    };
    store_state(deps.storage, &state)?;

    Ok(Response::new().add_message(create_stable_denom))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response<SeiMsg>, ContractError> {
    match msg {
        ExecuteMsg::UpdateConfig {
            owner_addr,
            control_contract,
            min_redeem_value,
        } => {
            let api = deps.api;
            update_config(
                deps,
                info,
                optional_addr_validate(api, owner_addr)?,
                optional_addr_validate(api, control_contract)?,
                min_redeem_value,
            )
        }

        ExecuteMsg::MintStableCoin {
            minter,
            stable_amount,
        } => mint_stable_coin(deps, info, minter, stable_amount),

        ExecuteMsg::RepayStableCoin {} => repay_stable_coin(deps, info),

        ExecuteMsg::RedeemStableCoin { minter } => {
            let api = deps.api;
            redeem_stable_coin(deps, info, api.addr_validate(minter.as_str())?)
        }
        ExecuteMsg::RepayStableFromLiquidation {
            minter,
            pre_balance,
        } => {
            let api = deps.api;
            repay_stable_from_liquidation(
                deps,
                env,
                info,
                api.addr_validate(minter.as_str())?,
                pre_balance,
            )
        }
    }
}

pub fn update_config(
    deps: DepsMut,
    info: MessageInfo,
    owner_addr: Option<Addr>,
    control_contract: Option<Addr>,
    min_redeem_value: Option<Uint256>,
) -> Result<Response<SeiMsg>, ContractError> {
    let mut config = read_config(deps.as_ref().storage)?;
    let sender_raw = deps.api.addr_canonicalize(info.sender.as_str())?;

    if sender_raw != config.owner_addr {
        return Err(ContractError::Unauthorized(
            "update_config".to_string(),
            info.sender.to_string(),
        ));
    }

    if let Some(owner_addr) = owner_addr {
        config.owner_addr = deps.api.addr_canonicalize(owner_addr.as_str())?
    }

    if let Some(control_contract) = control_contract {
        config.control_contract = deps.api.addr_canonicalize(control_contract.as_str())?
    }

    if let Some(min_redeem_value) = min_redeem_value {
        config.min_redeem_value = min_redeem_value;
    }

    store_config(deps.storage, &config)?;

    Ok(Response::default())
}

/// call only by central contral contract
/// mint new stale coin to minter
pub fn mint_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    minter: String,
    stable_amount: Uint128,
) -> Result<Response<SeiMsg>, ContractError> {
    let config = read_config(deps.storage)?;
    let mut state = read_state(deps.storage)?;

    if config.control_contract != deps.api.addr_canonicalize(&info.sender.as_str())? {
        return Err(ContractError::Unauthorized(
            "mint_stable_coin".to_string(),
            info.sender.to_string(),
        ));
    }

    let amount = coin(stable_amount.into(), config.stable_denom);

    let stable_mint = sei_cosmwasm::SeiMsg::MintTokens {
        amount: amount.to_owned(),
    };

    let send_msg = SubMsg::new(BankMsg::Send {
        to_address: minter.to_string(),
        amount: vec![amount],
    });

    state.total_supply += Uint256::from(stable_amount);

    store_state(deps.storage, &state)?;

    Ok(Response::new()
        .add_message(stable_mint)
        .add_submessage(send_msg)
        .add_attributes(vec![
            attr("action", "mint_stable_coin"),
            attr("minter", minter.to_string()),
            attr("amount", stable_amount.to_string()),
        ]))
}

/// call only by central control contract
/// burn stable coin when user repay via central control
pub fn burn_stable_coin(
    deps: DepsMut,
    _info: &MessageInfo,
    stable_amnount: Uint128,
) -> Result<Response<SeiMsg>, ContractError> {
    let config = read_config(deps.storage)?;
    let mut state = read_state(deps.storage)?;

    let amount = coin(stable_amnount.into(), config.stable_denom);
    let burn_msg = sei_cosmwasm::SeiMsg::BurnTokens { amount };

    state.total_supply = state.total_supply - Uint256::from(stable_amnount);

    store_state(deps.storage, &state)?;
    Ok(Response::new().add_message(burn_msg).add_attributes(vec![
        attr("action", "burn_stable_coin"),
        attr("amount", stable_amnount.to_string()),
    ]))
}

pub fn repay_stable_from_liquidation(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    minter: Addr,
    pre_balance: Uint256,
) -> Result<Response<SeiMsg>, ContractError> {
    let config = read_config(deps.storage)?;

    let cur_balance: Uint256 = query_balance(
        deps.as_ref(),
        env.contract.address.clone(),
        config.stable_denom.to_string(),
    )?;

    let mut info = info;
    info.sender = minter;

    info.funds = vec![Coin {
        denom: config.stable_denom,
        amount: (cur_balance - pre_balance).into(),
    }];

    repay_stable_coin(deps, info)
}

pub fn repay_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
) -> Result<Response<SeiMsg>, ContractError> {
    let config = read_config(deps.storage)?;
    let stable_denom = config.stable_denom;
    let sender = info.sender.clone();
    // coin must have be sent along with transaction and it should be in underlying coin denom
    if info.funds.len() > 1usize {
        return Err(ContractError::Std(StdError::generic_err(
            "More than one coin is sent; only one asset is supported",
        )));
    }
    let api = deps.api;
    // coin must have be sent along with transaction and it should be in underlying coin denom
    let repay = info
        .funds
        .iter()
        .find(|x| x.denom == stable_denom && x.amount > Uint128::zero())
        .ok_or_else(|| {
            StdError::generic_err(format!("No {} assets are provided to repay", stable_denom))
        })?;

    let loan_info = query_control_loan_info(
        deps.as_ref(),
        api.addr_humanize(&config.control_contract)?.to_string(),
        sender.clone().to_string(),
    )?;

    let mut back_amount = Uint128::zero();

    let repay_amount = if Uint256::from(repay.amount) > loan_info.loans {
        back_amount = repay.amount.checked_sub(loan_info.loans.into())?;
        Uint128::zero().checked_add(loan_info.loans.into())?
    } else {
        repay.amount
    };

    burn_stable_coin(deps, &info, repay_amount)?;

    let mut messages = vec![];

    // refund of overpayment balance
    if back_amount > Uint128::zero() {
        messages.push(SubMsg::new(BankMsg::Send {
            to_address: sender.clone().to_string(),
            amount: vec![Coin {
                denom: stable_denom,
                amount: back_amount,
            }],
        }))
    }

    // update loan info
    let repay_msg = ControlExecuteMsg::RepayStableCoin {
        sender: sender.clone().to_string(),
        amount: repay_amount,
    };

    messages.push(SubMsg::new(CosmosMsg::Wasm(
        cosmwasm_std::WasmMsg::Execute {
            contract_addr: api.addr_humanize(&config.control_contract)?.to_string(),
            msg: to_binary(&repay_msg)?,
            funds: vec![],
        },
    )));

    Ok(Response::new()
        .add_submessages(messages)
        .add_attributes(vec![
            attr("action", "repay_stable_coin"),
            attr("sender", sender.clone().to_string()),
            attr("amount", repay.amount),
        ]))
}

pub fn redeem_stable_coin(
    deps: DepsMut,
    info: MessageInfo,
    minter: Addr,
) -> Result<Response<SeiMsg>, ContractError> {
    let config = read_config(deps.storage)?;
    let stable_denom = config.stable_denom;
    let sender = info.sender.clone();
    // coin must have be sent along with transaction and it should be in underlying coin denom
    if info.funds.len() > 1usize {
        return Err(ContractError::Std(StdError::generic_err(
            "More than one coin is sent; only one asset is supported",
        )));
    }
    let api = deps.api;
    // coin must have be sent along with transaction and it should be in underlying coin denom
    let repay = info
        .funds
        .iter()
        .find(|x| x.denom == stable_denom && x.amount > Uint128::zero())
        .ok_or_else(|| {
            StdError::generic_err(format!("No {} assets are provided to repay", stable_denom))
        })?;

    if repay.amount < config.min_redeem_value.into() {
        return Err(ContractError::CannotLessThanMinRedeemValue(config.min_redeem_value.into()));
    }

    let redeem_msg = ControlExecuteMsg::RedeemStableCoin {
        redeemer: sender.to_string(),
        amount: repay.amount,
        minter: minter.to_string(),
    };

    burn_stable_coin(deps, &info, repay.amount)?;

    Ok(Response::new()
        .add_message(CosmosMsg::Wasm(cosmwasm_std::WasmMsg::Execute {
            contract_addr: api.addr_humanize(&config.control_contract)?.to_string(),
            msg: to_binary(&redeem_msg)?,
            funds: vec![],
        }))
        .add_attributes(vec![
            attr("action", "redeem_stable_coin"),
            attr("contract", "stable_pool"),
            attr("sender", sender.to_string()),
            attr("amount", repay.amount.to_string()),
        ]))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
        QueryMsg::State {} => to_binary(&query_state(deps)?),
    }
}

pub fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let config = read_config(deps.storage)?;

    Ok(ConfigResponse {
        owner_addr: deps.api.addr_humanize(&config.owner_addr)?.to_string(),
        control_contract: deps
            .api
            .addr_humanize(&config.control_contract)?
            .to_string(),
        stable_denom: config.stable_denom,
    })
}

pub fn query_state(deps: Deps) -> StdResult<StateResponse> {
    let state = read_state(deps.storage)?;

    Ok(StateResponse {
        total_supply: state.total_supply,
    })
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
