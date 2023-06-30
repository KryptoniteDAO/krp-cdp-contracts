
use cosmwasm_storage::{Singleton, ReadonlySingleton};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_bignumber::{Uint256};
use cosmwasm_std::{CanonicalAddr, StdResult, Storage};



static KEY_CONFIG: &[u8] = b"config";
static KEY_STATE: &[u8] = b"state";


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub owner_addr: CanonicalAddr, 
    pub control_contract: CanonicalAddr,
    pub pool_contract: CanonicalAddr, 
    pub collateral_contract: CanonicalAddr,
    pub liquidation_contract: CanonicalAddr,
    pub staking_reward_contract: CanonicalAddr,
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub total_amount: Uint256,
}


pub fn store_config(storage: &mut dyn Storage, data: &Config) -> StdResult<()> {
    Singleton::new(storage, KEY_CONFIG).save(data)
}

pub fn read_config(storage: &dyn Storage) -> StdResult<Config> {
    ReadonlySingleton::new(storage, KEY_CONFIG).load()
}

pub fn store_state(storage: &mut dyn Storage, data: &State) -> StdResult<()> {
    Singleton::new(storage, KEY_STATE).save(data)
}

pub fn read_state(storage: &dyn Storage) -> StdResult<State> {
    ReadonlySingleton::new(storage, KEY_STATE).load()
}
