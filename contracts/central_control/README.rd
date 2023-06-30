The central control contract records the user's collateral information and debt information.
Entrance 1:
deposite collateral  via  message  
ExecuteMsg::DepositCollateral {
            minter,
            collateral_contract,
            collateral_amount,
        }
Entrance 2:
become redemption provider
ExecuteMsg::BecomeRedemptionProvider {
            is_redemption_provider,
} 
Entrance 3:
withdraw collalteral of user
ExecuteMsg::WithdrawCollateral {
            collateral_contract,
            collateral_amount,
} 