import { TransactionsHistory, ADD_TRANSACTION, TransactionsActionTypes } from './types';

const initialState: TransactionsHistory = {
    transactions: []
}

export function transactionsReducer(
    state = initialState,
    action: TransactionsActionTypes
): TransactionsHistory {
    switch (action!.type) {
        case ADD_TRANSACTION:
            let newState = state.transactions.slice();
            newState.concat(action!.payload);
            console.log("adding to redux");
            return { transactions: newState };

        default:
            return state
    }
}
