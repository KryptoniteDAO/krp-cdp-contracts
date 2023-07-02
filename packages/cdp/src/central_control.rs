use cosmwasm_bignumber::{Decimal256, Uint256};
use cosmwasm_std::{Uint128};
use cosmwasm_schema::{cw_serde, QueryResponses};

use crate::tokens::{TokensHuman};

#[cw_serde]
pub struct InstantiateMsg {
    /// Initial owner address
    pub owner_addr: String,
    pub oracle_contract: String,
    pub pool_contract: String,
    pub liquidation_contract: String,
    pub stable_denom: String,
    pub epoch_period: u64,
    pub redeem_fee: Decimal256,
}

#[cw_serde]
pub enum ExecuteMsg {
    UpdateConfig {
        owner_addr: Option<String>,
        oracle_contract: Option<String>,
        pool_contract: Option<String>,
        liquidation_contract: Option<String>,
        stable_denom: Option<String>,
        epoch_period: Option<u64>,
        redeem_fee: Option<Decimal256>,
    },

    ///mint stable coin kUSD call by custody contract.
    MintStableCoin {
        minter: String,
        stable_amount: Uint128,
        collateral_amount: Option<Uint128>,
        collateral_contract: Option<String>,
        is_redemption_provider: Option<bool>,
    },

    BecomeRedemptionProvider {
        is_redemption_provider: bool,
    },

    RepayStableCoin {
        sender: String,
        amount: Uint128,
    },

    RedeemStableCoin {
        redeemer: String,
        amount: Uint128,
        minter: String,
    },

    WithdrawCollateral {
        collateral_contract: String,
        collateral_amount: Uint128,
    },

    DepositCollateral {
        minter: String,
        collateral_contract: String,
        collateral_amount: Uint128,
    },

    LiquidateCollateral {
        minter: String,
    },

    WhitelistCollateral {
        name: String,
        symbol: String,
        max_ltv: Decimal256,
        custody_contract: String,
        collateral_contract: String,
        staking_reward_contract: String,
    },
}

#[cw_serde]
pub enum Cw20HookMsg {}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(LoanInfoResponse)]
    LoanInfo { minter: String },
    #[returns(WhitelistElemResponse)]
    CollateralElem { collateral: String },
    #[returns(WhitelistResponse)]
    Whitelist {  
        collateral_contract: Option<String>,
        start_after: Option<String>,
        limit: Option<u32>,
    },
    #[returns(MinterCollateralResponse)]
    MinterCollateral {
        minter: String,
    },
    #[returns(RedemptionProviderListRespone)]
    RedemptionProviderList {
        minter: Option<String>,
        start_after: Option<String>,
        limit: Option<u32>,
    },

    #[returns(CollateralAvailableRespone)]
    CollateralAvailable {
        minter: String,
        collateral_contract: String,
    },
}

#[cw_serde]
pub struct MigrateMsg {}

#[cw_serde]
pub struct ConfigResponse {
    pub owner_add: String,
    pub oracle_contract: String,
    pub pool_contract: String,
    pub liquidation_contract: String,
    pub stable_denom: String,
    pub epoch_period: u64,
    pub redeem_fee: Decimal256,
}


// We define a custom struct for each query response
#[cw_serde]
pub struct LoanInfoResponse {
    pub minter: String,
    pub loans: Uint256,
    pub max_mint_value: Uint256,
}

// We define a custom struct for each query response
#[cw_serde]
pub struct CollateralsResponse {
    pub minter: String,
    pub collaterals: TokensHuman, // <(Collateral Token, Amount)>
}

// We define a custom struct for each query response
#[cw_serde]
pub struct WhitelistElemResponse {
    pub name: String,
    pub symbol: String,
    pub max_ltv: Decimal256,
    pub custody_contract: String,
    pub collateral_contract: String,
    pub staking_reward_contract: String,
}

// We define a custom struct for each query response
#[cw_serde]
pub struct WhitelistResponse {
    pub elems: Vec<WhitelistElemResponse>,
}

// We define a custom struct for each query response
#[cw_serde]
pub struct MinterCollateralResponse {
    pub collaterals: TokensHuman,
}

#[cw_serde]
pub struct MinterLoanResponse {
    pub minter: String,
    pub loans: Uint256,
    pub is_redemption_provider: bool,
}

#[cw_serde]
pub struct RedemptionProviderListRespone {
    pub provider_list: Vec<MinterLoanResponse>,
}


#[cw_serde]
pub struct CollateralAvailableRespone {
    pub available_balance: Uint128,
}
