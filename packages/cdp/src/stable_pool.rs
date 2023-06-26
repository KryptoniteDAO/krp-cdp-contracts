use cosmwasm_bignumber::Uint256;
use cosmwasm_std::Uint128;
use cosmwasm_schema::{cw_serde,QueryResponses};

#[cw_serde]
pub struct InstantiateMsg {
    pub sub_demon: String,
    pub owner_addr: String, 
    pub control_contract: String, 
    pub min_redeem_value: Uint256,
}


#[cw_serde]
pub enum ExecuteMsg {

    UpdateConfig {
        owner_addr: Option<String>, 
        control_contract: Option<String>,
        min_redeem_value: Option<Uint256>,
    },

    MintStableCoin {
        minter: String,
        stable_amount: Uint128,
    },

    RepayStableCoin{ }, 

    RedeemStableCoin{
        minter: String,
    },

    RepayStableFromLiquidation{
        minter: String,
        pre_balance: Uint256,
    }
}

#[cw_serde]
pub struct MigrateMsg{}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(StateResponse)]
    State{}
}


#[cw_serde]
pub struct ConfigResponse {
    pub owner_addr: String, 
    pub control_contract: String,
    pub stable_denom: String,
}

#[cw_serde]
pub struct StateResponse {
    pub total_supply: Uint256,
}
