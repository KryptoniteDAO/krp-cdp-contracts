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
use cosmwasm_std::{OverflowError, StdError, Uint128};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    OverflowError(#[from] OverflowError),
    
    #[error("No rewards have accrued yet")]
    NoRewardsHaveAccrued{},
   
    #[error("reward book contract unauthorized calling function:{0}, params:{1}")]
    Unauthorized(String, String),

    #[error("Claim accrued reward less than threshold: {0}")]
    ClaimAccruedRewardsLessThanThreshold(Uint256),

    #[error("Invalid reply ID")]
    InvalidReplyId {},

    #[error("Functionality deprecated")]
    Deprecated {},

    #[error("Decrease amount cannot exceed user balance: {0}")]
    DecreaseExcceedUserBalance (Uint128),
}
