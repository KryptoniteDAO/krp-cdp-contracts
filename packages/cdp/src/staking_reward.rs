use cosmwasm_bignumber::Uint256;
use cosmwasm_schema::cw_serde;

use cosmwasm_std::{Decimal, Uint128};

#[cw_serde]
pub struct InstantiateMsg {
    pub control_contract: String,
    pub reward_contract: String,
    pub custody_contract: String,
    pub reward_denom: String,
    pub threshold: Uint256,
}

#[cw_serde]
pub enum ExecuteMsg {
    ////////////////////
    /// Owner's operations
    ///////////////////
    UpdateConfig {
        owner_addr: Option<String>,
        control_contract: Option<String>, 
        reward_contract: Option<String>,
        custody_contract: Option<String>,
        reward_denom: Option<String>,
        threshold: Option<Uint256>,
    },

    ////////////////////
    /// bAsset's operations
    ///////////////////

    /// Increase user staking balance
    /// Withdraw rewards to pending rewards
    /// Set current reward index to global index
    IncreaseBalance { address: String, amount: Uint128 },
    /// Decrease user staking balance
    /// Withdraw rewards to pending rewards
    /// Set current reward index to global index
    DecreaseBalance { address: String, amount: Uint128 },

    ////////////////////
    /// User's operations
    ///////////////////
    
    /// Update the global index
    UpdateGlobalIndex {},

    /// return the accrued reward in uusd to the user.
    ClaimRewards { recipient: Option<String> },
}


#[cw_serde]
pub enum Cw20HookMsg {
    /// distribution kUSD reward which claimed from Staking
    Distribution { }
}


#[cw_serde]
pub enum QueryMsg {
    Config {},
    State {},
    AccruedRewards {
        address: String,
    },
    Holder {
        address: String,
    },
    Holders {
        start_after: Option<String>,
        limit: Option<u32>,
    },
}

#[cw_serde]
pub struct ConfigResponse {
    pub control_contract: String,
    pub reward_contract: String,
    pub custody_contract: String,
    pub reward_denom: String,
    pub owner: String,
}

#[cw_serde]
pub struct StateResponse {
    pub global_index: Decimal,
    pub total_balance: Uint128,
    pub prev_reward_balance: Uint128,
}

#[cw_serde]
pub struct AccruedRewardsResponse {
    pub rewards: Uint128,
}

#[cw_serde]
pub struct HolderResponse {
    pub address: String,
    pub balance: Uint128,
    pub index: Decimal,
    pub pending_rewards: Decimal,
}

#[cw_serde]
pub struct HoldersResponse {
    pub holders: Vec<HolderResponse>,
}




#[cw_serde]
pub struct MigrateMsg {}
