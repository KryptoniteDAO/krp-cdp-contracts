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
        control_contract: Option<String>,
        min_redeem_value: Option<Uint256>,
    },

    SetOwner {
        new_owner_addr: String,
    },

    AcceptOwnership {
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
