use cosmwasm_bignumber::Uint256;
use cosmwasm_std::Uint128;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub sub_demon: String,
    pub owner_addr: String, 
    pub control_contract: String, 
    pub min_redeem_value: Uint256,
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
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

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct MigrateMsg{}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Config {},
    State{}
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct ConfigResponse {
    pub owner_addr: String, 
    pub control_contract: String,
    pub stable_denom: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct StateResponse {
    pub total_supply: Uint256,
}
