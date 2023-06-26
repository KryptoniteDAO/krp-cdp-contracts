use cosmwasm_bignumber::{Decimal256, Uint256};
use cosmwasm_std::Uint128;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::tokens::{TokensHuman};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    /// Initial owner address
    pub owner_addr: String,
    pub oracle_contract: String,
    pub pool_contract: String,
    pub custody_contract: String,
    pub liquidation_contract: String,
    pub stable_denom: String,
    pub epoch_period: u64,
    pub redeem_fee: Decimal256,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        owner_addr: Option<String>,
        oracle_contract: Option<String>,
        pool_contract: Option<String>,
        custody_contract: Option<String>,
        liquidation_contract: Option<String>,
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
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20HookMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Config {},

    LoanInfo { minter: String },

    CollateralElem { collateral: String },

    Whitelist {  
        collateral_contract: Option<String>,
        start_after: Option<String>,
        limit: Option<u32>,
    },

    MinterCollateral {
        minter: String,
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct MigrateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ConfigResponse {
    pub owner_add: String,
    pub oracle_contract: String,
    pub pool_contract: String,
    pub custody_contract: String,
    pub epoch_period: u64,
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct LoanInfoResponse {
    pub minter: String,
    pub loans: Uint256,
    pub max_mint_value: Uint256,
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CollateralsResponse {
    pub minter: String,
    pub collaterals: TokensHuman, // <(Collateral Token, Amount)>
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct WhitelistElemResponse {
    pub name: String,
    pub symbol: String,
    pub max_ltv: Decimal256,
    pub custody_contract: String,
    pub collateral_contract: String,
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct WhitelistResponse {
    pub elems: Vec<WhitelistElemResponse>,
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MinterCollateralResponse {
    pub collaterals: TokensHuman,
}