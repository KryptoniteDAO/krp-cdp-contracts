use cosmwasm_std::{OverflowError, StdError};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    OverflowError(#[from] OverflowError),

    #[error("custody contract unauthorized calling function:{0}, params:{1}")]
    Unauthorized(String, String),
   
    #[error("Invalid request: \"deposit collateral or mint stable coin\" message not included in request")]
    MissingDepositCollateralHook {},
    #[error("The address of Collateral Contract Error")]
    CollateralTypeError{},
    #[error("Functionality deprecated")]
    Deprecated {},
}
