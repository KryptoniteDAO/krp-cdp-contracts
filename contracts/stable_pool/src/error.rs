use cosmwasm_std::{OverflowError, StdError};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    OverflowError(#[from] OverflowError),

    #[error("pool contract unauthorized calling function:{0}, params:{1}")]
    Unauthorized(String, String),
    
    #[error("Cannot less than minimum redeem value {0} ukusd")]
    CannotLessThanMinRedeemValue (u128),
    /*
    #[error("An epoch has not passed yet; last executed height: {0}")]
    EpochNotPassed(u64),

    #[error("Token is already registered as collateral")]
    TokenAlreadyRegistered {},

    #[error("Unlock amount cannot exceed locked amount")]
    UnlockExceedsLocked {},

    #[error("Unlock amount too high; Loan liability becomes greater than borrow limit: {0}")]
    UnlockTooLarge(u128),
    */

    #[error("Functionality deprecated")] 
    Deprecated {},
}
