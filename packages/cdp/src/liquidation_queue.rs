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


use cosmwasm_schema::{cw_serde,QueryResponses};

use cosmwasm_bignumber::{Decimal256, Uint256};
use cosmwasm_std::Uint128;
use cw20::Cw20ReceiveMsg;

use crate::tokens::TokensHuman;

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String,
    pub oracle_contract: String,
    pub stable_denom: String,
    /// borrow_amount / borrow_limit must always be bigger than  
    /// safe_ratio.
    pub safe_ratio: Decimal256,
    /// Fee applied to executed bids
    /// Sent to Overseer interest buffer
    pub bid_fee: Decimal256,
    /// Fee applied to executed bids
    /// Sent to the address executing the liquidation
    pub liquidator_fee: Decimal256,
    /// Liquidation threshold amount in stable denom.
    /// When the current collaterals value is smaller than
    /// the threshold, all collaterals will be liquidated
    pub liquidation_threshold: Uint256,
    /// Valid oracle price timeframe
    pub price_timeframe: u64,
    /// Time period that needs to pass for a bid to be activated (seconds)
    pub waiting_period: u64,
    pub control_contract: String,
}

#[cw_serde]
pub enum ExecuteMsg {
    Receive(Cw20ReceiveMsg),
    UpdateConfig {
        oracle_contract: Option<String>,
        safe_ratio: Option<Decimal256>,
        bid_fee: Option<Decimal256>,
        liquidator_fee: Option<Decimal256>,
        liquidation_threshold: Option<Uint256>,
        price_timeframe: Option<u64>,
        waiting_period: Option<u64>,
        control_contract: Option<String>,
        stable_denom: Option<String>,
    },
    SetOwner {
        new_owner_addr: String,
    },

    AcceptOwnership {
    },

    /// Owner operation to whitelist a new collateral
    WhitelistCollateral {
        collateral_token: String,
        bid_threshold: Uint256,
        max_slot: u8,
        premium_rate_per_slot: Decimal256,
    },
    UpdateCollateralInfo {
        collateral_token: String,
        bid_threshold: Option<Uint256>,
        max_slot: Option<u8>,
    },
    /// Submit a new bid to a bid pool
    SubmitBid {
        collateral_token: String,
        premium_slot: u8,
    },
    /// Withdraw a bid
    RetractBid {
        bid_idx: Uint128,
        amount: Option<Uint256>,
    },
    /// After waiting_period expires, user can activate the bid
    ActivateBids {
        collateral_token: String,
        bids_idx: Option<Vec<Uint128>>,
    },
    /// Claim the corresponding amount of liquidated collateral
    ClaimLiquidations {
        collateral_token: String,
        bids_idx: Option<Vec<Uint128>>,
    },
}

#[cw_serde]
pub enum Cw20HookMsg {
    /// Custody interface to liquidate the sent collateral
    ExecuteBid {
        liquidator: String, // Legacy parameter, ignored
        fee_address: Option<String>,
        repay_address: Option<String>,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(LiquidationAmountResponse)]
    LiquidationAmount {
        borrow_amount: Uint256,
        borrow_limit: Uint256,
        collaterals: TokensHuman,
        collateral_prices: Vec<Decimal256>,
    },
    #[returns(CollateralInfoResponse)]
    CollateralInfo {
        collateral_token: String,
    },
    #[returns(BidResponse)]
    Bid {
        bid_idx: Uint128,
    },
    #[returns(BidsResponse)]
    BidsByUser {
        collateral_token: String,
        bidder: String,
        start_after: Option<Uint128>,
        limit: Option<u8>,
    },
    #[returns(BidPoolResponse)]
    BidPool {
        collateral_token: String,
        bid_slot: u8,
    },
    #[returns(BidPoolsResponse)]
    BidPoolsByCollateral {
        collateral_token: String,
        start_after: Option<u8>,
        limit: Option<u8>,
    },
}

#[cw_serde]
pub struct ConfigResponse {
    pub owner: String,
    pub oracle_contract: String,
    pub stable_denom: String,
    pub safe_ratio: Decimal256,
    pub bid_fee: Decimal256,
    pub liquidator_fee: Decimal256,
    pub liquidation_threshold: Uint256,
    pub price_timeframe: u64,
    pub waiting_period: u64,
    pub control_contract: String,
}

#[cw_serde]
pub struct LiquidationAmountResponse {
    pub collaterals: TokensHuman,
}

#[cw_serde]
pub struct BidResponse {
    pub idx: Uint128,
    pub collateral_token: String,
    pub premium_slot: u8,
    pub bidder: String,
    pub amount: Uint256,
    pub product_snapshot: Decimal256,
    pub sum_snapshot: Decimal256,
    pub pending_liquidated_collateral: Uint256,
    pub wait_end: Option<u64>,
    pub epoch_snapshot: Uint128,
    pub scale_snapshot: Uint128,
}

#[cw_serde]
pub struct BidsResponse {
    pub bids: Vec<BidResponse>,
}

#[cw_serde]
pub struct BidPoolResponse {
    pub sum_snapshot: Decimal256,
    pub product_snapshot: Decimal256,
    pub total_bid_amount: Uint256,
    pub premium_rate: Decimal256,
    pub current_epoch: Uint128,
    pub current_scale: Uint128,
}

#[cw_serde]
pub struct CollateralInfoResponse {
    pub collateral_token: String,
    pub bid_threshold: Uint256,
    pub max_slot: u8,
    pub premium_rate_per_slot: Decimal256,
}

#[cw_serde]
pub struct BidPoolsResponse {
    pub bid_pools: Vec<BidPoolResponse>,
}

#[cw_serde]
pub struct MigrateMsg{}