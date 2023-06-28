use cdp::central_control::{CollateralsResponse, MinterLoanResponse, WhitelistElemResponse};
use cdp::tokens::Tokens;

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_bignumber::{Decimal256, Uint256};
use cosmwasm_std::{CanonicalAddr, Deps, Order, StdError, StdResult, Storage};

use cosmwasm_storage::{bucket, Bucket, ReadonlyBucket, ReadonlySingleton, Singleton};

const KEY_CONFIG: &[u8] = b"config";
const KEY_STATE: &[u8] = b"state";
const PREFIX_WHITELISTELEM: &[u8] = b"whitelistelem";
const PREFIX_COLLATERALS: &[u8] = b"collateral";
const PREFIX_LOANINFO: &[u8] = b"loan";

// settings for pagination
const MAX_LIMIT: u32 = 30;
const DEFAULT_LIMIT: u32 = 10;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct WhitelistElem {
    pub name: String,
    pub symbol: String,
    pub max_ltv: Decimal256,
    pub custody_contract: CanonicalAddr,
    pub collateral_contract: CanonicalAddr,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub total_loans: Uint256,
    pub collateral_safe_rate: Decimal256,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub owner_addr: CanonicalAddr,
    pub oracle_contract: CanonicalAddr,
    pub pool_contract: CanonicalAddr,
    pub liquidation_contract: CanonicalAddr,
    pub stable_denom: String,
    //The distribution period after the staking revenue from the chain,
    pub epoch_period: u64,
    pub redeem_fee: Decimal256,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MinterLoanInfo {
    pub minter: CanonicalAddr,
    pub loans: Uint256,
    pub is_redemption_provider: bool,
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

pub fn store_minter_loan_info(
    storage: &mut dyn Storage,
    minter: &CanonicalAddr,
    loan_info: &MinterLoanInfo,
) -> StdResult<()> {
    bucket(storage, PREFIX_LOANINFO).save(minter.as_slice(), loan_info)
}

pub fn read_minter_loan_info(
    storage: &dyn Storage,
    minter: &CanonicalAddr,
) -> StdResult<MinterLoanInfo> {
    let loan_info_bucket: ReadonlyBucket<MinterLoanInfo> =
        ReadonlyBucket::new(storage, PREFIX_LOANINFO);

    match loan_info_bucket.load(minter.clone().as_slice()) {
        Ok(v) => Ok(v),
        _ => Ok(MinterLoanInfo {
            minter: minter.clone(),
            loans: Uint256::zero(),
            is_redemption_provider: false,
        }),
    }
}

pub fn read_redemeption_list(
    deps: Deps,
    start_after: Option<CanonicalAddr>,
    limit: Option<u32>,
) -> StdResult<Vec<MinterLoanResponse>> {
    let whitelist_bucket: ReadonlyBucket<MinterLoanInfo> =
        ReadonlyBucket::new(deps.storage, PREFIX_LOANINFO);
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = calc_range_start(start_after);
    let mut result = Vec::with_capacity(limit);
    for elem in whitelist_bucket.range(start.as_deref(), None, Order::Ascending) {
        let (_k, v) = elem?;
        if v.is_redemption_provider {
            result.push(MinterLoanResponse {
                minter: deps.api.addr_humanize(&v.minter)?.to_string(),
                loans: v.loans,
                is_redemption_provider: v.is_redemption_provider,
            });
        }
        if result.len() == limit {
            break;
        }
    }
    Ok(result)
}
pub fn store_whitelist_elem(
    storage: &mut dyn Storage,
    collateral_contract: &CanonicalAddr,
    whitelist_elem: &WhitelistElem,
) -> StdResult<()> {
    bucket(storage, PREFIX_WHITELISTELEM).save(collateral_contract.as_slice(), whitelist_elem)
}

pub fn read_whitelist_elem(
    storage: &dyn Storage,
    collateral_contract: &CanonicalAddr,
) -> StdResult<WhitelistElem> {
    let whitelist_bucket: ReadonlyBucket<WhitelistElem> =
        ReadonlyBucket::new(storage, PREFIX_WHITELISTELEM);
    match whitelist_bucket.load(collateral_contract.as_slice()) {
        Ok(v) => Ok(v),
        _ => Err(StdError::generic_err(
            "Token is not registered as collateral",
        )),
    }
}

pub fn read_whitelist(
    deps: Deps,
    start_after: Option<CanonicalAddr>,
    limit: Option<u32>,
) -> StdResult<Vec<WhitelistElemResponse>> {
    let whitelist_bucket: ReadonlyBucket<WhitelistElem> =
        ReadonlyBucket::new(deps.storage, PREFIX_WHITELISTELEM);

    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = calc_range_start(start_after);

    whitelist_bucket
        .range(start.as_deref(), None, Order::Ascending)
        .take(limit)
        .map(|elem| {
            let (_k, v) = elem?;
            Ok(WhitelistElemResponse {
                name: v.name,
                symbol: v.symbol,
                max_ltv: v.max_ltv,
                collateral_contract: deps.api.addr_humanize(&v.collateral_contract)?.to_string(),
                custody_contract: deps.api.addr_humanize(&v.custody_contract)?.to_string(),
            })
        })
        .collect()
}

// this will set the first key after the provided key, by appending a 1 byte
fn calc_range_start(start_after: Option<CanonicalAddr>) -> Option<Vec<u8>> {
    start_after.map(|addr| {
        let mut v = addr.as_slice().to_vec();
        v.push(1);
        v
    })
}

// record the list of collaterals deposited by the minter
#[allow(clippy::ptr_arg)]
pub fn store_collaterals(
    storage: &mut dyn Storage,
    minter: &CanonicalAddr,
    collaterals: &Tokens,
) -> StdResult<()> {
    let mut collaterals_bucket: Bucket<Tokens> = Bucket::new(storage, PREFIX_COLLATERALS);
    if collaterals.is_empty() {
        collaterals_bucket.remove(minter.as_slice());
    } else {
        collaterals_bucket.save(minter.as_slice(), collaterals)?;
    }

    Ok(())
}

// read the list of collaterals deposited by the minter
pub fn read_collaterals(storage: &dyn Storage, minter: &CanonicalAddr) -> Tokens {
    let collaterals_bucket: ReadonlyBucket<Tokens> =
        ReadonlyBucket::new(storage, PREFIX_COLLATERALS);
    match collaterals_bucket.load(minter.as_slice()) {
        Ok(v) => v,
        _ => vec![],
    }
}

// read list of collaterals deposited by all minter defaulte pagesize 10
pub fn read_all_collaterals(
    deps: Deps,
    start_after: Option<CanonicalAddr>,
    limit: Option<u32>,
) -> StdResult<Vec<CollateralsResponse>> {
    let whitelist_bucket: ReadonlyBucket<Tokens> =
        ReadonlyBucket::new(deps.storage, PREFIX_COLLATERALS);

    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = calc_range_start(start_after);

    whitelist_bucket
        .range(start.as_deref(), None, Order::Ascending)
        .take(limit)
        .map(|elem| {
            let (k, v) = elem?;
            let minter = deps.api.addr_humanize(&CanonicalAddr::from(k))?.to_string();
            let collaterals: Vec<(String, Uint256)> = v
                .iter()
                .map(|c| Ok((deps.api.addr_humanize(&c.0)?.to_string(), c.1)))
                .collect::<StdResult<Vec<(String, Uint256)>>>()?;

            Ok(CollateralsResponse {
                minter,
                collaterals,
            })
        })
        .collect()
}
