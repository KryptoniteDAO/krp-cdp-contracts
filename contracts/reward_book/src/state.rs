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
use cosmwasm_std::{Addr, Api, CanonicalAddr, Decimal, Deps, Order, StdResult, Storage, Uint128};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cdp::reward_book::HolderResponse;
use cw_storage_plus::{Bound, Item, Map};

pub const STATE: Item<State> = Item::new("\u{0}\u{5}state");
pub const CONFIG: Item<Config> = Item::new("\u{0}\u{6}config");
pub const HOLDERS: Map<&[u8], Holder> = Map::new("holders");
pub const NEWOWNER:Item<NewOwnerAddr> = Item::new("\u{0}\u{8}newowner");

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub owner: CanonicalAddr,
    pub control_contract: CanonicalAddr,
    pub custody_contract: CanonicalAddr,
    pub reward_denom: String,
    pub reward_contract: CanonicalAddr,    // krp-Staking module reward contract address
    pub threshold: Uint256,
}

pub fn store_config(storage: &mut dyn Storage, config: &Config) -> StdResult<()> {
    CONFIG.save(storage, config)
}

pub fn read_config(storage: &dyn Storage) -> StdResult<Config> {
    CONFIG.load(storage)
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct NewOwnerAddr {
    pub new_owner_addr: CanonicalAddr, 
}

pub fn store_new_owner(storage: &mut dyn Storage, config: &NewOwnerAddr) -> StdResult<()> {
    NEWOWNER.save(storage, config)
}

pub fn read_new_owner(storage: &dyn Storage) -> StdResult<NewOwnerAddr> {
    NEWOWNER.load(storage)
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub global_index: Decimal,
    pub total_balance: Uint128,
    pub prev_reward_balance: Uint128,
}

pub fn store_state(storage: &mut dyn Storage, state: &State) -> StdResult<()> {
    STATE.save(storage, state)
}

pub fn read_state(storage: &dyn Storage) -> StdResult<State> {
    STATE.load(storage)
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Holder {
    pub balance: Uint128,
    pub index: Decimal,
    pub pending_rewards: Decimal,
}

// This is similar to HashMap<holder's address, Hodler>
pub fn store_holder(
    storage: &mut dyn Storage,
    holder_address: &CanonicalAddr,
    holder: &Holder,
) -> StdResult<()> {
    HOLDERS.save(storage, holder_address.as_slice(), holder)
}

pub fn read_holder(storage: &dyn Storage, holder_address: &CanonicalAddr) -> StdResult<Holder> {
    let res = HOLDERS.may_load(storage, holder_address.as_slice())?;
    match res {
        Some(holder) => Ok(holder),
        None => Ok(Holder {
            balance: Uint128::zero(),
            index: Decimal::zero(),
            pending_rewards: Decimal::zero(),
        }),
    }
}

// settings for pagination
const MAX_LIMIT: u32 = 30;
const DEFAULT_LIMIT: u32 = 10;
pub fn read_holders(
    deps: Deps,
    start_after: Option<Addr>,
    limit: Option<u32>,
) -> StdResult<Vec<HolderResponse>> {
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start =
        calc_range_start(deps.api, start_after.map(Addr::unchecked))?.map(Bound::ExclusiveRaw);

    HOLDERS
        .range(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .map(|elem| {
            let (k, v) = elem?;
            let address: String = deps.api.addr_humanize(&CanonicalAddr::from(k))?.to_string();
            Ok(HolderResponse {
                address,
                balance: v.balance,
                index: v.index,
                pending_rewards: v.pending_rewards,
            })
        })
        .collect()
}

// this will set the first key after the provided key, by appending a 1 byte
fn calc_range_start(api: &dyn Api, start_after: Option<Addr>) -> StdResult<Option<Vec<u8>>> {
    match start_after {
        Some(human) => {
            let mut v: Vec<u8> = api.addr_canonicalize(human.as_ref())?.0.into();
            v.push(0);
            Ok(Some(v))
        }
        None => Ok(None),
    }
}
