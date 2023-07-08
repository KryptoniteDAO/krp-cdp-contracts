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