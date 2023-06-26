use cosmwasm_schema::write_api;

use cdp::liquidation_queue::{
   ExecuteMsg, InstantiateMsg, QueryMsg,
};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        execute: ExecuteMsg,
        query: QueryMsg,
    }
}
