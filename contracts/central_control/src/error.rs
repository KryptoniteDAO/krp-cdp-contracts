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

    #[error("Mint amount too high; Loan liability becomes greater than limit: {0}")]
    MintStableTooLarge(Uint256),

    #[error("Redeem amount too high; Redeem amount becomes greater than minter's loans: {0}")]
    RedeemStableTooLarge(Uint256),

    #[error("Functionality deprecated")]
    Deprecated {},
}
