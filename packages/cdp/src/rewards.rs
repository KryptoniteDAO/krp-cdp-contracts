

use cosmwasm_std::Uint128;
use cosmwasm_schema::{cw_serde,};

#[cw_serde]
pub enum ExecuteMsg {
    /// return the accrued reward in uusd to the user.
    ClaimRewards { recipient: Option<String> },
}

#[cw_serde]
pub enum QueryMsg {
    AccruedRewards {
        address: String,
    },
}


#[cw_serde]
pub struct AccruedRewardsResponse {
    pub rewards: Uint128,
}