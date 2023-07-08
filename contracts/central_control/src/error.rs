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
use cosmwasm_std::{OverflowError, StdError};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    OverflowError(#[from] OverflowError),

    #[error("control contract unauthorized calling function:{0}, params:{1}")]
    Unauthorized(String, String),
  
    #[error("Cannot redeem collateral to Non-redemption")]
    CannotRedeemToNonRedemption{},

    #[error("Cannot liquidate safely collateralized loan")]
    CannotLiquidateSafeLoan {},

    #[error("The address of Collateral Contract Error")]
    CollateralTypeError{},

    #[error("Withdraw collateral too large, it will lead to the risk of being liquidated. current loans{0}, new max loan value{1}")]
    WithdrawCollateralTooLarge(Uint256, Uint256),

    #[error("Mint  amount of kUSD too high; Loan liability becomes greater than limit: {0}")]
    MintkUSDTooLarge(Uint256),

    #[error("Redeem amount of kUSD too high; Redeem amount becomes greater than minter's loans: {0}")]
    RedeemkUSDTooLarge(Uint256),

    #[error("Collateral amount must greater than zero.")]
    CollateralAmountMustGreaterThanZero{},

    #[error("Collateral amount must be provided.")]
    CollateralAmountMustBeProvided{},

    #[error("Functionality deprecated")]
    Deprecated {},
}
