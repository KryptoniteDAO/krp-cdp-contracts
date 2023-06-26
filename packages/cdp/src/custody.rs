use cosmwasm_bignumber::Uint256;
use cosmwasm_std::{ Uint128};
use cw20::Cw20ReceiveMsg;
use cosmwasm_schema::{cw_serde,QueryResponses};
use crate::tokens::{TokensHuman};

#[cw_serde]
pub struct InstantiateMsg {
    /// Initial owner address
    pub owner_addr: String,
    pub control_contract: String,
    pub pool_contract: String,
    pub collateral_contract: String,
    pub liquidation_contract: String,
}

#[cw_serde]
pub enum ExecuteMsg {
    UpdateConfig {
        owner_addr: Option<String>,
        control_contract: Option<String>,
        pool_contract: Option<String>,
        collateral_contract: Option<String>,
        liquidation_contract: Option<String>,
    },

    /// Receive interface for send token.
    /// deposit collateral token denom.
    /// mint kUSD token.
    Receive(Cw20ReceiveMsg),

    RedeemStableCoin {
        redeemer: String,
        redeem_amount: Uint128,
    },

    WithdrawCollateral {
        minter: String,
        collateral_contract: String,
        collateral_amount: Uint128,
    },

    LiquidateCollateral {
        liquidator: String,
        amount: Uint128,
    }

}

#[cw_serde]
pub enum Cw20HookMsg {
    ///mint stable coin kUSD
    MintStableCoin {
        stable_amount: Uint128, // mint stable amount, can not exceed ltv limit
        is_redemption_provider: Option<bool>,   //Whether to become a redemption provider
    },

    DepositCollateral {},
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(StateResponse)]
    State {},
}

// We define a custom struct for each query response
#[cw_serde]
pub struct CollateralsResponse {
    pub borrower: String,
    pub collaterals: TokensHuman, // <(Collateral Token, Amount)>
}

#[cw_serde]
pub struct StateResponse {
    pub total_amount: Uint256,
}


#[cw_serde]
pub struct MigrateMsg {}


#[cw_serde]
pub struct ConfigResponse {
    pub owner_addr: String, 
    pub control_contract: String,
    pub pool_contract: String, 
    pub collateral_contract: String,
    pub liquidation_contract: String,
}
